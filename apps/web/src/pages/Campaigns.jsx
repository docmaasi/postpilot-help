import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Plus, Megaphone, Sparkles } from 'lucide-react';
import { useCampaigns, usePosts, useCreateCampaign, useUpdateCampaign } from '@postpilot/lib';
import { CampaignCard } from '../components/campaigns/CampaignCard.jsx';
import { CampaignForm } from '../components/campaigns/CampaignForm.jsx';

export default function Campaigns() {
  const campaigns = useCampaigns();
  const posts = usePosts();
  const createCampaign = useCreateCampaign();
  const updateCampaign = useUpdateCampaign();

  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState(null);

  /** Count posts per campaign */
  const postCountMap = useMemo(() => {
    const map = {};
    for (const post of posts ?? []) {
      if (post.campaignId) {
        map[post.campaignId] = (map[post.campaignId] ?? 0) + 1;
      }
    }
    return map;
  }, [posts]);

  const handleSubmit = async (data) => {
    if (data.id) {
      await updateCampaign(data);
    } else {
      await createCampaign(data);
    }
    setShowForm(false);
    setEditing(null);
  };

  const handleEdit = (campaign) => {
    setEditing(campaign);
    setShowForm(true);
  };

  const handleClose = () => {
    setShowForm(false);
    setEditing(null);
  };

  return (
    <div className="mx-auto max-w-6xl space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-wrap items-start justify-between gap-4"
      >
        <div>
          <h1 className="text-3xl font-bold">
            Content{' '}
            <span className="bg-gradient-to-r from-violet-500 via-pink-500 to-orange-400 bg-clip-text text-transparent">
              Campaigns
            </span>
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Organize your content into focused campaigns
          </p>
        </div>
        <button
          onClick={() => { setEditing(null); setShowForm(true); }}
          className="flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground hover:bg-primary/90"
        >
          <Plus className="h-4 w-4" /> New Campaign
        </button>
      </motion.div>

      {/* Grid or empty state */}
      {(campaigns ?? []).length === 0 ? (
        <EmptyCampaignsState onNew={() => setShowForm(true)} />
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {campaigns.map((c) => (
            <CampaignCard
              key={c._id}
              campaign={c}
              postCount={postCountMap[c._id] ?? 0}
              onEdit={handleEdit}
            />
          ))}
        </div>
      )}

      {/* Modal form */}
      {showForm && (
        <CampaignForm campaign={editing} onSubmit={handleSubmit} onClose={handleClose} />
      )}
    </div>
  );
}

function EmptyCampaignsState({ onNew }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex flex-col items-center rounded-xl border border-dashed border-border/50 py-16"
    >
      <div className="relative mb-4">
        <Megaphone className="h-14 w-14 text-primary/15" />
        <Sparkles className="absolute -right-2 -top-1 h-5 w-5 text-pink-400" />
      </div>
      <h3 className="mb-1 text-lg font-semibold">No campaigns yet</h3>
      <p className="mb-4 text-sm text-muted-foreground">
        Group your posts into organized campaigns
      </p>
      <button
        onClick={onNew}
        className="flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground hover:bg-primary/90"
      >
        <Plus className="h-4 w-4" /> Launch your first campaign
      </button>
    </motion.div>
  );
}

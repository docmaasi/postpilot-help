import { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Copy, Sparkles } from 'lucide-react';
import { useTemplates, useCreateTemplate, useUpdateTemplate, useDeleteTemplate } from '@postpilot/lib';
import { TemplateCard } from '../components/templates/TemplateCard.jsx';
import { TemplateForm } from '../components/templates/TemplateForm.jsx';

export default function Templates() {
  const templates = useTemplates();
  const createTemplate = useCreateTemplate();
  const updateTemplate = useUpdateTemplate();
  const deleteTemplate = useDeleteTemplate();

  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState(null);

  const handleSubmit = async (data) => {
    if (data.id) {
      await updateTemplate(data);
    } else {
      await createTemplate(data);
    }
    setShowForm(false);
    setEditing(null);
  };

  const handleEdit = (template) => {
    setEditing(template);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    await deleteTemplate({ id });
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
            Post{' '}
            <span className="bg-gradient-to-r from-violet-500 via-pink-500 to-orange-400 bg-clip-text text-transparent">
              Templates
            </span>
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Save and reuse content templates for each platform
          </p>
        </div>
        <button
          onClick={() => { setEditing(null); setShowForm(true); }}
          className="flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground hover:bg-primary/90"
        >
          <Plus className="h-4 w-4" /> New Template
        </button>
      </motion.div>

      {/* Grid or empty state */}
      {(templates ?? []).length === 0 ? (
        <EmptyTemplatesState onNew={() => setShowForm(true)} />
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {templates.map((t) => (
            <TemplateCard key={t._id} template={t} onEdit={handleEdit} onDelete={handleDelete} />
          ))}
        </div>
      )}

      {/* Modal form */}
      {showForm && (
        <TemplateForm template={editing} onSubmit={handleSubmit} onClose={handleClose} />
      )}
    </div>
  );
}

function EmptyTemplatesState({ onNew }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex flex-col items-center rounded-xl border border-dashed border-border/50 py-16"
    >
      <div className="relative mb-4">
        <Copy className="h-14 w-14 text-primary/15" />
        <Sparkles className="absolute -right-2 -top-1 h-5 w-5 text-pink-400" />
      </div>
      <h3 className="mb-1 text-lg font-semibold">No templates yet</h3>
      <p className="mb-4 text-sm text-muted-foreground">
        Create reusable templates for faster content creation
      </p>
      <button
        onClick={onNew}
        className="flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground hover:bg-primary/90"
      >
        <Plus className="h-4 w-4" /> Create your first template
      </button>
    </motion.div>
  );
}

import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Search, Calendar, Clock, User, ChevronRight } from 'lucide-react';
import { blogPosts, blogCategories } from '../data/blog-posts.js';
import { CategoryBadge } from '../components/blog/CategoryBadge.jsx';

const POSTS_PER_PAGE = 9;

export default function Blog() {
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const [visibleCount, setVisibleCount] = useState(POSTS_PER_PAGE);

  const filtered = useMemo(() => {
    const q = search.toLowerCase();
    return blogPosts.filter((p) => {
      const matchesCategory =
        activeCategory === 'All' || p.category === activeCategory;
      const matchesSearch =
        !q ||
        p.title.toLowerCase().includes(q) ||
        p.tags.some((t) => t.toLowerCase().includes(q));
      return matchesCategory && matchesSearch;
    });
  }, [search, activeCategory]);

  const visible = filtered.slice(0, visibleCount);
  const hasMore = visibleCount < filtered.length;

  return (
    <div className="mx-auto max-w-6xl space-y-8">
      <BlogHero />
      <SearchBar value={search} onChange={setSearch} />
      <CategoryTabs
        active={activeCategory}
        onChange={(c) => {
          setActiveCategory(c);
          setVisibleCount(POSTS_PER_PAGE);
        }}
      />
      <BlogGrid posts={visible} />
      {hasMore && (
        <div className="flex justify-center">
          <button
            onClick={() => setVisibleCount((c) => c + POSTS_PER_PAGE)}
            className="rounded-full bg-primary px-6 py-2.5 text-sm font-medium text-primary-foreground transition hover:opacity-90"
          >
            Load More Articles
          </button>
        </div>
      )}
      {filtered.length === 0 && (
        <p className="py-12 text-center text-muted-foreground">
          No articles found. Try a different search or category.
        </p>
      )}
    </div>
  );
}

/* ---------- Sub-components ---------- */

function BlogHero() {
  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className="text-center"
    >
      <h1 className="text-4xl font-extrabold tracking-tight md:text-5xl">
        <span className="bg-gradient-to-r from-violet-500 via-pink-500 to-orange-400 bg-clip-text text-transparent">
          PostPilot Blog
        </span>
      </h1>
      <p className="mt-2 text-muted-foreground">
        Insights, strategies, and trends for social media creators
      </p>
    </motion.div>
  );
}

function SearchBar({ value, onChange }) {
  return (
    <div className="relative mx-auto max-w-md">
      <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
      <input
        type="text"
        placeholder="Search articles by title or tag..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-full border border-border bg-card py-2.5 pl-10 pr-4 text-sm outline-none transition focus:border-primary focus:ring-1 focus:ring-primary"
      />
    </div>
  );
}

function CategoryTabs({ active, onChange }) {
  const tabs = ['All', ...blogCategories];
  return (
    <div className="flex flex-wrap justify-center gap-2">
      {tabs.map((t) => (
        <button
          key={t}
          onClick={() => onChange(t)}
          className={`rounded-full px-4 py-1.5 text-xs font-medium transition ${
            active === t
              ? 'bg-primary text-primary-foreground'
              : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
          }`}
        >
          {t}
        </button>
      ))}
    </div>
  );
}

function BlogGrid({ posts }) {
  return (
    <div className="grid gap-6 sm:grid-cols-2">
      {posts.map((post, i) => (
        <BlogCard key={post.id} post={post} index={i} />
      ))}
    </div>
  );
}

function BlogCard({ post, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.04 }}
    >
      <Link
        to={`/blog/${post.id}`}
        className="group flex h-full flex-col rounded-xl border border-border bg-card p-5 transition hover:-translate-y-0.5 hover:shadow-lg"
      >
        <CategoryBadge category={post.category} />
        <h2 className="mt-3 text-lg font-bold leading-snug group-hover:text-primary">
          {post.title}
        </h2>
        <p className="mt-2 flex-1 text-sm text-muted-foreground line-clamp-2">
          {post.excerpt}
        </p>
        <div className="mt-4 flex items-center gap-4 text-xs text-muted-foreground">
          <span className="flex items-center gap-1">
            <Calendar className="h-3 w-3" />
            {formatDate(post.date)}
          </span>
          <span className="flex items-center gap-1">
            <Clock className="h-3 w-3" />
            {post.readTime}
          </span>
          <span className="flex items-center gap-1">
            <User className="h-3 w-3" />
            {post.author}
          </span>
        </div>
        <span className="mt-3 flex items-center gap-1 text-xs font-medium text-primary">
          Read article <ChevronRight className="h-3 w-3" />
        </span>
      </Link>
    </motion.div>
  );
}

function formatDate(iso) {
  return new Date(iso).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
}

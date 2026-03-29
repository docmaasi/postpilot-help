import { useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ArrowLeft,
  Calendar,
  Clock,
  User,
  Link2,
  Share2,
} from 'lucide-react';
import { blogPosts } from '../data/blog-posts.js';
import { CategoryBadge } from '../components/blog/CategoryBadge.jsx';

export default function BlogPost() {
  const { id } = useParams();
  const post = blogPosts.find((p) => p.id === id);

  const related = useMemo(() => {
    if (!post) return [];
    return blogPosts
      .filter((p) => p.category === post.category && p.id !== post.id)
      .slice(0, 3);
  }, [post]);

  if (!post) return <NotFound />;

  return (
    <div className="mx-auto max-w-3xl space-y-8">
      <BackLink />
      <ArticleHeader post={post} />
      <ArticleBody html={post.content} />
      <TagList tags={post.tags} />
      <ShareBar id={post.id} title={post.title} />
      {related.length > 0 && <RelatedArticles posts={related} />}
    </div>
  );
}

/* ---------- Sub-components ---------- */

function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center">
      <h2 className="text-2xl font-bold">Article not found</h2>
      <p className="mt-2 text-muted-foreground">
        The article you are looking for does not exist.
      </p>
      <Link
        to="/blog"
        className="mt-4 text-sm font-medium text-primary hover:underline"
      >
        Back to blog
      </Link>
    </div>
  );
}

function BackLink() {
  return (
    <Link
      to="/blog"
      className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"
    >
      <ArrowLeft className="h-4 w-4" /> Back to blog
    </Link>
  );
}

function ArticleHeader({ post }) {
  return (
    <motion.header
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-3"
    >
      <CategoryBadge category={post.category} />
      <h1 className="text-3xl font-extrabold leading-tight md:text-4xl">
        {post.title}
      </h1>
      <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
        <span className="flex items-center gap-1">
          <User className="h-4 w-4" />
          {post.author}
        </span>
        <span className="flex items-center gap-1">
          <Calendar className="h-4 w-4" />
          {new Date(post.date).toLocaleDateString('en-US', {
            month: 'long',
            day: 'numeric',
            year: 'numeric',
          })}
        </span>
        <span className="flex items-center gap-1">
          <Clock className="h-4 w-4" />
          {post.readTime}
        </span>
      </div>
    </motion.header>
  );
}

function ArticleBody({ html }) {
  return (
    <motion.article
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.1 }}
      className="prose prose-violet max-w-none dark:prose-invert prose-headings:font-bold prose-p:leading-relaxed prose-a:text-primary prose-a:no-underline hover:prose-a:underline prose-li:marker:text-primary"
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}

function TagList({ tags }) {
  return (
    <div className="flex flex-wrap gap-2">
      {tags.map((tag) => (
        <span
          key={tag}
          className="rounded-full bg-secondary px-3 py-1 text-xs text-secondary-foreground"
        >
          #{tag}
        </span>
      ))}
    </div>
  );
}

function ShareBar({ id, title }) {
  const url = `https://www.postpilot.help/blog/${id}`;

  const copyLink = () => {
    navigator.clipboard.writeText(url);
  };

  const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`;
  const linkedinUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`;

  return (
    <div className="flex items-center gap-3 border-t border-border pt-6">
      <span className="flex items-center gap-1 text-sm font-medium">
        <Share2 className="h-4 w-4" /> Share this article
      </span>
      <button
        onClick={copyLink}
        className="rounded-full bg-secondary p-2 text-secondary-foreground transition hover:bg-secondary/70"
        title="Copy link"
      >
        <Link2 className="h-4 w-4" />
      </button>
      <a
        href={twitterUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="rounded-full bg-secondary p-2 text-secondary-foreground transition hover:bg-secondary/70"
        title="Share on X"
      >
        <XIcon />
      </a>
      <a
        href={linkedinUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="rounded-full bg-secondary p-2 text-secondary-foreground transition hover:bg-secondary/70"
        title="Share on LinkedIn"
      >
        <LinkedInIcon />
      </a>
    </div>
  );
}

function XIcon() {
  return (
    <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

function LinkedInIcon() {
  return (
    <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

function RelatedArticles({ posts }) {
  return (
    <section className="space-y-4 border-t border-border pt-8">
      <h3 className="text-lg font-bold">Related Articles</h3>
      <div className="grid gap-4 sm:grid-cols-3">
        {posts.map((p) => (
          <Link
            key={p.id}
            to={`/blog/${p.id}`}
            className="group rounded-xl border border-border bg-card p-4 transition hover:-translate-y-0.5 hover:shadow-md"
          >
            <CategoryBadge category={p.category} />
            <h4 className="mt-2 text-sm font-bold leading-snug group-hover:text-primary">
              {p.title}
            </h4>
            <p className="mt-1 text-xs text-muted-foreground">
              {p.readTime}
            </p>
          </Link>
        ))}
      </div>
    </section>
  );
}

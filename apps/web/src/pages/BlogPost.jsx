import { useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Calendar, Clock, User, ExternalLink } from 'lucide-react';
import { blogPosts } from '../data/blog-posts.js';
import { CategoryBadge } from '../components/blog/CategoryBadge.jsx';
import { ShareBar } from '../components/blog/ShareBar.jsx';
import { RelatedArticles } from '../components/blog/RelatedArticles.jsx';
import { ShareButton } from '../components/shared/ShareButton.jsx';
import { LandingNav } from '../components/landing/LandingNav.jsx';

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
    <div className="min-h-screen bg-background">
      <LandingNav />
      <div className="mx-auto max-w-3xl space-y-8 px-4 pt-24 pb-16">
      <div className="flex items-center justify-between">
        <BackLink />
        <ShareButton
          url={`https://www.postpilot.help/blog/${post.id}`}
          title={post.title}
          description={`Read "${post.title}" on the PostPilot blog.`}
        />
      </div>
      <ArticleHeader post={post} />
      <ArticleBody html={post.content} />
      <SourceAttribution />
      <TagList tags={post.tags} />
      <ShareBar id={post.id} title={post.title} />
      {related.length > 0 && <RelatedArticles posts={related} />}
      </div>
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

function SourceAttribution() {
  return (
    <div className="rounded-xl border border-border bg-muted/30 p-5">
      <div className="flex items-center gap-2 text-sm">
        <ExternalLink className="h-4 w-4 text-primary" />
        <span className="font-semibold">Source:</span>
        <a
          href="https://www.postpilot.help"
          target="_blank"
          rel="noopener noreferrer"
          className="text-primary font-medium hover:underline"
        >
          www.postpilot.help
        </a>
      </div>
      <p className="mt-1.5 text-xs text-muted-foreground">
        Originally published on PostPilot.Help — Your Social Media Content Command Center.
      </p>
    </div>
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

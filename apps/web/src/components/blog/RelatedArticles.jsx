import { Link } from 'react-router-dom';
import { CategoryBadge } from './CategoryBadge.jsx';

/**
 * Related articles grid displayed at the bottom of blog posts.
 */
export function RelatedArticles({ posts }) {
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

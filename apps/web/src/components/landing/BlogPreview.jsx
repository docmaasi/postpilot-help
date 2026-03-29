import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { blogPosts } from '../../data/blog-posts.js';

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

export function BlogPreview() {
  const latestPosts = blogPosts.slice(0, 3);

  return (
    <section className="py-24 px-4">
      <div className="max-w-6xl mx-auto text-center space-y-12">
        <h2 className="text-3xl sm:text-4xl font-bold font-display">
          Blog /{' '}
          <span className="text-accent">Resources</span>
        </h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Tips, strategies, and insights to help you grow your social media presence.
        </p>

        <motion.div
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-50px' }}
          transition={{ staggerChildren: 0.1 }}
        >
          {latestPosts.map((post) => (
            <motion.div key={post.id} variants={item}>
              <Link
                to={`/blog/${post.id}`}
                className="block rounded-2xl border border-border bg-card p-6 text-left space-y-3
                  hover:shadow-lg hover:-translate-y-1 transition-all duration-300 h-full"
              >
                <span className="inline-block rounded-full bg-accent/10 text-accent px-3 py-1 text-xs font-semibold">
                  {post.category}
                </span>
                <h3 className="font-bold text-lg font-display leading-snug">
                  {post.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3">
                  {post.excerpt}
                </p>
                <p className="text-xs text-muted-foreground">{post.readTime}</p>
              </Link>
            </motion.div>
          ))}
        </motion.div>

        <Link
          to="/blog"
          className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:underline"
        >
          View All Resources
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </section>
  );
}

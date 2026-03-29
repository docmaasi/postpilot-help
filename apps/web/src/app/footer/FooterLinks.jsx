import { Link } from 'react-router-dom';

const FOOTER_COLUMNS = [
  {
    title: 'Product',
    links: [
      { label: 'Dashboard', to: '/' },
      { label: 'Post Editor', to: '/posts/new' },
      { label: 'Calendar', to: '/calendar' },
      { label: 'Media Library', to: '/media' },
      { label: 'Templates', to: '/templates' },
      { label: 'Pricing', to: '/pricing' },
    ],
  },
  {
    title: 'Company',
    links: [
      { label: 'About', to: '#' },
      { label: 'Blog', to: '/blog' },
      { label: 'Contact', to: '/contact' },
      { label: 'Careers', to: '#' },
    ],
  },
  {
    title: 'Legal',
    links: [
      { label: 'Terms of Service', to: '/terms' },
      { label: 'Privacy Policy', to: '/privacy' },
      { label: 'Cookie Policy', to: '/cookies' },
    ],
  },
];

export function FooterLinks() {
  return (
    <>
      {FOOTER_COLUMNS.map((col) => (
        <div key={col.title}>
          <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-white/90">
            {col.title}
          </h4>
          <ul className="space-y-2.5">
            {col.links.map((link) => (
              <li key={link.label}>
                <Link
                  to={link.to}
                  className="text-sm text-white/50 transition-colors hover:text-white/80"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </>
  );
}

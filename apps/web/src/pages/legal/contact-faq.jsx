const FAQ_ITEMS = [
  {
    q: 'How do I connect my social media accounts?',
    a: 'Go to Settings > Connections and click "Add Account." Follow the prompts to authorize PostPilot to publish on your behalf.',
  },
  {
    q: 'Can I schedule posts across multiple platforms?',
    a: 'Yes! PostPilot supports scheduling to multiple platforms simultaneously. Select your target platforms when creating or editing a post.',
  },
  {
    q: 'How do I cancel my subscription?',
    a: 'Navigate to Settings > Billing and click "Manage Subscription." You can downgrade or cancel at any time. Your access continues until the end of the billing period.',
  },
  {
    q: 'Is my content stored securely?',
    a: 'Absolutely. All data is encrypted in transit and at rest. We use industry-standard security practices and never share your content without permission.',
  },
  {
    q: 'Do you offer team or agency plans?',
    a: 'We are actively building team collaboration features. Contact us to learn about early access to multi-user plans.',
  },
];

export function ContactFAQ() {
  return (
    <div className="rounded-xl border border-border bg-card p-6">
      <h2 className="mb-4 text-lg font-semibold text-foreground">
        Frequently Asked Questions
      </h2>
      <div className="space-y-4">
        {FAQ_ITEMS.map((item) => (
          <div key={item.q}>
            <p className="text-sm font-medium text-foreground">{item.q}</p>
            <p className="mt-1 text-sm text-muted-foreground">{item.a}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

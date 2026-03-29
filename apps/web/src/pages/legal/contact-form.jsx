export function ContactForm() {
  return (
    <div className="rounded-xl border border-border bg-card p-6">
      <h2 className="mb-4 text-lg font-semibold text-foreground">Send Us a Message</h2>
      <form onSubmit={(e) => e.preventDefault()} className="space-y-4">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label className="mb-1 block text-sm font-medium text-foreground">Name</label>
            <input type="text" placeholder="Your name" className="input-field" />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-foreground">Email</label>
            <input type="email" placeholder="you@example.com" className="input-field" />
          </div>
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium text-foreground">Subject</label>
          <input type="text" placeholder="How can we help?" className="input-field" />
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium text-foreground">Message</label>
          <textarea rows={5} placeholder="Tell us more..." className="input-field resize-none" />
        </div>
        <button
          type="submit"
          className="rounded-lg bg-primary px-6 py-2.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
        >
          Send Message
        </button>
      </form>
    </div>
  );
}

/**
 * Admin emails that get full Pro access without a subscription.
 * Add emails here to grant automatic Pro-level access.
 */
export const ADMIN_EMAILS: string[] = [
  "docmaasi2@gmail.com",
];

export function isAdminEmail(email: string | undefined | null): boolean {
  if (!email) return false;
  return ADMIN_EMAILS.includes(email.toLowerCase());
}

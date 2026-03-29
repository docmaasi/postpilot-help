/**
 * HTML email templates with inline CSS for PostPilot branding.
 * All styles are inline for maximum email client compatibility.
 */

const BRAND_COLOR = "#6366f1";
const BRAND_NAME = "PostPilot";

function wrapper(content: string): string {
  return `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8" /></head>
<body style="margin:0;padding:0;background:#f4f4f5;font-family:system-ui,-apple-system,sans-serif;">
  <div style="max-width:560px;margin:40px auto;background:#fff;border-radius:12px;overflow:hidden;box-shadow:0 1px 3px rgba(0,0,0,0.1);">
    <div style="background:${BRAND_COLOR};padding:24px 32px;">
      <h1 style="margin:0;color:#fff;font-size:22px;font-weight:700;">${BRAND_NAME}</h1>
    </div>
    <div style="padding:32px;">${content}</div>
    <div style="padding:16px 32px;background:#f9fafb;border-top:1px solid #e5e7eb;text-align:center;">
      <p style="margin:0;font-size:12px;color:#9ca3af;">
        &copy; ${new Date().getFullYear()} ${BRAND_NAME}. All rights reserved.
      </p>
      <p style="margin:4px 0 0;font-size:11px;color:#d1d5db;">
        <a href="#unsubscribe" style="color:#9ca3af;">Unsubscribe</a>
      </p>
    </div>
  </div>
</body>
</html>`.trim();
}

export function circleInviteHtml(
  inviterName: string,
  workspaceName: string,
  inviteUrl: string,
  role: string,
): string {
  return wrapper(`
    <h2 style="margin:0 0 8px;font-size:20px;color:#111;">You're invited!</h2>
    <p style="color:#374151;line-height:1.6;">
      <strong>${inviterName}</strong> invited you to join
      <strong>${workspaceName}</strong> on ${BRAND_NAME} as a
      <strong>${role}</strong>.
    </p>
    <p style="color:#374151;line-height:1.6;">
      Collaborate on social media content, schedule posts, and grow together.
    </p>
    <div style="text-align:center;margin:28px 0;">
      <a href="${inviteUrl}"
         style="display:inline-block;background:${BRAND_COLOR};color:#fff;padding:12px 32px;border-radius:8px;text-decoration:none;font-weight:600;font-size:15px;">
        Accept Invitation
      </a>
    </div>
    <p style="font-size:13px;color:#6b7280;">
      If you didn't expect this invite, you can safely ignore this email.
    </p>
  `);
}

export function welcomeHtml(name: string): string {
  return wrapper(`
    <h2 style="margin:0 0 8px;font-size:20px;color:#111;">
      Welcome to ${BRAND_NAME}, ${name}!
    </h2>
    <p style="color:#374151;line-height:1.6;">
      You're all set to turn your YouTube content into scroll-stopping
      social media posts. Here's what you can do:
    </p>
    <ul style="color:#374151;line-height:1.8;padding-left:20px;">
      <li>Import YouTube videos and generate captions with AI</li>
      <li>Schedule posts across multiple platforms</li>
      <li>Track performance with built-in analytics</li>
    </ul>
    <div style="text-align:center;margin:28px 0;">
      <a href="https://postpilot.help"
         style="display:inline-block;background:${BRAND_COLOR};color:#fff;padding:12px 32px;border-radius:8px;text-decoration:none;font-weight:600;font-size:15px;">
        Get Started
      </a>
    </div>
  `);
}

export function referralNotificationHtml(
  referrerName: string,
  newUserName: string,
): string {
  return wrapper(`
    <h2 style="margin:0 0 8px;font-size:20px;color:#111;">
      Great news, ${referrerName}!
    </h2>
    <p style="color:#374151;line-height:1.6;">
      <strong>${newUserName}</strong> just joined ${BRAND_NAME} using
      your referral link. Keep sharing to earn more rewards!
    </p>
    <div style="text-align:center;margin:28px 0;">
      <a href="https://postpilot.help/referrals"
         style="display:inline-block;background:${BRAND_COLOR};color:#fff;padding:12px 32px;border-radius:8px;text-decoration:none;font-weight:600;font-size:15px;">
        View Referrals
      </a>
    </div>
  `);
}

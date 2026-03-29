"use node";

import { Resend } from "resend";
import { v } from "convex/values";
import { action } from "../_generated/server";
import {
  circleInviteHtml,
  welcomeHtml,
  referralNotificationHtml,
} from "./templates";

function getResend() {
  const key = process.env.RESEND_API_KEY;
  if (!key) throw new Error("RESEND_API_KEY not configured");
  return new Resend(key);
}

function getFrom(): string {
  return process.env.FROM_EMAIL ?? "PostPilot <noreply@postpilot.help>";
}

// ─── Circle Invite ───────────────────────────────────
export const sendCircleInvite = action({
  args: {
    to: v.string(),
    inviterName: v.string(),
    workspaceName: v.string(),
    inviteUrl: v.string(),
    role: v.string(),
  },
  handler: async (_ctx, args) => {
    const resend = getResend();

    try {
      const html = circleInviteHtml(
        args.inviterName,
        args.workspaceName,
        args.inviteUrl,
        args.role,
      );

      const result = await resend.emails.send({
        from: getFrom(),
        to: args.to,
        subject: `${args.inviterName} invited you to collaborate on PostPilot`,
        html,
      });

      return { success: true, id: result.data?.id };
    } catch (error) {
      return { success: false, error: formatError(error) };
    }
  },
});

// ─── Welcome Email ───────────────────────────────────
export const sendWelcomeEmail = action({
  args: {
    to: v.string(),
    name: v.string(),
  },
  handler: async (_ctx, args) => {
    const resend = getResend();

    try {
      const html = welcomeHtml(args.name);

      const result = await resend.emails.send({
        from: getFrom(),
        to: args.to,
        subject: "Welcome to PostPilot.Help!",
        html,
      });

      return { success: true, id: result.data?.id };
    } catch (error) {
      return { success: false, error: formatError(error) };
    }
  },
});

// ─── Referral Notification ───────────────────────────
export const sendReferralNotification = action({
  args: {
    to: v.string(),
    referrerName: v.string(),
    newUserName: v.string(),
  },
  handler: async (_ctx, args) => {
    const resend = getResend();

    try {
      const html = referralNotificationHtml(
        args.referrerName,
        args.newUserName,
      );

      const result = await resend.emails.send({
        from: getFrom(),
        to: args.to,
        subject: "Someone joined PostPilot using your referral!",
        html,
      });

      return { success: true, id: result.data?.id };
    } catch (error) {
      return { success: false, error: formatError(error) };
    }
  },
});

function formatError(error: unknown): string {
  if (error instanceof Error) return error.message;
  return "An unexpected error occurred while sending email";
}

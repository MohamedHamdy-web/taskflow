import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendInvitationEmail({
  toEmail,
  invitedByName,
  workspaceName,
}: {
  toEmail: string;
  invitedByName: string;
  workspaceName: string;
}) {
  await resend.emails.send({
    from: "Taskflow <onboarding@resend.dev>",
    to: toEmail,
    subject: `You've been invited to join ${workspaceName} on Taskflow`,
    html: `
      <div style="font-family: sans-serif; max-width: 480px; margin: 0 auto;">
        <h2 style="color: #18181b;">You've been invited! 🎉</h2>
        <p style="color: #71717a;">
          <strong>${invitedByName}</strong> has invited you to join 
          <strong>${workspaceName}</strong> on Taskflow.
        </p>
        <p style="color: #71717a;">
          Log in to your Taskflow account to accept or decline the invitation.
        </p>
        <a 
          href="${process.env.NEXT_PUBLIC_APP_URL}/dashboard"
          style="display: inline-block; background: #18181b; color: white; padding: 12px 24px; border-radius: 8px; text-decoration: none; margin-top: 16px;"
        >
          View Invitation
        </a>
        <p style="color: #a1a1aa; font-size: 12px; margin-top: 24px;">
          If you don't have an account yet, sign up at ${process.env.NEXT_PUBLIC_APP_URL}/sign-up
        </p>
      </div>
    `,
  });
}

"use client";

import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { acceptInvitation, declineInvitation } from "@/lib/actions";
import { Bell } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Invitation {
  id: string;
  workspace: { name: string };
  invitedBy: { name: string | null; email: string };
}

interface InvitationsBannerProps {
  invitations: Invitation[];
}

export default function InvitationsBanner({
  invitations,
}: InvitationsBannerProps) {
  const router = useRouter();

  if (invitations.length === 0) return null;

  async function handleAccept(invitationId: string) {
    const result = await acceptInvitation(invitationId);
    if (result.error) {
      toast.error(result.error);
    } else {
      toast.success("Invitation accepted!");
      router.refresh();
    }
  }

  async function handleDecline(invitationId: string) {
    await declineInvitation(invitationId);
    toast.success("Invitation declined");
    router.refresh();
  }

  return (
    <div className="space-y-3 mb-6">
      {invitations.map((invitation) => (
        <div
          key={invitation.id}
          className="flex items-center justify-between bg-blue-50 dark:bg-blue-950 border border-blue-200 dark:border-blue-800 rounded-xl px-4 py-3"
        >
          <div className="flex items-center gap-3">
            <Bell className="w-4 h-4 text-blue-500" />
            <p className="text-sm text-blue-900 dark:text-blue-100">
              <span className="font-medium">
                {invitation.invitedBy.name || invitation.invitedBy.email}
              </span>{" "}
              invited you to join{" "}
              <span className="font-medium">{invitation.workspace.name}</span>
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Button
              size="sm"
              variant="outline"
              className="text-xs border-blue-200 dark:border-blue-700 text-blue-700 dark:text-blue-300 hover:bg-blue-100 dark:hover:bg-blue-900"
              onClick={() => handleDecline(invitation.id)}
            >
              Decline
            </Button>
            <Button
              size="sm"
              className="text-xs bg-blue-600 hover:bg-blue-700"
              onClick={() => handleAccept(invitation.id)}
            >
              Accept
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
}

"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { inviteMember } from "@/lib/actions";
import { toast } from "sonner";

interface InviteMemberProps {
  workspaceId: string;
}

export default function InviteMember({ workspaceId }: InviteMemberProps) {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleInvite() {
    if (!email.trim()) return;
    setLoading(true);
    const result = await inviteMember({ email, workspaceId });
    setLoading(false);

    if (result.error) {
      toast.error(result.error);
    } else {
      toast.success("Member invited!");
      setEmail("");
      router.refresh();
    }
  }

  return (
    <div className="bg-white rounded-xl border border-zinc-200 p-6">
      <h2 className="text-lg font-semibold text-zinc-900 mb-1">
        Invite Member
      </h2>
      <p className="text-sm text-zinc-500 mb-4">
        Invite someone to your workspace by their email address
      </p>
      <div className="space-y-4">
        <div>
          <Label htmlFor="email">Email Address</Label>
          <Input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="colleague@example.com"
            className="mt-1"
          />
        </div>
        <Button onClick={handleInvite} disabled={loading}>
          {loading ? "Inviting..." : "Send Invite"}
        </Button>
      </div>
    </div>
  );
}

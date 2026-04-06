"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Workspace } from "@/generated/prisma/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { updateWorkspace } from "@/lib/actions";
import { toast } from "sonner";

interface WorkspaceSettingsProps {
  workspace: Workspace;
  isOwner: boolean;
}

export default function WorkspaceSettings({
  workspace,
  isOwner,
}: WorkspaceSettingsProps) {
  const [name, setName] = useState(workspace.name);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleUpdate() {
    if (!name.trim()) return;
    setLoading(true);
    await updateWorkspace({ workspaceId: workspace.id, name });
    setLoading(false);
    router.refresh();
    toast.success("Workspace updated!");
  }

  return (
    <div className="bg-white rounded-xl border border-zinc-200 p-6">
      <h2 className="text-lg font-semibold text-zinc-900 mb-4">Workspace</h2>
      <div className="space-y-4">
        <div>
          <Label htmlFor="name">Workspace Name</Label>
          <Input
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            disabled={!isOwner}
            className="mt-1"
          />
        </div>
        <div>
          <Label>Workspace Slug</Label>
          <Input
            value={workspace.slug}
            disabled
            className="mt-1 bg-zinc-50 text-zinc-400"
          />
          <p className="text-xs text-zinc-400 mt-1">Slug cannot be changed</p>
        </div>
        {isOwner && (
          <Button onClick={handleUpdate} disabled={loading}>
            {loading ? "Saving..." : "Save Changes"}
          </Button>
        )}
      </div>
    </div>
  );
}

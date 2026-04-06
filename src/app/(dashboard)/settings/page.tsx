import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { getOrCreateWorkspace } from "@/lib/workspace";
import { prisma } from "@/lib/db";
import WorkspaceSettings from "./_components/workspace-settings";
import InviteMember from "./_components/invite-member";

export default async function SettingsPage() {
  const user = await currentUser();
  if (!user) redirect("/sign-in");

  const workspace = await getOrCreateWorkspace(
    user.id,
    user.emailAddresses[0]?.emailAddress ?? "",
    user.fullName,
  );

  if (!workspace) redirect("/sign-in");

  const member = await prisma.member.findUnique({
    where: {
      userId_workspaceId: {
        userId: user.id,
        workspaceId: workspace.id,
      },
    },
  });

  const isOwner = member?.role === "OWNER";

  return (
    <div className="p-8 max-w-2xl">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-zinc-900">Settings</h1>
        <p className="text-zinc-500 mt-1">Manage your workspace settings</p>
      </div>

      <div className="space-y-6">
        <WorkspaceSettings workspace={workspace} isOwner={isOwner} />
        {isOwner && <InviteMember workspaceId={workspace.id} />}
      </div>
    </div>
  );
}

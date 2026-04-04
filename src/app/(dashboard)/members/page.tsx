import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { getOrCreateWorkspace } from "@/lib/workspace";
import { prisma } from "@/lib/db";
import MemberList from "./_components/member-list";

export default async function MembersPage() {
  const user = await currentUser();
  if (!user) redirect("/sign-in");

  const workspace = await getOrCreateWorkspace(
    user.id,
    user.emailAddresses[0]?.emailAddress ?? "",
    user.fullName,
  );

  if (!workspace) redirect("/sign-in");

  const members = await prisma.member.findMany({
    where: { workspaceId: workspace.id },
    include: { user: true },
    orderBy: { joinedAt: "asc" },
  });

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-zinc-900">Members</h1>
        <p className="text-zinc-500 mt-1">Manage your workspace members</p>
      </div>
      <MemberList members={members} currentUserId={user.id} />
    </div>
  );
}

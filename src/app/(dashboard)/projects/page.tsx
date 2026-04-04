import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { getOrCreateWorkspace } from "@/lib/workspace";
import { getProjects } from "@/lib/data";
import ProjectList from "./_components/project-list";

export default async function ProjectsPage() {
  const user = await currentUser();
  if (!user) redirect("/sign-in");

  const workspace = await getOrCreateWorkspace(
    user.id,
    user.emailAddresses[0]?.emailAddress ?? "",
    user.fullName,
  );

  if (!workspace) redirect("/sign-in");

  const projects = await getProjects(workspace.id);

  return (
    <div className="p-8">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-zinc-900">Projects</h1>
          <p className="text-zinc-500 mt-1">Manage your workspace projects</p>
        </div>
      </div>
      <ProjectList projects={projects} workspaceId={workspace.id} />
    </div>
  );
}

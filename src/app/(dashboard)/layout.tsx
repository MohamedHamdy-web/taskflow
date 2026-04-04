import { LayoutDashboard, FolderKanban, Users, Settings } from "lucide-react";
import UserButtonClient from "@/components/user-button";
import NavLink from "@/components/nav-link";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen bg-zinc-50">
      <aside className="w-64 bg-white border-r border-zinc-200 flex flex-col">
        <div className="flex items-center gap-2 p-6 border-b border-zinc-200">
          <div className="w-8 h-8 bg-zinc-950 rounded-md" />
          <span className="font-semibold text-xl">Taskflow</span>
        </div>

        <nav className="flex-1 p-4 space-y-1">
          <NavLink href="/dashboard">
            <LayoutDashboard className="w-4 h-4" />
            Dashboard
          </NavLink>
          <NavLink href="/projects">
            <FolderKanban className="w-4 h-4" />
            Projects
          </NavLink>
          <NavLink href="/members">
            <Users className="w-4 h-4" />
            Members
          </NavLink>
          <NavLink href="/settings">
            <Settings className="w-4 h-4" />
            Settings
          </NavLink>
        </nav>

        <div className="p-4 border-t border-zinc-200 flex items-center gap-3">
          <UserButtonClient />
        </div>
      </aside>

      <main className="flex-1 overflow-auto">{children}</main>
    </div>
  );
}

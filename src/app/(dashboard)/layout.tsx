import { LayoutDashboard, FolderKanban, Users, Settings } from "lucide-react";
import UserButtonClient from "@/components/user-button";
import NavLink from "@/components/nav-link";
import ThemeToggle from "@/components/theme-toggle";
import { Toaster } from "@/components/ui/sonner";
import MobileSidebar from "@/components/mobile-sidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const navLinks = (
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
  );

  return (
    <div className="flex h-screen bg-zinc-50 dark:bg-zinc-950">
      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex w-64 bg-white dark:bg-zinc-900 border-r border-zinc-200 dark:border-zinc-800 flex-col">
        <div className="flex items-center justify-between p-6 border-b border-zinc-200 dark:border-zinc-800">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-zinc-950 dark:bg-white rounded-md" />
            <span className="font-semibold text-xl text-zinc-900 dark:text-white">
              Taskflow
            </span>
          </div>
          <ThemeToggle />
        </div>
        {navLinks}
        <div className="p-4 border-t border-zinc-200 dark:border-zinc-800">
          <UserButtonClient />
        </div>
      </aside>

      {/* Mobile Header */}
      <div className="flex flex-col flex-1 overflow-hidden">
        <header className="lg:hidden flex items-center justify-between px-4 py-3 bg-white dark:bg-zinc-900 border-b border-zinc-200 dark:border-zinc-800">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 bg-zinc-950 dark:bg-white rounded-md" />
            <span className="font-semibold text-lg text-zinc-900 dark:text-white">
              Taskflow
            </span>
          </div>
          <div className="flex items-center gap-2">
            <ThemeToggle />
            <MobileSidebar>{navLinks}</MobileSidebar>
          </div>
        </header>

        <main className="flex-1 overflow-auto bg-zinc-50 dark:bg-zinc-950">
          {children}
        </main>
      </div>

      <Toaster position="bottom-right" richColors />
    </div>
  );
}

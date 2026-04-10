"use client";

import { useState } from "react";
import { Menu, X } from "lucide-react";
import UserButtonClient from "./user-button";

export default function MobileSidebar({
  children,
}: {
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="p-2 rounded-lg text-zinc-500 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
      >
        <Menu className="w-5 h-5" />
      </button>

      {/* Overlay */}
      {open && (
        <div
          className="fixed inset-0 bg-black/50 z-40"
          onClick={() => setOpen(false)}
        />
      )}

      {/* Drawer */}
      <div
        className={`fixed top-0 left-0 h-full w-64 bg-white dark:bg-zinc-900 border-r border-zinc-200 dark:border-zinc-800 z-50 flex flex-col transform transition-transform duration-200 ${open ? "translate-x-0" : "-translate-x-full"}`}
      >
        <div className="flex items-center justify-between p-6 border-b border-zinc-200 dark:border-zinc-800">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-zinc-950 dark:bg-white rounded-md" />
            <span className="font-semibold text-xl text-zinc-900 dark:text-white">
              Taskflow
            </span>
          </div>
          <button
            onClick={() => setOpen(false)}
            className="text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Close sidebar when nav link is clicked */}
        <div onClick={() => setOpen(false)} className="flex-1">
          {children}
        </div>

        <div className="p-4 border-t border-zinc-200 dark:border-zinc-800">
          <UserButtonClient />
        </div>
      </div>
    </>
  );
}

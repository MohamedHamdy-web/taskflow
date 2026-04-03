"use client";

import { UserButton, useUser } from "@clerk/nextjs";

export default function UserButtonClient() {
  const { user } = useUser();

  return (
    <div className="flex items-center gap-3">
      <UserButton />
      <div className="flex flex-col">
        <span className="text-sm font-medium text-zinc-900">
          {user?.fullName || user?.firstName || "Account"}
        </span>
        <span className="text-xs text-zinc-500">
          {user?.emailAddresses[0]?.emailAddress}
        </span>
      </div>
    </div>
  );
}

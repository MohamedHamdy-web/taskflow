"use client";

import { MemberWithUser } from "@/types";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { removeMember, updateMemberRole } from "@/lib/actions";
import { Crown, Shield, User } from "lucide-react";

const ROLE_ICONS = {
  OWNER: <Crown className="w-4 h-4 text-yellow-500" />,
  ADMIN: <Shield className="w-4 h-4 text-blue-500" />,
  MEMBER: <User className="w-4 h-4 text-zinc-400" />,
};

const ROLE_COLORS = {
  OWNER: "bg-yellow-50 dark:bg-yellow-950 text-yellow-700 dark:text-yellow-300",
  ADMIN: "bg-blue-50 dark:bg-blue-950 text-blue-700 dark:text-blue-300",
  MEMBER: "bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400",
};

interface MemberListProps {
  members: MemberWithUser[];
  currentUserId: string;
}

export default function MemberList({
  members,
  currentUserId,
}: MemberListProps) {
  const router = useRouter();
  const currentMember = members.find((m) => m.userId === currentUserId);
  const isOwner = currentMember?.role === "OWNER";

  async function handleRemove(memberId: string) {
    toast("Remove this member?", {
      action: {
        label: "Remove",
        onClick: async () => {
          await removeMember(memberId);
          router.refresh();
          toast.success("Member removed!");
        },
      },
      cancel: { label: "Cancel", onClick: () => {} },
    });
  }

  async function handleRoleChange(memberId: string, role: string) {
    await updateMemberRole(memberId, role);
    router.refresh();
    toast.success("Role updated!");
  }

  return (
    <div className="bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800 divide-y divide-zinc-100 dark:divide-zinc-800">
      {members.map((member) => (
        <div key={member.id} className="flex items-center justify-between p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center text-sm font-medium text-zinc-600 dark:text-zinc-300">
              {member.user.name?.[0] ?? member.user.email[0].toUpperCase()}
            </div>
            <div>
              <p className="text-sm font-medium text-zinc-900 dark:text-white">
                {member.user.name ?? "No name"}
                {member.userId === currentUserId && (
                  <span className="text-zinc-400 font-normal"> (you)</span>
                )}
              </p>
              <p className="text-xs text-zinc-500 dark:text-zinc-400">
                {member.user.email}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div
              className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${ROLE_COLORS[member.role]}`}
            >
              {ROLE_ICONS[member.role]}
              {member.role}
            </div>
            {isOwner && member.userId !== currentUserId && (
              <div className="flex items-center gap-2">
                <select
                  value={member.role}
                  onChange={(e) => handleRoleChange(member.id, e.target.value)}
                  className="text-xs border border-zinc-200 dark:border-zinc-700 dark:bg-zinc-800 dark:text-white rounded-lg px-2 py-1 outline-none"
                >
                  <option value="ADMIN">Admin</option>
                  <option value="MEMBER">Member</option>
                </select>
                <button
                  onClick={() => handleRemove(member.id)}
                  className="text-xs text-red-500 hover:text-red-700 font-medium"
                >
                  Remove
                </button>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

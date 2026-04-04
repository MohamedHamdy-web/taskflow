import {
  Project,
  Task,
  Member,
  User,
  Workspace,
} from "@/generated/prisma/client";

export type ProjectWithCount = Project & {
  _count: { tasks: number };
};

export type MemberWithUser = Member & {
  user: User;
};

export type WorkspaceWithMembers = Workspace & {
  members: MemberWithUser[];
};

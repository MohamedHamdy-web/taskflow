import { prisma } from "@/lib/db";

export async function getOrCreateWorkspace(
  clerkUserId: string,
  email: string,
  name?: string | null,
) {
  let user = await prisma.user.findUnique({
    where: { id: clerkUserId },
    include: {
      memberships: {
        include: { workspace: true },
      },
    },
  });

  if (!user) {
    const baseSlug = `${(name || email).toLowerCase().replace(/[^a-z0-9]/g, "-")}-workspace`;
    const slug = `${baseSlug}-${Math.random().toString(36).slice(2, 7)}`;

    user = await prisma.user.create({
      data: {
        id: clerkUserId,
        email,
        name: name || null,
        memberships: {
          create: {
            role: "OWNER",
            workspace: {
              create: {
                name: `${name || "My"}'s Workspace`,
                slug,
              },
            },
          },
        },
      },
      include: {
        memberships: {
          include: { workspace: true },
        },
      },
    });
  }

  return user.memberships[0]?.workspace;
}

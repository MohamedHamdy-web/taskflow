import MembersSkeleton from "@/components/skeletons/members-skeleton";

export default function MembersLoading() {
  return (
    <div className="p-8">
      <div className="mb-8">
        <div className="h-8 w-32 bg-zinc-200 rounded animate-pulse" />
        <div className="h-4 w-48 bg-zinc-100 rounded animate-pulse mt-2" />
      </div>
      <MembersSkeleton />
    </div>
  );
}

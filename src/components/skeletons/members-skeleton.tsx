import { Skeleton } from "@/components/ui/skeleton";

export default function MembersSkeleton() {
  return (
    <div className="bg-white rounded-xl border border-zinc-200 divide-y divide-zinc-100">
      {[...Array(4)].map((_, i) => (
        <div key={i} className="flex items-center justify-between p-4">
          <div className="flex items-center gap-3">
            <Skeleton className="w-10 h-10 rounded-full" />
            <div>
              <Skeleton className="h-4 w-32 mb-1" />
              <Skeleton className="h-3 w-48" />
            </div>
          </div>
          <Skeleton className="h-6 w-20 rounded-full" />
        </div>
      ))}
    </div>
  );
}

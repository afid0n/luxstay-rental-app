import { Skeleton } from "@/src/components/ui/skeleton";

 
export function SkeletonCard() {
  return (
    <div className="flex flex-col space-y-3 mb-20">
      <Skeleton className="h-[125px] w-[250px] rounded-xl" />
      <div className="space-y-2">
        <Skeleton className="h-4 w-[250px]" />
        <Skeleton className="h-4 w-[200px]" />
      </div>
    </div>
  )
}
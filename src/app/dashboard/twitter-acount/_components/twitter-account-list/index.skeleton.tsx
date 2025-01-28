import { Twitter } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { Skeleton } from "~/components/ui/skeleton";

function AccountCardSkeleton() {
  return (
    <div className="rounded-lg border p-4">
      <div className="flex items-center space-x-3">
        <Skeleton className="h-12 w-12 rounded-full" />
        <div className="flex-1 space-y-2">
          <Skeleton className="h-4 w-[200px]" />
          <Skeleton className="h-4 w-[150px]" />
        </div>
        <div className="flex gap-1">
          <Skeleton className="h-8 w-8" />
          <Skeleton className="h-8 w-8" />
        </div>
      </div>
    </div>
  );
}

export function AccountListSkeleton() {
  return (
    <Card>
      <CardHeader className="border-b">
        <div className="flex items-center">
          <CardTitle className="flex items-center gap-4 text-2xl font-bold">
            <Twitter className="h-6 w-6 text-blue-400" />
            登録済みアカウント
          </CardTitle>
        </div>
      </CardHeader>
      <CardContent className="p-6">
        <div className="space-y-3">
          {Array.from({ length: 3 }).map((_, i) => (
            <AccountCardSkeleton key={i} />
          ))}
        </div>
      </CardContent>
    </Card>
  );
} 
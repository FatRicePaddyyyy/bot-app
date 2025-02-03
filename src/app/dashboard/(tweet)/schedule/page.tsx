import { Suspense } from "react";

import { api, HydrateClient } from "~/trpc/server";
import ScheduleForm from "../_components/schedule-form";
import ScheduleSkeleton from "../_components/schedule-skeleton";
const SchedulePage = async () => {
  // Promisで並行に取得
  void api.prompt.all.prefetch();
  void api.twitterAccount.all.prefetch();

  return (
    <HydrateClient>
      <div className="container mx-auto max-w-5xl my-8">
        <Suspense fallback={<ScheduleSkeleton />}>
          <ScheduleForm defaultPromptId={undefined} initialTask={undefined} />
        </Suspense>
      </div>
    </HydrateClient>
  );
};

export default SchedulePage;

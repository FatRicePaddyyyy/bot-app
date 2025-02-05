import { Suspense } from "react";

import { api, HydrateClient } from "~/trpc/server";
import TweetForm from "../_components/tweet-form";

const TweetPage = async () => {
  // Promisで並行に取得
  void api.prompt.all.prefetch();
  void api.twitterAccount.all.prefetch();

  return (
    <HydrateClient>
      <div className="container mx-auto my-8 max-w-5xl">
        <Suspense fallback={<div>Loading...</div>}>
          <TweetForm defaultPromptId={undefined} initialTask={undefined} />
        </Suspense>
      </div>
    </HydrateClient>
  );
};

export default TweetPage;

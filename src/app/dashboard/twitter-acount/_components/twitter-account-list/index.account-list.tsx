import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { Twitter } from "lucide-react";
import { type TwitterAccount } from "~/server/types";
import { NoAccount } from "./index.account-list.no-account";
import { TwitterAccountCard } from "./index.account-list.card";

export function TwitterAccountsList({ accounts }: { accounts: TwitterAccount[] }) {
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
        {!accounts?.length ? (
          <NoAccount />
        ) : (
          <div className="space-y-3">
            {accounts?.map((account) => (
              <TwitterAccountCard key={account.id} account={account} />
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};
"use client";

import { motion } from "framer-motion";
import { Pencil, Trash2, Twitter } from "lucide-react";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "~/components/ui/alert-dialog";
import { Button } from "~/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "~/components/ui/dialog";
import { api } from "~/trpc/react";
import { type TwitterAccount } from "~/server/types";
function NoAccount() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex items-center justify-center py-6 text-gray-500"
    >
      <p>登録済みのアカウントはありません</p>
    </motion.div>
  );
}


const TwitterAccountsList = ({ accounts }: { accounts: TwitterAccount[] }) => {
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
              <motion.div
                key={account.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="group relative rounded-lg border p-4 transition-all duration-200 hover:bg-gray-50"
              >
                <div className="flex items-center space-x-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-100 text-lg font-semibold text-blue-600">
                    {account.name}
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <p className="text-sm text-gray-500">アカウント名:</p>
                      <p>{account.name}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <p className="text-sm text-gray-500">
                        Twitterハンドル名:
                      </p>
                      <p>{account.twitterHandle}</p>
                    </div>
                  </div>
                  <div className="flex flex-shrink-0 gap-1 opacity-0 transition-opacity duration-200 group-hover:opacity-100">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="hover:bg-gray-200"
                    >
                      <Pencil className="h-4 w-4 text-gray-600" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="hover:bg-red-100"
                    >
                      <Trash2 className="h-4 w-4 text-red-500" />
                    </Button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};
export function TwitterAccountsListPage() {
  const [accounts] = api.twitterAccount.all.useSuspenseQuery();
  return (
    <>
      <TwitterAccountsList accounts={accounts} />
      {/* <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>アカウントの削除</AlertDialogTitle>
            <AlertDialogDescription>
              {accountToDelete && (
                <>
                  {sanitize(accountToDelete.name)} (
                  {sanitize(accountToDelete.twitter_handle)})
                  を削除してもよろしいですか？
                </>
              )}
              <br />
              この操作は取り消せません。
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>キャンセル</AlertDialogCancel>
            <AlertDialogAction
              className="bg-red-500 hover:bg-red-600"
              onClick={() => accountToDelete && handleDelete(accountToDelete)}
            >
              削除
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog> */}

      {/* <Dialog
        open={!!selectedAccount}
        onOpenChange={() => setSelectedAccount(null)}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              APIキーの更新 -{" "}
              {selectedAccount && sanitize(selectedAccount.name)}
            </DialogTitle>
          </DialogHeader>
          {selectedAccount && (
            <TwitterUpdateForm
              accountId={selectedAccount.id}
              onSuccess={() => {
                setSelectedAccount(null);
                fetchAccounts();
              }}
            />
          )}
        </DialogContent>
      </Dialog> */}
    </>
  );
}

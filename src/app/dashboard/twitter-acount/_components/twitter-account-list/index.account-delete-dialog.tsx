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
import { api } from "~/trpc/react";
import { useModalContext } from "./types";

export function TwitterAccountDeleteDialog() {
  const { modalState, setModalState } = useModalContext();
  const utils = api.useUtils();
  const { mutate: deleteAccount } = api.twitterAccount.delete.useMutation({
    onSuccess: async () => {
      await utils.twitterAccount.all.invalidate();
    },
  });

  function handleDelete() {
    const accountId = modalState?.account.id;
    if (!accountId) return;
    deleteAccount({ id: accountId });
    setModalState(null);
  }
  return (
    <AlertDialog
      open={modalState?.type === "delete"}
      onOpenChange={() => setModalState(null)}
    >
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>アカウントの削除</AlertDialogTitle>
          <AlertDialogDescription>
            {modalState?.account && (
              <>
                {modalState.account.name} ({modalState.account.twitterHandle})
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
            onClick={() => {
              handleDelete();
            }}
          >
            削除
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

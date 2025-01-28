"use client";

import { useState } from "react";
import { api } from "~/trpc/react";
import { TwitterAccountFormDialog } from "../twitter-account-form";
import { type ModalState, ModalContext } from "./types";
import { TwitterAccountsList } from "./index.account-list";
import { TwitterAccountDeleteDialog } from "./index.account-delete-dialog";

export function TwitterAccountsListPage() {
  const [accounts] = api.twitterAccount.all.useSuspenseQuery();
  const [modalState, setModalState] = useState<ModalState>(null);

  return (
    <ModalContext.Provider value={{ modalState, setModalState }}>
      <TwitterAccountsList accounts={accounts} />
      <TwitterAccountDeleteDialog />
      <TwitterAccountFormDialog
        open={modalState?.type === "edit"}
        setOpen={(open: boolean) => setModalState(open ? modalState : null)}
        initialAccount={modalState?.account ?? null}
      />
    </ModalContext.Provider>
  );
}

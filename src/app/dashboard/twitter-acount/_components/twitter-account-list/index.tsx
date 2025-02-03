"use client";

import { useState } from "react";

import type { ModalState } from "./types";
import { api } from "~/trpc/react";
import { TwitterAccountFormDialog } from "../twitter-account-form";
import { TwitterAccountDeleteDialog } from "./index.account-delete-dialog";
import { TwitterAccountsList } from "./index.account-list";
import { ModalContext } from "./types";

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

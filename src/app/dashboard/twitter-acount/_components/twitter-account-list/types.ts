import { createContext, useContext } from "react";

import { type TwitterAccount } from "~/server/types";

export type ModalState = {
  type: "delete" | "edit";
  account: TwitterAccount;
} | null;

export type ModalContextType = {
  modalState: ModalState;
  setModalState: (state: ModalState) => void;
};

export const ModalContext = createContext<ModalContextType | undefined>(
  undefined,
);

export function useModalContext() {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error("useModalContext must be used within a ModalProvider");
  }
  return context;
}

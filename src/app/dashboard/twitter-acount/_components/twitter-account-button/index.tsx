"use client";

import React, { useState } from "react";

import { Button } from "~/components/ui/button";
import { TwitterAccountFormDialog } from "../twitter-account-form";

export const TwitterAccountButton = () => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button onClick={() => setOpen(true)}>ツイッターアカウントの作成</Button>
      <TwitterAccountFormDialog
        open={open}
        setOpen={setOpen}
        initialAccount={null}
      />
    </>
  );
};

import React from "react";
import { Settings } from "lucide-react";

import { Button } from "~/components/ui/button";
import { type ApiKeyType } from "~/server/types";

export const OpenAiButton = ({
  setSelectedApiType,
  setOpen,
}: {
  setSelectedApiType: (type: ApiKeyType) => void;
  setOpen: (open: boolean) => void;
}) => {
  return (
    <Button
      onClick={() => {
        setSelectedApiType("OPENAI_API_KEY");
        setOpen(true);
      }}
      className="bg-gradient-to-r from-green-600 to-emerald-600 text-white hover:opacity-90"
    >
      <Settings className="mr-2 h-4 w-4" />
      設定
    </Button>
  );
};

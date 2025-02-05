import React from "react";
import { Settings } from "lucide-react";

import { Button } from "~/components/ui/button";
import { cn } from "~/lib/utils";
import { type ApiKeyType } from "~/server/types";

const gradientVariants = {
  openai: "bg-gradient-to-r from-green-600 to-emerald-600",
  gemini: "bg-gradient-to-r from-blue-600 to-cyan-600",
} as const;

type GradientVariant = keyof typeof gradientVariants;

export const AIButton = ({
  setSelectedApiType,
  setOpen,
  variant,
  className,
}: {
  setSelectedApiType: (type: ApiKeyType) => void;
  setOpen: (open: boolean) => void;
  variant: GradientVariant;
  className?: string;
}) => {
  return (
    <Button
      onClick={() => {
        setSelectedApiType("OPENAI_API_KEY");
        setOpen(true);
      }}
      className={cn(
        gradientVariants[variant],
        "text-white hover:opacity-90",
        className,
      )}
    >
      <Settings className="mr-2 h-4 w-4" />
      設定
    </Button>
  );
};

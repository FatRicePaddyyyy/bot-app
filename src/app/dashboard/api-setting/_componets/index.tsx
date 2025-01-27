"use client";

import { useState } from "react";

import { type ApiKeyType } from "~/server/types";
import { ApiCard } from "./index.api-card";
import { ApiSettingDialog } from "./index.dailog";

export function ApiSettingForm() {
  const [open, setOpen] = useState(false);
  const [selectedApiType, setSelectedApiType] = useState<ApiKeyType>(undefined);

  return (
    <div>
      <h1 className="mb-8 text-3xl font-bold">API設定</h1>
      <div className="space-y-8">
        <ApiCard
          type="OPENAI_API_KEY"
          duration={0.4}
          delay={0}
          setSelectedApiType={setSelectedApiType}
          setOpen={setOpen}
        />
        <ApiCard
          type="GEMINI_API_KEY"
          duration={0.4}
          delay={0.2}
          setSelectedApiType={setSelectedApiType}
          setOpen={setOpen}
        />
      </div>
      <ApiSettingDialog
        selectedApiType={selectedApiType}
        open={open}
        setOpen={setOpen}
      />
    </div>
  );
}

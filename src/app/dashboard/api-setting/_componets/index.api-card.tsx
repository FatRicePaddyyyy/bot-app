import React from "react";
import { motion } from "framer-motion";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { type ApiKeyType } from "~/server/types";
import { AIButton } from "./index.button";

export const ApiCard = ({
  type,
  duration,
  delay,
  setSelectedApiType,
  setOpen,
}: {
  type: ApiKeyType;
  duration: number;
  delay: number;
  setSelectedApiType: (type: ApiKeyType) => void;
  setOpen: (open: boolean) => void;
}) => {
  const title = type === "OPENAI_API_KEY" ? "OpenAI API" : "Gemini API";
  const description =
    type === "OPENAI_API_KEY"
      ? "OpenAIのAPIキーを設定します"
      : "Google AI Studioで生成されたAPIキーを設定します";
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: duration, delay: delay }}
    >
      <Card className="group transition-shadow duration-300 hover:shadow-lg">
        <CardHeader className="space-y-1">
          <div className="flex items-center justify-between">
            <CardTitle
              className={`${
                type === "GEMINI_API_KEY"
                  ? "bg-gradient-to-r from-blue-600 to-cyan-600"
                  : "bg-gradient-to-r from-green-600 to-emerald-600"
              } bg-clip-text text-2xl text-transparent`}
            >
              {title}
            </CardTitle>
          </div>
          <CardDescription>{description}</CardDescription>
        </CardHeader>
        <CardContent className="flex justify-end">
          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
            {type === "OPENAI_API_KEY" ? (
              <AIButton
                variant="openai"
                setSelectedApiType={setSelectedApiType}
                setOpen={setOpen}
              />
            ) : (
              <AIButton
                variant="gemini"
                setSelectedApiType={setSelectedApiType}
                setOpen={setOpen}
              />
            )}
          </motion.div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

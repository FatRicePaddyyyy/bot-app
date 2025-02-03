import { motion } from "framer-motion";

import { type TwitterAccount } from "~/server/types";
import { HoverButton } from "./index.hover-button";

export function TwitterAccountCard({ account }: { account: TwitterAccount }) {
  return (
    <motion.div
      key={account.id}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="group rounded-lg border p-4 transition-all duration-200 hover:bg-gray-50"
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
            <p className="text-sm text-gray-500">Twitterハンドル名:</p>
            <p>{account.twitterHandle}</p>
          </div>
        </div>
        <HoverButton account={account} />
      </div>
    </motion.div>
  );
}

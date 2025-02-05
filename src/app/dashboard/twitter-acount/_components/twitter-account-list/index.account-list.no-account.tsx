import { motion } from "framer-motion";

export function NoAccount() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex items-center justify-center py-6 text-gray-500"
    >
      <p>登録済みのアカウントはありません</p>
    </motion.div>
  );
}

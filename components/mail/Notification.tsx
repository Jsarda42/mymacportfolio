"use client";
import { motion, AnimatePresence } from "framer-motion";
import { Mail } from "lucide-react";

export default function Notification({ title, message, visible }: { title: string, message: string, visible: boolean }) {
  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ x: 350, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: 350, opacity: 0 }}
          transition={{ type: "spring", damping: 20, stiffness: 100 }}
          className="absolute top-4 right-4 z-100 w-72 bg-white/80 dark:bg-[#2c2c2c]/80 backdrop-blur-md border border-black/5 dark:border-white/10 shadow-xl rounded-2xl p-3 flex gap-3 items-start select-none pointer-events-none"
        >
          <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center shrink-0 shadow-sm">
            <Mail className="text-white" size={20} />
          </div>
          <div className="min-w-0">
            <h5 className="text-[13px] font-bold text-black dark:text-white leading-tight truncate">{title}</h5>
            <p className="text-[12px] text-black/60 dark:text-white/60 mt-0.5 leading-snug">{message}</p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
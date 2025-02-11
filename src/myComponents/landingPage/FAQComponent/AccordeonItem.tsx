"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown } from "lucide-react";

interface AccordeonItemProps {
  question: string;
  answer: string;
  isOpen: boolean;
  onToggle: () => void;
}

export const AccordeonItem = ({
  question,
  answer,
  isOpen,
  onToggle,
}: AccordeonItemProps) => {
  return (
    <div className="border rounded-lg mb-4 shadow-sm  ">
      <button
        onClick={onToggle}
        className={`w-full p-4 flex justify-between items-start gap-6 bg-white hover:bg-purpleLight/10 rounded-lg transition-colors duration-200 ease-in-out ${
          isOpen &&
          "bg-purple-100 rounded-b-none border border-purpleLight/50"
        }`}
      >
        <p className="font-medium text-gray-900 text-left">{question}</p>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{
            type: "spring",
            stiffness: 400,
            damping: 15,
            mass: 0.8,
          }}
        >
          <ChevronDown className="mt-1 h-5 w-5 text-gray-500" />
        </motion.div>
      </button>

      <AnimatePresence mode="wait" initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0 }}
            animate={{
              height: "auto",
              transition: {
                type: "spring",
                stiffness: 400,
                damping: 19,
                mass: 0.8,
              },
            }}
            exit={{
              height: 0,
              transition: {
                type: "tween",
                duration: 0.2,
                ease: "easeInOut",
              },
            }}
            className="overflow-hidden"
          >
            <div className="p-4 text-gray-600 bg-gray-50">{answer}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

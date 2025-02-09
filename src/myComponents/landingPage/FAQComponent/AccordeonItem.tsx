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
    <div className="border rounded-lg mb-4 ">
      <button
        onClick={onToggle}
        className={`w-full p-4 flex justify-between items-center bg-white hover:bg-purpleLight/10 rounded-lg transition-colors duration-200 ease-in-out ${
          isOpen &&
          "bg-purpleLight/10 rounded-b-none border border-purpleLight/50"
        }`}
      >
        <span className="font-medium text-gray-900">{question}</span>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{
            type: "spring",
            stiffness: 400,
            damping: 15,
            mass: 0.8,
          }}
        >
          <ChevronDown className="h-5 w-5 text-gray-500" />
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
                damping: 15,
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

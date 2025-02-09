// FaqInteractive.tsx (Client Component)
'use client'

import { useState } from 'react'
import { AccordeonItem } from './AccordeonItem';

interface FaqInteractiveProps {
  items: {
    question: string;
    answer: string;
  }[];
}

export const FaqInteractive = ({ items }: FaqInteractiveProps) => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const handleToggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div>
      {items.map((item, index) => (
        <AccordeonItem
          key={index} 
          question={item.question} 
          answer={item.answer}
          isOpen={openIndex === index}
          onToggle={() => handleToggle(index)}
        />
      ))}
    </div>
  );
};
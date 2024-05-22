"use client";

import { useRef, Dispatch, SetStateAction } from "react";
import { Dot } from "lucide-react";

import { AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

interface RegisterFaqCardProps {
  order: string;
  question: string;
  answer: string;
  faqOpen: string | null;
  setFaqOpen: Dispatch<SetStateAction<null | string>>;
  index: number;
}

const RegisterFaqCard = ({ order, question, answer }: RegisterFaqCardProps) => {
  const answerRef = useRef<HTMLDivElement>(null);

  return (
    <AccordionItem value={order} className="w-full flex flex-col">
      <AccordionTrigger className="w-full px-7 py-4 bg-white rounded-lg flex align-center justify-between relative">
        <label className="cursor-pointer flex gap-2 align-start text-gray-primary text-lg text-left font-medium">
          <div className="flex gap-2 items-center h-fit">
            <span className="text-lg text-green-primary font-medium">{order}</span>
            <Dot strokeWidth={20} color="#2C383F" className="w-1" />
          </div>

          {question}
        </label>
      </AccordionTrigger>

      <AccordionContent className="pb-0">
        <div ref={answerRef} className="bg-green-primary w-full h-full rounded-lg pt-10 px-7 pb-4 -mt-5">
          <p className="text-base text-white font-medium">{answer}</p>
        </div>
      </AccordionContent>
    </AccordionItem>
  );
};

export default RegisterFaqCard;

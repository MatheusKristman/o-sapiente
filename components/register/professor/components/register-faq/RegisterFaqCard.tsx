"use client";

import {
  useRef,
  useEffect,
  useState,
  Dispatch,
  SetStateAction,
  Ref,
} from "react";
import { ChevronDown, Dot } from "lucide-react";
import { Transition } from "@headlessui/react";

import { Button } from "@/components/ui/button";

interface RegisterFaqCardProps {
  order: string;
  question: string;
  answer: string;
  faqOpen: string | null;
  setFaqOpen: Dispatch<SetStateAction<null | string>>;
  index: number;
}

const RegisterFaqCard = ({
  order,
  question,
  answer,
  faqOpen,
  setFaqOpen,
}: RegisterFaqCardProps) => {
  const [clientHeight, setClientHeight] = useState(0);

  const answerRef = useRef<HTMLDivElement>(null);

  function handleFaqSelection(selected: string) {
    if (selected === faqOpen) {
      setFaqOpen(null);

      return;
    }

    setFaqOpen(selected);
  }

  return (
    <div className="w-full flex flex-col">
      <div className="w-full px-7 py-4 bg-white rounded-lg flex align-center justify-between relative">
        <label className="flex gap-2 align-start text-gray-primary text-lg font-medium">
          <div className="flex gap-2 items-center h-fit">
            <span className="text-lg text-green-primary font-medium">
              {order}
            </span>
            <Dot strokeWidth={20} color="#2C383F" className="w-1" />
          </div>
          {question}
        </label>
        <Button
          variant="link"
          size="icon"
          type="button"
          className="text-green-primary"
          onClick={() => handleFaqSelection(order)}
        >
          <ChevronDown
            size={30}
            strokeWidth={2}
            className={`${
              faqOpen === order ? "transform rotate-180" : "transform rotate-0"
            } transition-transform`}
          />
        </Button>
      </div>
      <Transition
        show={faqOpen === order}
        enter="transition-[max-height] duration-500 ease-in-out"
        enterFrom="max-h-[8px]"
        enterTo={`max-h-[600px]`}
        leave="transition-[max-height] duration-300 ease-in-out"
        leaveFrom={`max-h-[600px]`}
        leaveTo="max-h-[8px]"
        className="overflow-hidden -mt-2"
      >
        <div
          ref={answerRef}
          className="bg-green-primary w-full h-full rounded-lg pt-10 px-7 pb-4 -mt-5 overflow-hidden"
        >
          <p className="text-base text-white font-medium">{answer}</p>
        </div>
      </Transition>
    </div>
  );
};

export default RegisterFaqCard;

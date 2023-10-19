import { ChevronDown, Dot } from "lucide-react";

interface RegisterFaqCardProps {
  order: string;
  question: string;
  answer: string;
}

const RegisterFaqCard = ({ order, question, answer }: RegisterFaqCardProps) => {
  return (
    <div className="w-full flex flex-col">
      <div className="w-full px-7 py-4 bg-white rounded-lg flex align-center justify-between relative">
        <label className="flex gap-2 align-start text-gray-primary text-lg font-medium">
          <div className="flex gap-2 items-center h-fit">
            <span className="text-lg text-green-primary font-medium">{order}</span>
            <Dot
              strokeWidth={20}
              color="#2C383F"
              className="w-1"
            />
          </div>
          {question}
        </label>
        <button type="button" className="text-green-primary">
          <ChevronDown size={30} strokeWidth={2} />
        </button>
      </div>
      <div className="bg-green-primary w-full rounded-lg pt-10 px-7 pb-4 -mt-5">
        <p className="text-base text-white font-medium">{answer}</p>
      </div>
    </div>
  );
};

export default RegisterFaqCard;

import { ChevronDown, Dot } from "lucide-react";

interface RegisterFaqCardProps {
  order: string;
  question: string;
  answer: string;
}

const RegisterFaqCard = ({ order, question, answer }: RegisterFaqCardProps) => {
  return (
    <div>
      <div>
        <label>
          <span>{order}</span>
          <Dot
            style={{
              width: "35px",
              height: "35px",
            }}
          />
          {question}
        </label>
        <button type="button">
          <ChevronDown />
        </button>
      </div>
      <div>
        <p>{answer}</p>
      </div>
    </div>
  );
};

export default RegisterFaqCard;

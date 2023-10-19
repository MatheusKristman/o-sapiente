import { professorRegisterFaqInfo } from "@/constants/register/professor-register-br";
import RegisterFaqCard from "./components/register-faq/RegisterFaqCard";

const RegisterFaq = () => {
  return (
    <section>
      <div>
        <h2>{professorRegisterFaqInfo.title}</h2>
        <div>
          {professorRegisterFaqInfo.faq.map((faq, index) => (
            <RegisterFaqCard order={faq.order} question={faq.question} answer={faq.answer} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default RegisterFaq;

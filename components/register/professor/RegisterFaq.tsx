import { professorRegisterFaqInfo } from "@/constants/register/professor-register-br";
import RegisterFaqCard from "./components/register-faq/RegisterFaqCard";

const RegisterFaq = () => {
  return (
    <section className="w-full bg-[#E5ECF0]">
      <div className="w-full px-6 py-12 mx-auto md:px-16 lg:max-w-4xl">
        <h2 className="w-full text-2xl text-gray-primary font-semibold text-center mb-12 md:text-3xl">{professorRegisterFaqInfo.title}</h2>
        <div className="w-full flex flex-col gap-6">
          {professorRegisterFaqInfo.faq.map((faq, index) => (
            <RegisterFaqCard key={faq.order} order={faq.order} question={faq.question} answer={faq.answer} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default RegisterFaq;

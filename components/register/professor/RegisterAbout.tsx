import { professorRegisterAboutInfo } from "@/constants/register/professor-register-br";
import RegisterAboutCard from "./components/register-about/RegisterAboutCard";

const RegisterAbout = () => {
  return (
    <section className="w-full bg-[#E5ECF0] py-12">
      <div className="w-full mx-auto px-6 md:px-16 lg:container">
        <h2 className="w-full text-2xl text-center text-gray-primary font-semibold mb-12 md:text-3xl">
          {professorRegisterAboutInfo.title}
        </h2>
        <div className="w-full flex flex-col gap-12 md:gap-16 lg:gap-12">
          {professorRegisterAboutInfo.steps.map((step, index) => (
            <RegisterAboutCard
              key={step.step}
              index={index}
              step={step.step}
              title={step.title}
              desc={step.desc}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default RegisterAbout;

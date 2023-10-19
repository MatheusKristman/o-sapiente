import { professorRegisterBenefitsInfo } from "@/constants/register/professor-register-br";
import RegisterBenefitsCard from "./components/register-benefits/RegisterBenefitsCard";

const RegisterBenefits = () => {
  return (
    <section className="w-full px-6 py-12 mx-auto lg:container">
      <h2 className="w-full text-2xl text-gray-primary font-semibold text-center mb-12">
        {professorRegisterBenefitsInfo.title}
      </h2>
      <div className="w-full flex flex-wrap gap-10 items-start justify-evenly lg:flex-nowrap">
        {professorRegisterBenefitsInfo.benefits.map((benefit, index) => (
          <RegisterBenefitsCard key={benefit.title} title={benefit.title} desc={benefit.desc} index={index} />
        ))}
      </div>
    </section>
  );
};

export default RegisterBenefits;

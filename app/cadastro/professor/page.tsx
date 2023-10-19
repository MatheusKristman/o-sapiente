import RegisterForm from "@/components/register/professor/RegisterForm";
import RegisterAbout from "@/components/register/professor/RegisterAbout";
import RegisterBenefits from "@/components/register/professor/RegisterBenefits";
import RegisterFaq from "@/components/register/professor/RegisterFaq";

const RegisterPage = () => {
  return (
    <>
      <RegisterForm />
      <RegisterAbout />
      <RegisterBenefits />
      <RegisterFaq />
    </>
  );
};

export default RegisterPage;

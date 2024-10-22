import RegisterForm from "@/components/register/professor/RegisterForm";
import RegisterAbout from "@/components/register/professor/RegisterAbout";
import RegisterBenefits from "@/components/register/professor/RegisterBenefits";
import RegisterFaq from "@/components/register/professor/RegisterFaq";
import RegisterLogin from "@/components/register/professor/components/register-login/RegisterLogin";
import LoginModal from "@/components/home/LoginModal";

const RegisterPage = () => {
  return (
    <>
      <RegisterLogin />
      <RegisterForm />
      <RegisterAbout />
      <RegisterBenefits />
      <RegisterFaq />
    </>
  );
};

export default RegisterPage;

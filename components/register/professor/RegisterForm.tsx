import Link from "next/link";

import { professorRegisterFormInfo } from "@/constants/register/professor-register-br";

const RegisterForm = () => {
  const inputStyle =
    "w-full h-11 bg-[#EBEFF1] rounded-md px-4 text-base text-gray-primary placeholder:font-medium border-2 border-[#EBEFF1] focus:border-[#9DA5AA] outline-none transition-[border]";

  return (
    <section className="pt-12 pb-12 w-full bg-registerLeftShape bg-no-repeat bg-[length:100%_100%] bg-left-top md:bg-[length:50%_auto] md:bg-left lg:bg-contain lg:pb-24">
      <div className="w-full px-6 mx-auto flex flex-col gap-6 md:px-16 md:gap-12 lg:container lg:mx-auto lg:flex-row lg:justify-between">
        <div className="w-full flex flex-col justify-center gap-4 lg:justify-start lg:pt-24 lg:max-w-xl">
          <h1 className="text-3xl text-center font-semibold text-gray-primary md:text-4xl lg:text-left">
            {professorRegisterFormInfo.title}
          </h1>
          <p className="text-lg text-center text-gray-primary lg:text-left">
            {professorRegisterFormInfo.desc}
          </p>
        </div>
        <div className="bg-white shadow-lg shadow-[rgba(0,0,0,0.25)] rounded-2xl px-6 py-9 max-w-xl mx-auto lg:mx-0">
          <h3 className="text-xl font-semibold text-gray-primary mb-6 lg:text-2xl">
            {professorRegisterFormInfo.formTitle}
          </h3>
          <form className="w-full flex flex-col gap-6 mb-6">
            <div className="w-full flex flex-col gap-4">
              <input className={inputStyle} placeholder={professorRegisterFormInfo.name} />
              <input className={inputStyle} placeholder={professorRegisterFormInfo.lastName} />
              <input className={inputStyle} placeholder={professorRegisterFormInfo.email} />
              <input className={inputStyle} placeholder={professorRegisterFormInfo.tel} />
              <input className={inputStyle} placeholder={professorRegisterFormInfo.password} />
              <input
                className={inputStyle}
                placeholder={professorRegisterFormInfo.confirmPassword}
              />
            </div>
            <button
              type="button" //depois mudar para submit
              className="w-full h-11 bg-green-primary rounded-md flex items-center justify-center text-white text-base font-semibold transition disabled:brightness-75 disabled:hover:brightness-75 lg:hover:brightness-90"
            >
              {professorRegisterFormInfo.registerBtn}
            </button>
          </form>
          <div className="w-full border-t border-[#EBEFF1] pt-6 flex flex-col gap-4">
            <span className="w-full text-base text-gray-primary font-semibold text-center">
              {professorRegisterFormInfo.alreadyHasAccount.desc + " "}
              <button
                type="button"
                className="text-green-primary cursor-pointer lg:hover:underline"
              >
                {professorRegisterFormInfo.alreadyHasAccount.link}
              </button>
            </span>
            <span className="text-sm text-gray-primary/60 font-medium text-center">
              {professorRegisterFormInfo.privacy.text + " "}
              <Link
                className="underline text-gray-primary/80"
                href={professorRegisterFormInfo.privacy.link.href}
              >
                {professorRegisterFormInfo.privacy.link.text}
              </Link>
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RegisterForm;

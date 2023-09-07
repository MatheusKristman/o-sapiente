import { studentRequestInfo } from "@/constants/studentModal-br";

const StudentRequestForm = () => {
  return (
    <form>
      <input
        placeholder={studentRequestInfo.themePlaceholder}
        name="topic"
        autoComplete="off"
        autoCorrect="off"
        className="w-full h-11 rounded-lg px-4 py-2 bg-[#EBEFF1] outline-none text-[#2C383F] placeholder:text-[#9DA5AA] focus:bg-[#DAE2E7] transition-colors mb-4"
      />

      <textarea
        placeholder={studentRequestInfo.messagePlaceholder}
        name="message"
        autoComplete="off"
        autoCorrect="off"
        className="w-full h-24 rounded-lg px-4 py-2 bg-[#EBEFF1] outline-none text-[#2C383F] placeholder:text-[#9DA5AA] focus:bg-[#DAE2E7] transition-colors resize-none mb-6 sm:h-40"
      />

      <button
        type="submit"
        className="w-full h-11 rounded-lg flex items-center justify-center bg-green-primary text-white text-base font-semibold cursor-pointer lg:hover:brightness-90 transition-[filter]"
      >
        {studentRequestInfo.nextButton}
      </button>
    </form>
  );
};

export default StudentRequestForm;

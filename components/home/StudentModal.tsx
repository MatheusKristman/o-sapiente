import { BsXLg } from "react-icons/bs";

import { studentRequestInfo } from "@/constants/studentModal-br";
import StudentRequestForm from "./components/student-request/StudentRequestForm";

const StudentModal = () => {
  return (
    <div className="w-screen h-screen bg-[#2C383F]/75 fixed top-0 left-0 right-0 bottom-0 z-[9999] flex items-center justify-center overflow-auto p-6">
      <div className="w-full max-w-[550px] bg-white p-9 rounded-2xl">
        <div className="flex justify-end mb-6">
          <button type="button" className="text-green-primary">
            <BsXLg size={26} />
          </button>
        </div>

        <h4 className="text-2xl text-[#2C383F] font-semibold mb-9 sm:text-3xl">
          {studentRequestInfo.title}
        </h4>

        <StudentRequestForm />
      </div>
    </div>
  );
};

export default StudentModal;

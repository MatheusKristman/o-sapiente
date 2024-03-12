import Image from "next/image";

import { requestDetailsInfo } from "@/constants/requestDetails-br";
import useRequestDetailsModalStore from "@/stores/useRequestDetailModalStore";
import Button from "@/components/Button";

const RequestDetailsModalResume = () => {
  const { studentImage, studentName, subject, message } =
    useRequestDetailsModalStore();

  return (
    <div className="w-full flex flex-col">
      <h3 className="text-3xl font-semibold text-gray-primary text-left mb-6">
        {requestDetailsInfo.title}
      </h3>

      <div className="w-full flex items-center gap-x-4 mb-4">
        <div className="relative w-12 h-12 overflow-hidden rounded-full">
          <Image
            src={
              studentImage
                ? studentImage
                : "/assets/images/default-user-photo.svg"
            }
            alt="Aluno"
            fill
            className="object-cover object-center"
          />
        </div>

        <h5 className="text-lg font-semibold text-gray-primary">
          {studentName}
        </h5>
      </div>

      <div className="w-full flex gap-x-2 mb-4">
        <span className="text-lg font-semibold text-green-primary">
          {requestDetailsInfo.subject}
        </span>

        <span className="text-base text-gray-primary mt-1">{subject}</span>
      </div>

      <div className="w-full flex gap-x-2 mb-6">
        <span className="text-lg font-semibold text-green-primary">
          {requestDetailsInfo.message}
        </span>

        <span className="text-base text-gray-primary text-left mt-1">
          {message}
        </span>
      </div>

      <Button label={requestDetailsInfo.btn} fullWidth primary type="button" />
    </div>
  );
};

export default RequestDetailsModalResume;

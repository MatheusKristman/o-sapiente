import Image from "next/image";
import { Dot } from "lucide-react";

import Button from "@/components/Button";
import { professorResumeInfos } from "@/constants/dashboard/resume-br";

interface ResumeRequestBoxProps {
  type: string;
}

const ResumeRequestBox = ({ type }: ResumeRequestBoxProps) => {
  return (
    <div className="w-full rounded-lg bg-green-primary p-9 mb-5 shadow-md shadow-[rgba(0,0,0,0.25)]">
      <h2 className="text-white text-2xl font-semibold mb-5 md:text-3xl lg:whitespace-nowrap whitespace-normal">
        {type === "Professor" ? professorResumeInfos.requestBoxTitle : null}
        {type === "Student" ? "Solicitações Pendentes" : null}
      </h2>

      <div className="relative w-full max-h-[300px] overflow-auto scrollbar scrollbar-thumb-slate-100">
        <div className="sticky top-0 left-0 w-full h-6 bg-gradient-to-b from-green-primary to-transparent" />
        <div className="w-full rounded-lg bg-white p-5 mb-4 last:mb-0">
          <div className="flex flex-col lg:flex-row lg:gap-6 xl:w-full">
            <div className="flex justify-center xl:w-1/12">
              <Image
                src="/assets/images/profile-test.png"
                alt="Perfil"
                width={50}
                height={40}
                className="object-cover rounded-3xl lg:w-12 lg:h-12"
              />
            </div>

            <div className="flex flex-col items-center justify-center p-2.5 text-green-primary text-lg font-semibold lg:p-1 lg:flex-row xl:w-6/12 xl:justify-start">
              <span className="-mb-3 lg:mb-0">John Doe</span>

              <Dot
                style={{
                  width: "35px",
                  height: "35px",
                }}
              />

              <span className="text-base -mt-3 lg:mt-0">Matemática</span>
            </div>

            <div className="xl:flex xl:justify-end xl:w-5/12">
              <div className="flex items-center justify-center">
                <Button primary fullWidth label="VER PROPOSTA" onClick={() => {}} />
              </div>
            </div>
          </div>
        </div>

        {/* o ultimo fica sem margin no bottom */}
        <div className="w-full rounded-lg bg-white p-5 mb-0">
          <div className="flex flex-col lg:flex-row lg:gap-6 xl:w-full">
            <div className="flex justify-center xl:w-1/12">
              <Image
                src="/assets/images/profile-test.png"
                alt="Perfil"
                width={50}
                height={40}
                className="object-cover rounded-3xl lg:w-12 lg:h-12"
              />
            </div>

            <div className="flex flex-col items-center justify-center p-2.5 text-green-primary text-lg font-semibold lg:p-1 lg:flex-row xl:w-6/12 xl:justify-start">
              <span className="-mb-3 lg:mb-0">John Doe</span>

              <Dot
                style={{
                  width: "35px",
                  height: "35px",
                }}
              />

              <span className="text-base -mt-3 lg:mt-0">Matemática</span>
            </div>

            <div className="xl:flex xl:justify-end xl:w-5/12">
              <div className="flex items-center justify-center">
                <Button primary fullWidth label="VER PROPOSTA" onClick={() => {}} />
              </div>
            </div>
          </div>
        </div>
        <div className="sticky bottom-0 left-0 w-full h-6 bg-gradient-to-t from-green-primary to-transparent" />
      </div>
    </div>
  );
};

export default ResumeRequestBox;

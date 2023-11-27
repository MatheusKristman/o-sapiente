import Image from "next/image";
import { useRouter } from "next/navigation";

import { confirmAccountStepInfo } from "@/constants/confirmAccountStep-br";
import Button from "@/components/Button";
import { IProfileData } from "@/app/cadastro/professor/finalizacao/[id]/page";

interface ConfirmAccountStepProps {
  profileData: IProfileData | null;
}

const ConfirmAccountStep = ({ profileData }: ConfirmAccountStepProps) => {
  const router = useRouter();

  function handleBackBtn() {
    router.replace("/");
  }

  return (
    <section className="w-full h-full pb-12 flex  flex-col justify-center">
      <div className="w-full mx-auto px-6 pt-24 flex flex-col items-center justify-center md:px-16 lg:container">
        <h2 className="w-full text-2xl text-gray-primary font-semibold text-center mb-9 max-w-md md:text-3xl md:max-w-xl">
          {confirmAccountStepInfo.title[0] + " "}
          <span className="text-green-primary">{confirmAccountStepInfo.titleColored[0] + " "}</span>
          {confirmAccountStepInfo.title[1] + " "}
          <span className="text-green-primary relative after:content-[''] after:w-4 after:h-4 after:block after:bg-highlight after:bg-contain after:bg-no-repeat after:absolute after:top-1 after:-right-3">
            {confirmAccountStepInfo.titleColored[1]}
          </span>
        </h2>

        <div className="w-full bg-white rounded-lg px-9 py-5 shadow-lg shadow-[rgba(0,0,0,0.25)] flex items-center justify-between mb-16 sm:max-w-lg">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-center">
            <div className="relative w-14 h-14 min-w-[56px] min-h-[56px] rounded-full overflow-hidden">
              {/* TODO depois adicionar foto padrão caso o perfil não possua foto */}
              <Image
                src={profileData?.profilePhoto || "/assets/images/avatar-example.png"}
                alt="Perfil"
                fill
                className="object-cover w-full h-full"
              />
            </div>

            <div className="flex flex-col gap-2">
              <span className="text-xl font-semibold text-gray-primary">{`${
                profileData!.firstName
              } ${profileData!.lastName}`}</span>
              {profileData!.type === "Professor" && (
                <span className="text-base text-gray-primary font-medium">
                  {profileData!.themes.join(", ")}
                </span>
              )}
            </div>
          </div>

          <div>
            <Image
              src="/assets/icons/check.svg"
              alt="Confirmar"
              width={50}
              height={50}
              className="object-contain"
            />
          </div>
        </div>

        <p className="text-base text-center leading-7 text-gray-primary mb-9 max-w-2xl">
          {confirmAccountStepInfo.description}
        </p>

        <Button label={confirmAccountStepInfo.backBtn} onClick={handleBackBtn} primary />
      </div>
    </section>
  );
};

export default ConfirmAccountStep;

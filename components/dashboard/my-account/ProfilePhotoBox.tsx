import Image from "next/image";

import Button from "@/components/Button";
import { MyAccountInfo } from "@/constants/dashboard/my-account-br";

const ProfilePhotoBox = () => {
  return (
    <div className="bg-white w-full p-9 rounded-2xl shadow-md shadow-[rgba(0,0,0,0.25)] flex flex-col gap-y-6 sm:max-w-[290px] lg:max-w-none">
      <div className="relative aspect-square rounded-2xl overflow-hidden">
        <Image
          src="/assets/images/profile-test.jpg"
          alt="Foto de perfil"
          fill
          className="object-cover w-full h-full"
        />
      </div>

      <Button
        primary
        fullWidth
        onClick={() => {}}
        label={MyAccountInfo.changePhotoBtn}
        icon={
          <span className="bg-camera-white bg-cover bg-no-repeat block w-6 h-6 min-w-[24px] min-h-[24px]" />
        }
      />
    </div>
  );
};

export default ProfilePhotoBox;

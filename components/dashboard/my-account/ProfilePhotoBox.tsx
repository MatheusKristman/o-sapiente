import Image from "next/image";
import { Dispatch, SetStateAction, useState } from "react";
import { toast } from "react-hot-toast";
import axios from "axios";

import { MyAccountInfo } from "@/constants/dashboard/my-account-br";
import { Loader2 } from "lucide-react";
import { cn } from "@/libs/utils";

interface ProfilePhotoBoxProps {
  profilePhotoUrl: string;
  setProfilePhotoUrl: Dispatch<SetStateAction<string>>;
  email: string | null | undefined;
}

const ProfilePhotoBox = ({ profilePhotoUrl, setProfilePhotoUrl, email }: ProfilePhotoBoxProps) => {
  const [isSendingImage, setSendingImage] = useState<boolean>(false);

  function handleImage(event: React.ChangeEvent<HTMLInputElement>) {
    setSendingImage(true);

    if (!event.target.files) {
      return;
    }

    const file = event.target.files[0];

    if (!file) {
      return;
    }

    if (file && file.type.startsWith("image/")) {
      const formData = new FormData();

      formData.append("profilePhoto", file);
      formData.append("email", email!);

      axios
        .patch("/api/user/update-photo", formData)
        .then((res) => setProfilePhotoUrl(res.data.profilePhoto))
        .catch((error) => {
          console.error(error);
          toast.error(error.response.data);
        })
        .finally(() => setSendingImage(false));

      return;
    }

    toast.error("Formado da image é inválido");

    setSendingImage(false);
  }

  return (
    <div className="bg-white w-full p-9 rounded-2xl shadow-md shadow-[rgba(0,0,0,0.25)] flex flex-col gap-y-6 sm:max-w-[290px] lg:max-w-none">
      <div className="relative aspect-square rounded-2xl overflow-hidden">
        <Image
          src={profilePhotoUrl ? profilePhotoUrl : "/assets/images/default-user-photo.svg"}
          alt="Foto de perfil"
          fill
          className="object-cover w-full h-full"
        />
      </div>

      <label
        htmlFor="profilePhoto"
        className={cn(
          "w-full bg-green-primary border-green-primary text-white hover:brightness-90 transition disabled:brightness-75 disabled:hover:brightness-75 py-1.5 px-8 flex items-center justify-center gap-2 text-base rounded-lg border-2 font-medium disabled:cursor-not-allowed lg:cursor-pointer",
          isSendingImage &&
            "cursor-not-allowed brightness-75 hover:brightness-75 lg:cursor-not-allowed",
        )}
      >
        {isSendingImage ? (
          <Loader2 className="w-8 h-8 text-white animate-spin" />
        ) : (
          <>
            <span className="bg-camera-white bg-cover bg-no-repeat block w-6 h-6 min-w-[24px] min-h-[24px]" />
            <span>{MyAccountInfo.changePhotoBtn}</span>
          </>
        )}
      </label>

      <input
        type="file"
        id="profilePhoto"
        name="profilePhoto"
        className="hidden"
        onChange={(event) => handleImage(event)}
        disabled={isSendingImage}
      />
    </div>
  );
};

export default ProfilePhotoBox;

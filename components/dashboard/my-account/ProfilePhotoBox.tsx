import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { toast } from "react-hot-toast";
import axios from "axios";

import { MyAccountInfo } from "@/constants/dashboard/my-account-br";
import { Loader2 } from "lucide-react";
import { cn } from "@/libs/utils";
import useUserStore from "@/stores/useUserStore";
import { useUploadThing } from "@/libs/uploadthing";
import { useDropzone } from "@uploadthing/react";
import { generateClientDropzoneAccept } from "uploadthing/client";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

const ProfilePhotoBox = () => {
  const [profilePhoto, setProfilePhoto] = useState<File[] | null>(null);

  const {
    setProfilePhoto: setProfilePhotoUrl,
    profilePhoto: profilePhotoUrl,
    userId,
  } = useUserStore();

  const fileInput = useRef<HTMLInputElement | null>(null);

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      setProfilePhoto(acceptedFiles);
      setProfilePhotoUrl(URL.createObjectURL(acceptedFiles[0]));
    },
    [setProfilePhotoUrl],
  );

  const { startUpload, isUploading, permittedFileInfo } = useUploadThing(
    "profilePhotoUploader",
    {
      onClientUploadComplete: () => {
        toast.success(MyAccountInfo.changePhotoSuccessMessage);
      },
      onUploadError: (error) => {
        console.error(error);
        console.error(error.data);

        if (error.data?.message === "Unable to get presigned urls") {
          toast.error(
            "Tipo ou tamanho da imagem inválido, verifique e tente novamente. (PNG|JPG|JPEG - 1MB)",
          );

          return;
        }

        toast.error(
          "Ocorreu um erro ao enviar a imagem, tente novamente mais tarde",
        );
      },
    },
  );

  const fileTypes = permittedFileInfo?.config
    ? Object.keys(permittedFileInfo?.config)
    : [];

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: fileTypes ? generateClientDropzoneAccept(fileTypes) : undefined,
  });

  function handleDeleteButton() {
    if (fileInput.current) {
      fileInput.current.value = "";
    }

    setProfilePhoto(null);
    setProfilePhotoUrl("");
  }

  function handleNextButton() {
    if (!profilePhoto) {
      return;
    }

    // setSubmitting(true);

    // if (type === "student") {
    //     const data = new FormData();
    //     data.set("id", id);
    //
    //     axios
    //         .patch(`/api/user/save-profile/${type}`, data)
    //         .then((res) => {
    //             setProfileData(res.data);
    //             setSteps((prev: number) => prev + 1);
    //         })
    //         .catch((error) => {
    //             console.error(error);
    //
    //             toast.error(error.response.data);
    //         })
    //         .finally(() => setSubmitting(false));
    // } else if (type === "professor") {
    //     const data = new FormData();
    //     data.set("themes", JSON.stringify(selectedOptions));
    //     data.set("aboutMe", aboutMeValue!);
    //     data.set("id", id);
    //
    //     axios
    //         .patch(`/api/user/save-profile/${type}`, data)
    //         .then((res) => {
    //             setProfileData(res.data);
    //             setSteps((prev: number) => prev + 1);
    //         })
    //         .catch((error) => {
    //             console.error(error);
    //
    //             toast.error(error.response.data);
    //         })
    //         .finally(() => setSubmitting(false));
    // }
  }

  if (!userId) {
    return <ProfilePhotoBoxSkeleton />;
  }

  return (
    <div className="bg-white w-full p-9 rounded-2xl shadow-md shadow-[rgba(0,0,0,0.25)] flex flex-col gap-y-6 sm:max-w-[290px] lg:max-w-none">
      <div
        {...getRootProps()}
        className="relative aspect-square cursor-pointer rounded-2xl overflow-hidden group"
      >
        <div
          className={cn(
            "hidden lg:flex w-full h-full bg-gray-primary/70 absolute top-0 left-0 right-0 bottom-0 opacity-0 group-hover:opacity-100 z-10 items-center justify-center p-6 transition-all duration-500",
            {
              "group-hover:opacity-0": !!profilePhoto,
            },
          )}
        >
          <span className="text-lg text-white font-medium text-center">
            {MyAccountInfo.tipPhoto}
          </span>
        </div>

        <Image
          src={
            profilePhotoUrl
              ? profilePhotoUrl
              : "/assets/images/default-user-photo.svg"
          }
          alt="Foto de perfil"
          fill
          className="object-cover w-full h-full"
        />
      </div>

      <span className="text-sm flex lg:hidden font-medium text-center text-gray-primary/60">
        {MyAccountInfo.tipPhotoMobile}
      </span>

      <Button
        disabled={isUploading || !profilePhoto}
        onClick={() => startUpload(profilePhoto!, { id: userId })}
        className="flex items-center justify-center gap-2"
      >
        {isUploading ? (
          <Loader2 className="w-8 h-8 text-white animate-spin" />
        ) : (
          <>
            <span className="bg-camera-white bg-cover bg-no-repeat block w-6 h-6 min-w-[24px] min-h-[24px]" />
            <span>{MyAccountInfo.changePhotoBtn}</span>
          </>
        )}
      </Button>

      <input {...getInputProps()} disabled={isUploading} />
    </div>
  );
};

function ProfilePhotoBoxSkeleton() {
  return (
    <div className="bg-white w-full p-9 rounded-2xl shadow-md shadow-[rgba(0,0,0,0.25)] flex flex-col gap-y-6 sm:max-w-[290px] lg:max-w-none">
      <div className="relative aspect-square cursor-pointer rounded-2xl overflow-hidden group">
        <Skeleton className="w-full h-full" />
      </div>

      <Skeleton className="w-full h-12" />
    </div>
  );
}

export default ProfilePhotoBox;

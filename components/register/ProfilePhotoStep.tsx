import { useState, useEffect, useRef, useCallback } from "react";
import { toast } from "react-hot-toast";
import Image from "next/image";
import MoonLoader from "react-spinners/MoonLoader";
import { Loader2, Trash2 } from "lucide-react";
import axios from "axios";

import { Button } from "@/components/ui/button";
import { profilePhotoStepsInfo } from "@/constants/profilePhotoSteps-br";
import { IProfileData } from "@/app/cadastro/professor/finalizacao/[id]/page";
import { useUploadThing } from "@/libs/uploadthing";
import { useDropzone } from "@uploadthing/react";
import { generateClientDropzoneAccept } from "uploadthing/client";

interface ProfilePhotoStepProps {
  setSteps: React.Dispatch<React.SetStateAction<number>>;
  selectedOptions?: string[];
  aboutMeValue?: string;
  id: string;
  type: string;
  setProfileData: React.Dispatch<React.SetStateAction<IProfileData | null>>;
}

const ProfilePhotoStep: React.FC<ProfilePhotoStepProps> = ({
  setSteps,
  id,
  type,
  selectedOptions,
  aboutMeValue,
  setProfileData,
}) => {
  const [profilePhotoUrl, setProfilePhotoUrl] = useState<string>("");
  const [profilePhoto, setProfilePhoto] = useState<File[] | null>(null);
  const [isSubmitting, setSubmitting] = useState(false);
  const [isSkipAvailable, setSkipAvailable] = useState(false);

  const fileInput = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (profilePhotoUrl !== "" && profilePhoto) {
      setSkipAvailable(false);
    } else {
      setSkipAvailable(true);
    }
  }, [profilePhotoUrl, profilePhoto]);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    setProfilePhoto(acceptedFiles);
    setProfilePhotoUrl(URL.createObjectURL(acceptedFiles[0]));
  }, []);

  const { startUpload, isUploading, permittedFileInfo } = useUploadThing(
    "profilePhotoUploader",
    {
      onClientUploadComplete: () => {
        handleNextButton();
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

  function handleBackButton() {
    setProfilePhoto(null);
    setProfilePhotoUrl("");
    setSteps((prev: number) => prev - 1);
  }

  function handleSkipButton() {
    setSubmitting(true);

    if (type === "student") {
      const data = new FormData();
      data.set("id", id);

      axios
        .patch(`/api/user/save-profile/${type}`, data)
        .then((res) => {
          setProfileData(res.data);
          setSteps((prev: number) => prev + 1);
        })
        .catch((error) => {
          console.error(error);

          toast.error(error.response.data);
        })
        .finally(() => setSubmitting(false));
    } else if (type === "professor") {
      const data = new FormData();
      data.set("themes", JSON.stringify(selectedOptions));
      data.set("aboutMe", aboutMeValue!);
      data.set("id", id);

      axios
        .patch(`/api/user/save-profile/${type}`, data)
        .then((res) => {
          setProfileData(res.data);
          setSteps((prev: number) => prev + 1);
        })
        .catch((error) => {
          console.error(error);

          toast.error(error.response.data);
        })
        .finally(() => setSubmitting(false));
    }
  }

  function handleNextButton() {
    if (!profilePhoto) {
      return;
    }

    setSubmitting(true);

    if (type === "student") {
      const data = new FormData();
      data.set("id", id);

      axios
        .patch(`/api/user/save-profile/${type}`, data)
        .then((res) => {
          setProfileData(res.data);
          setSteps((prev: number) => prev + 1);
        })
        .catch((error) => {
          console.error(error);

          toast.error(error.response.data);
        })
        .finally(() => setSubmitting(false));
    } else if (type === "professor") {
      const data = new FormData();
      data.set("themes", JSON.stringify(selectedOptions));
      data.set("aboutMe", aboutMeValue!);
      data.set("id", id);

      axios
        .patch(`/api/user/save-profile/${type}`, data)
        .then((res) => {
          setProfileData(res.data);
          setSteps((prev: number) => prev + 1);
        })
        .catch((error) => {
          console.error(error);

          toast.error(error.response.data);
        })
        .finally(() => setSubmitting(false));
    }
  }

  return (
    <div className="w-full h-full pb-12 pt-12 flex flex-col justify-center">
      <div className="w-full mx-auto px-6 flex flex-col justify-center gap-9 md:px-16 lg:flex-row lg:justify-between md:gap-24 lg:container">
        <div className="w-full px-6 py-9 rounded-2xl bg-green-primary h-fit lg:w-2/5">
          <p className="w-full text-white text-lg">
            {profilePhotoStepsInfo.boxMessage}
          </p>
        </div>

        <div className="w-full mx-auto md:max-w-[550px] lg:w-3/5 lg:mx-0">
          <h2 className="text-2xl text-gray-primary font-semibold mb-6 md:text-3xl">
            <span className="text-green-primary">
              {profilePhotoStepsInfo.titleColored}
            </span>{" "}
            {profilePhotoStepsInfo.title}
          </h2>

          <div className="w-full flex flex-col items-center justify-center gap-6 mb-8 md:mb-24 relative">
            <div
              {...getRootProps()}
              className="w-[200px] h-[200px] rounded-lg bg-[#C8D6DF] block cursor-pointer relative overflow-hidden shadow-md shadow-[rgba(0,0,0,0.25)]"
            >
              {profilePhotoUrl ? (
                <Image
                  src={profilePhotoUrl}
                  alt="Foto de perfil"
                  fill
                  className="object-cover object-center"
                />
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center gap-1">
                  {isUploading ? (
                    <MoonLoader color="#2C383F" />
                  ) : (
                    <>
                      <span className="bg-camera bg-contain bg-no-repeat w-10 h-10 block" />
                      <span className="text-center text-sm text-[#2C383F]">
                        {profilePhotoStepsInfo.inputPlaceholder}
                      </span>
                    </>
                  )}
                </div>
              )}
            </div>

            <input
              disabled={isUploading || isSubmitting}
              {...getInputProps()}
            />

            {profilePhotoUrl && profilePhoto && (
              <Button
                type="button"
                disabled={isUploading || isSubmitting}
                onClick={handleDeleteButton}
                className="flex items-center justify-center gap-2"
              >
                {profilePhotoStepsInfo.removeImageButton} <Trash2 size={20} />
              </Button>
            )}
          </div>

          {type === "professor" ? (
            <div className="flex flex-col gap-4">
              <div className="flex gap-x-4">
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={handleBackButton}
                  disabled={isSubmitting || isUploading}
                >
                  {profilePhotoStepsInfo.backButton}
                </Button>

                <Button
                  onClick={() => startUpload(profilePhoto!, { id })}
                  disabled={isSkipAvailable || isSubmitting || isUploading}
                  className="w-full flex items-center gap-2"
                >
                  {isSubmitting ||
                    (isUploading && <Loader2 className="animate-spin" />)}
                  {profilePhotoStepsInfo.nextButton}
                </Button>
              </div>

              <Button
                variant="outline"
                className="w-full"
                onClick={handleSkipButton}
                disabled={!isSkipAvailable || isSubmitting || isUploading}
              >
                {profilePhotoStepsInfo.skipButton}
              </Button>
            </div>
          ) : (
            <div className="w-full flex gap-6">
              <Button
                variant="outline"
                className="w-full"
                onClick={handleSkipButton}
                disabled={!isSkipAvailable || isSubmitting || isUploading}
              >
                {profilePhotoStepsInfo.skipButton}
              </Button>

              <Button
                className="w-full"
                onClick={() => startUpload(profilePhoto!, { id })}
                disabled={isSkipAvailable || isSubmitting || isUploading}
              >
                {profilePhotoStepsInfo.nextButton}
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfilePhotoStep;

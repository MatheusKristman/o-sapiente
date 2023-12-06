import { useState, useEffect, useRef } from "react";
import { toast } from "react-hot-toast";
import Image from "next/image";
import MoonLoader from "react-spinners/MoonLoader";
import { Trash2 } from "lucide-react";
import axios from "axios";

import Button from "@/components/Button";
import { profilePhotoStepsInfo } from "@/constants/profilePhotoSteps-br";
import { IProfileData } from "@/app/cadastro/professor/finalizacao/[id]/page";

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
    const [profilePhoto, setProfilePhoto] = useState<File | null>(null);
    const [isSendingImage, setSendingImage] = useState(false);
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

    useEffect(() => {
        console.log(isSkipAvailable);
        console.log(isSubmitting);
        console.log(isSendingImage);
    }, [isSkipAvailable, isSubmitting, isSendingImage]);

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
            setProfilePhotoUrl(URL.createObjectURL(file));
            setProfilePhoto(file);
            setSendingImage(false);
            return;
        }

        toast.error("Formato da imagem é inválido");

        setSendingImage(false);
    }

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
                .patch(`/api/register/${type}/save-profile`, data)
                .then((res) => {
                    console.log(res.data);

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
            data.set("resume", aboutMeValue!);
            data.set("id", id);

            axios
                .patch(`/api/register/${type}/save-profile`, data)
                .then((res) => {
                    console.log(res.data);

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
            data.set("profilePhoto", profilePhoto);
            data.set("id", id);

            axios
                .patch(`/api/register/${type}/save-profile`, data)
                .then((res) => {
                    console.log(res.data);

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
            data.set("resume", aboutMeValue!);
            data.set("profilePhoto", profilePhoto);
            data.set("id", id);

            axios
                .patch(`/api/register/${type}/save-profile`, data)
                .then((res) => {
                    console.log(res.data);

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
                    <p className="w-full text-white text-lg">{profilePhotoStepsInfo.boxMessage}</p>
                </div>

                <div className="w-full mx-auto md:max-w-[550px] lg:w-3/5 lg:mx-0">
                    <h2 className="text-2xl text-gray-primary font-semibold mb-6 md:text-3xl">
                        <span className="text-green-primary">{profilePhotoStepsInfo.titleColored}</span>{" "}
                        {profilePhotoStepsInfo.title}
                    </h2>

                    <div className="w-full flex flex-col items-center justify-center gap-6 mb-8 md:mb-24 relative">
                        <label
                            htmlFor="profilePhoto"
                            className="w-[200px] h-[200px] rounded-lg bg-[#C8D6DF] block cursor-pointer relative overflow-hidden shadow-md shadow-[rgba(0,0,0,0.25)]">
                            {profilePhotoUrl ? (
                                <Image
                                    src={profilePhotoUrl}
                                    alt="Foto de perfil"
                                    fill
                                    className="object-cover object-center"
                                />
                            ) : (
                                <div className="w-full h-full flex flex-col items-center justify-center gap-1">
                                    {isSendingImage ? (
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
                        </label>

                        <input
                            ref={fileInput}
                            type="file"
                            id="profilePhoto"
                            name="profilePhoto"
                            className="hidden"
                            disabled={isSendingImage}
                            onChange={(event) => handleImage(event)}
                        />

                        {profilePhotoUrl && profilePhoto && (
                            <button
                                type="button"
                                onClick={handleDeleteButton}
                                className="bg-green-primary border-green-primary text-white hover:brightness-90 transition py-1.5 px-8 text-base rounded-lg border-2 font-medium flex items-center justify-center gap-2 disabled:brightness-75 disabled:hover:brightness-75">
                                {profilePhotoStepsInfo.removeImageButton} <Trash2 size={20} />
                            </button>
                        )}
                    </div>

                    {type === "professor" ? (
                        <div className="flex flex-col gap-4">
                            <div className="flex gap-x-4">
                                <Button
                                    label={profilePhotoStepsInfo.backButton}
                                    onClick={handleBackButton}
                                    fullWidth
                                    secondary
                                    disabled={isSubmitting}
                                />

                                <Button
                                    label={profilePhotoStepsInfo.nextButton}
                                    onClick={handleNextButton}
                                    fullWidth
                                    primary
                                    disabled={isSkipAvailable || isSubmitting}
                                />
                            </div>

                            <Button
                                label={profilePhotoStepsInfo.skipButton}
                                onClick={handleSkipButton}
                                fullWidth
                                secondary
                                disabled={!isSkipAvailable || isSubmitting}
                            />
                        </div>
                    ) : (
                        <div className="w-full flex gap-6">
                            <Button
                                label={profilePhotoStepsInfo.skipButton}
                                onClick={handleSkipButton}
                                fullWidth
                                secondary
                                disabled={!isSkipAvailable || isSubmitting}
                            />

                            <Button
                                label={profilePhotoStepsInfo.nextButton}
                                onClick={handleNextButton}
                                fullWidth
                                primary
                                disabled={isSkipAvailable || isSubmitting}
                            />
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ProfilePhotoStep;

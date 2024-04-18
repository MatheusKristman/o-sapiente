"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { Request } from "@prisma/client";

import { Button } from "@/components/ui/button";
import ResumeProfilePhoto from "@/components/dashboard/resume/ResumeProfilePhoto";
import ResumeRequestBox from "@/components/dashboard/resume/ResumeRequestBox";
import ResumeCurrentLessonBox from "@/components/dashboard/resume/ResumeCurrentLessonBox";
import useNewRequestStore from "@/stores/useNewRequestStore";
import { studentResumeInfos } from "@/constants/dashboard/resume-br";
import NewRequestModal from "@/components/dashboard/resume/NewRequestModal";
import OffersModal from "@/components/dashboard/resume/OffersModal";
import { RequestFinishModal } from "@/components/dashboard/resume/RequestFinishModal";
import { RequestConfirmFinishModal } from "@/components/dashboard/resume/RequestConfirmFinishModal";
import { RequestWithUsersAndOffers } from "@/types";

const DashboardPage = () => {
    const [profilePhoto, setProfilePhoto] = useState<string>("");
    const [name, setName] = useState<string>("");
    const [request, setRequest] = useState<RequestWithUsersAndOffers[]>([]);
    const [currentLesson, setCurrentLesson] = useState<
        RequestWithUsersAndOffers[]
    >([]);

    const session = useSession();

    const { openModal } = useNewRequestStore();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const userResponse = await axios.get("/api/user/get-user");
                if (userResponse.data.profilePhoto) {
                    setProfilePhoto(userResponse.data.profilePhoto);
                }
                setName(
                    `${userResponse.data.firstName} ${userResponse.data.lastName}`,
                );

                const requestResponse = await axios.get(
                    "/api/request/get-requests",
                );

                setRequest(
                    requestResponse.data.filter(
                        (request: Request) => !request.isConcluded,
                    ),
                );
                setCurrentLesson(
                    requestResponse.data.filter(
                        (request: Request) =>
                            request.isOfferAccepted && !request.isConcluded,
                    ),
                );
            } catch (error) {
                console.error(error);
            }
        };

        fetchData();
    }, [session?.data?.user?.email]);

    return (
        <div className="flex-1 w-full px-6 pt-9 mx-auto flex flex-col gap-9 md:flex-row md:px-16 lg:container lg:mb-12">
            <div className="w-full flex flex-col-reverse gap-9 md:flex-col lg:w-4/12 xl:w-6/12">
                <ResumeProfilePhoto
                    type="Student"
                    profilePhoto={profilePhoto}
                    name={name}
                />

                <div className="w-full shadow-md shadow-[rgba(0,0,0,0.25)] rounded-lg">
                    <Button className="w-full" onClick={openModal}>
                        {studentResumeInfos.newRequestBtn}
                    </Button>
                </div>
            </div>

            <div className="w-full flex flex-col gap-8">
                <ResumeRequestBox type="Student" request={request} />

                <ResumeCurrentLessonBox currentLesson={currentLesson} />
            </div>

            <NewRequestModal />
            <OffersModal />
            <RequestFinishModal
                type="STUDENT"
                setCurrentLesson={setCurrentLesson}
                setRequest={setRequest}
            />
            <RequestConfirmFinishModal
                setCurrentLesson={setCurrentLesson}
                setRequest={setRequest}
            />
        </div>
    );
};

export default DashboardPage;

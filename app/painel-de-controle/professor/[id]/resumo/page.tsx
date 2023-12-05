"use client";

import axios from "axios";
import { useEffect, useState } from "react";

import ResumeProfilePhoto from "@/components/dashboard/resume/ResumeProfilePhoto";
import ResumeRequestBox from "@/components/dashboard/resume/ResumeRequestBox";
import Button from "@/components/Button";
import ResumeCurrentLessonBox from "@/components/dashboard/resume/ResumeCurrentLessonBox";
import BalanceBox from "@/components/dashboard/resume/BalanceBox";

import { useSession } from "next-auth/react";

interface RequestData {
  id: string;
  theme: string;
  message: string;
  createdAt: string;
  updatedAt: string;
  studentId: string;
  firstName: string;
  lastName: string;
  profilePhoto: string;
}

const ResumePage = () => {
  const [profilePhoto, setProfilePhoto] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [themes, setThemes] = useState<string[]>([]);
  const [request, setRequest] = useState<RequestData[]>([]);

  const session = useSession();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userResponse = await axios.get("/api/user/get-user");
        if (userResponse.data.profilePhoto) {
          setProfilePhoto(userResponse.data.profilePhoto);
        }
        setName(`${userResponse.data.firstName} ${userResponse.data.lastName}`);
        setThemes(userResponse.data.themes);

        const requestResponse = await axios.post("/api/request/get-requests", {
          email: session?.data?.user?.email,
        });
        setRequest(requestResponse.data);
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
          type="Professor"
          profilePhoto={profilePhoto}
          name={name}
          themes={themes}
        />

        <BalanceBox />
      </div>

      <div className="w-full flex flex-col gap-8">
        <ResumeRequestBox type="Professor" request={request} />

        <ResumeCurrentLessonBox />
      </div>
    </div>
  );
};

export default ResumePage;
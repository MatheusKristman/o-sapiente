"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import axios from "axios";

import Button from "@/components/Button";
import NewRequestModal from "@/components/dashboard/resume/NewRequestModal";
import ResumeRequestBox from "@/components/dashboard/resume/ResumeRequestBox";
import ResumeProfilePhoto from "@/components/dashboard/resume/ResumeProfilePhoto";
import ResumeCurrentLessonBox from "@/components/dashboard/resume/ResumeCurrentLessonBox";
import useNewRequestStore from "@/stores/useNewRequestStore";

// criar funções no modal

const DashboardPage = () => {
  const [profilePhoto, setProfilePhoto] = useState<string>("");
  const [name, setName] = useState<string>("");

  const { openModal } = useNewRequestStore();

  const session = useSession();

  useEffect(() => {
    if (session) {
      axios
        .get("/api/user/get-user")
        .then((res) => {
          if (res.data.profilePhoto) {
            setProfilePhoto(res.data.profilePhoto);
          }

          setName(res.data.firstName + " " + res.data.lastName);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [session]);

  return (
    <>
      <div className="flex-1 w-full px-6 pt-9 mx-auto flex flex-col gap-9 md:flex-row md:px-16 lg:container lg:mb-12">
        <div className="w-full flex flex-col-reverse gap-9 md:flex-col lg:w-4/12 xl:w-6/12">
          <ResumeProfilePhoto type="Student" profilePhoto={profilePhoto} name={name} />

          <div className="shadow-md shadow-[rgba(0,0,0,0.25)] rounded-lg">
            <Button label="NOVA SOLICITAÇÃO" primary fullWidth onClick={openModal} />
          </div>
        </div>

        <div className="w-full flex flex-col gap-8">
          <ResumeRequestBox type="Student" />

          <ResumeCurrentLessonBox />
        </div>
      </div>

      <NewRequestModal />
    </>
  );
};

export default DashboardPage;

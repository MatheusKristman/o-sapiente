"use client";

import { useEffect } from "react";
import axios from "axios";

import StudentFormBox from "@/components/dashboard/my-account/StudentFormBox";
import ProfilePhotoBox from "@/components/dashboard/my-account/ProfilePhotoBox";
import ChangePasswordBox from "@/components/dashboard/my-account/ChangePasswordBox";
import useUserStore from "@/stores/useUserStore";

const DashboardPage = () => {
  const { setProfilePhoto } = useUserStore();

  useEffect(() => {
    axios
      .get("/api/user/get-user")
      .then((res) => {
        setProfilePhoto(res.data.profilePhoto);
      })
      .catch((error) => console.error(error));
  }, [setProfilePhoto]);

  return (
    <div className="flex-1 w-full px-6 py-12 mx-auto flex flex-col gap-9 md:flex-row md:px-16 lg:container lg:pb-24">
      <div className="w-full flex flex-col items-center gap-9 lg:flex-row lg:items-start lg:justify-center">
        <div className="w-full sm:max-w-sm flex flex-col items-center gap-y-9">
          <ProfilePhotoBox />

          <ChangePasswordBox />
        </div>

        <StudentFormBox />
      </div>
    </div>
  );
};

export default DashboardPage;

"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import axios from "axios";

import StudentFormBox from "@/components/dashboard/my-account/StudentFormBox";
import ProfilePhotoBox from "@/components/dashboard/my-account/ProfilePhotoBox";
import ChangePasswordBox from "@/components/dashboard/my-account/ChangePasswordBox";

const DashboardPage = () => {
  const [profilePhotoUrl, setProfilePhotoUrl] = useState<string>("");
  const session = useSession();

  useEffect(() => {
    axios
      .get("/api/user/get-user")
      .then((res) => {
        setProfilePhotoUrl(res.data.profilePhoto);
        console.log(res.data);
      })
      .catch((error) => console.error(error));
  }, []);

  return (
    <div className="flex-1 w-full px-6 py-12 mx-auto flex flex-col gap-9 md:flex-row md:px-16 lg:container lg:pb-24">
      <div className="w-full flex flex-col items-center gap-9 lg:flex-row lg:items-start lg:justify-center">
        <div className="w-full sm:max-w-sm flex flex-col items-center gap-y-9">
          <ProfilePhotoBox
            profilePhotoUrl={profilePhotoUrl}
            setProfilePhotoUrl={setProfilePhotoUrl}
            email={session.data?.user?.email}
          />

          <ChangePasswordBox />
        </div>

        <StudentFormBox />
      </div>
    </div>
  );
};

export default DashboardPage;

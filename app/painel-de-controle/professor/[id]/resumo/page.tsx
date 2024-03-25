"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";

import ResumeProfilePhoto from "@/components/dashboard/resume/ResumeProfilePhoto";
import ResumeRequestBox from "@/components/dashboard/resume/ResumeRequestBox";
import ResumeCurrentLessonBox from "@/components/dashboard/resume/ResumeCurrentLessonBox";
import BalanceBox from "@/components/dashboard/resume/BalanceBox";
import RequestDetailModal from "@/components/dashboard/resume/RequestDetailModal";

import { RequestWithUsersAndOffers } from "@/types";
import { Offer } from "@prisma/client";

const ResumePage = () => {
  const [profilePhoto, setProfilePhoto] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [themes, setThemes] = useState<string[]>([]);
  const [request, setRequest] = useState<RequestWithUsersAndOffers[]>([]);
  const [plan, setPlan] = useState<string>("");
  const [offers, setOffers] = useState<Offer[]>([]);

  const session = useSession();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userResponse = await axios.get("/api/user/get-user");

        if (userResponse.data.profilePhoto) {
          setProfilePhoto(userResponse.data.profilePhoto);
        }

        if (userResponse.data.plan) {
          setPlan(userResponse.data.plan.planName);
        }

        setOffers(userResponse.data.offers);
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
    <>
      <div className="flex-1 w-full px-6 pt-9 mx-auto flex flex-col gap-9 md:flex-row md:px-16 lg:container lg:mb-12">
        <div className="w-full flex flex-col-reverse gap-9 md:flex-col lg:w-4/12 xl:w-6/12">
          <ResumeProfilePhoto
            type="Professor"
            profilePhoto={profilePhoto}
            name={name}
            themes={themes}
            plan={plan}
          />

          <BalanceBox />
        </div>

        <div className="w-full flex flex-col gap-8">
          <ResumeRequestBox
            offers={offers}
            type="Professor"
            request={request}
          />

          <ResumeCurrentLessonBox />
        </div>
      </div>

      <RequestDetailModal setOffers={setOffers} type="Professor" plan={plan} />
    </>
  );
};

export default ResumePage;

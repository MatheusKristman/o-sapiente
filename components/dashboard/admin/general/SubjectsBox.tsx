"use client";

import { Loader2, Plus, Search } from "lucide-react";
import { ChangeEvent, useEffect, useState } from "react";
import axios from "axios";
import { useSession } from "next-auth/react";

import { Input } from "@/components/ui/input";
import { AdminGeneralText } from "@/constants/dashboard/admin-general-br";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import useAdminSubjectsModalStore from "@/stores/useAdminSubjectsModalStore";
import useAdminStore from "@/stores/useAdminStore";
import useUserStore from "@/stores/useUserStore";
import useAdminSubjectsEditModalStore from "@/stores/useAdminSubjectsEditModalStore";
import { Subject } from "@prisma/client";
import useAdminSubjectsDeleteModalStore from "@/stores/useAdminSubjectsDeleteModalStore";

export function SubjectsBox() {
  const [subjectFilter, setSubjectFilter] = useState<string>("");
  const [subjectsLoading, setSubjectsLoading] = useState<boolean>(false);

  const { openModal } = useAdminSubjectsModalStore();
  const { setSubjectSelected, openModal: openEditModal } =
    useAdminSubjectsEditModalStore();
  const { setSubjectId, openModal: openDeleteModal } =
    useAdminSubjectsDeleteModalStore();
  const { setSubjects, subjects } = useAdminStore();
  const { userId } = useUserStore();
  const session = useSession();

  useEffect(() => {
    if (userId && session.status === "authenticated") {
      setSubjectsLoading(true);

      axios
        .get(`/api/adm/subject/get/${userId}`)
        .then((res) => {
          setSubjects(res.data);
          console.log(res.data);
        })
        .catch((error) => {
          console.error(error);
        })
        .finally(() => {
          setSubjectsLoading(false);
        });
    }
  }, [session, userId]);

  function handleEdit(subject: Subject) {
    setSubjectSelected(subject);
    openEditModal();
  }

  function handleDelete(id: string) {
    setSubjectId(id);
    openDeleteModal();
  }

  return (
    <div className="w-full rounded-lg bg-white p-9 shadow-md shadow-[rgba(0,0,0,0.25)]">
      <div className="w-full flex flex-col sm:flex-row sm:justify-between lg:flex-col lg:justify-start xl:flex-row xl:justify-between gap-2 mb-4">
        <h2 className="text-gray-primary text-xl font-semibold lg:whitespace-nowrap whitespace-normal">
          {AdminGeneralText.subjectsBoxTitle}
        </h2>

        <div className="w-full sm:max-w-md lg:max-w-none xl:max-w-md flex items-center gap-4 pb-1">
          <div className="basis-full flex items-center justify-between input-admin-users-search focus-within:ring-2 focus-within:ring-[#9DA5AA] peer">
            <Input
              type="text"
              name="filter"
              value={subjectFilter}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setSubjectFilter(e.target.value)
              }
              placeholder={AdminGeneralText.requestsPlaceholder}
              className="bg-transparent outline-none w-full"
            />

            <Search
              className="h-6 w-6 min-h-[24px] min-w-[24px]"
              style={{
                color: "#9DA5AA",
              }}
            />
          </div>

          <Button onClick={openModal}>
            <Plus />
          </Button>
        </div>
      </div>

      {subjectsLoading ? (
        <div className="w-full flex items-center justify-center">
          <Loader2 size={50} color="#03C988" className="animate-spin" />
        </div>
      ) : subjects && subjects.length > 0 ? (
        subjectFilter.length > 3 ? (
          <Accordion type="single" collapsible>
            {subjects
              .filter((subject) =>
                subject.main
                  .toLowerCase()
                  .normalize("NFD")
                  .replace(/[\u0300-\u036f]/g, "")
                  .includes(
                    subjectFilter
                      .toLowerCase()
                      .normalize("NFD")
                      .replace(/[\u0300-\u036f]/g, ""),
                  ),
              )
              .map((subject) => (
                <AccordionItem key={subject.id} value={subject.id}>
                  <AccordionTrigger className="text-gray-primary text-lg text-left">
                    {subject.main}
                  </AccordionTrigger>

                  <AccordionContent>
                    <div className="w-full flex flex-col gap-6">
                      <div className="w-full flex flex-col gap-2">
                        <span className="text-base text-gray-primary font-medium text-left">
                          {AdminGeneralText.subjectsThemesLabel}
                        </span>

                        <div className="w-full flex flex-wrap gap-x-2 gap-y-3">
                          {subject.subs.map((sub) => (
                            <span
                              key={sub}
                              className="bg-transparent border-2 border-green-primary rounded-md text-green-primary px-4 py-2 text-sm font-medium"
                            >
                              {sub}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className="w-full flex flex-col sm:flex-row gap-2">
                        <Button
                          onClick={() => handleEdit(subject)}
                          className="w-full"
                        >
                          {AdminGeneralText.subjectsEditBtn}
                        </Button>

                        <Button
                          onClick={() => handleDelete(subject.id)}
                          variant="destructive"
                          className="w-full"
                        >
                          {AdminGeneralText.subjectsDeleteBtn}
                        </Button>
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              ))}
          </Accordion>
        ) : (
          <Accordion type="single" collapsible>
            {subjects.map((subject) => (
              <AccordionItem key={subject.id} value={subject.id}>
                <AccordionTrigger className="text-gray-primary text-lg text-left">
                  {subject.main}
                </AccordionTrigger>

                <AccordionContent>
                  <div className="w-full flex flex-col gap-6">
                    <div className="w-full flex flex-col gap-2">
                      <span className="text-base text-gray-primary font-medium text-left">
                        {AdminGeneralText.subjectsThemesLabel}
                      </span>

                      <div className="w-full flex flex-wrap gap-x-2 gap-y-3">
                        {subject.subs.map((sub) => (
                          <span
                            key={sub}
                            className="bg-transparent border-2 border-green-primary rounded-md text-green-primary px-4 py-2 text-sm font-medium"
                          >
                            {sub}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="w-full flex flex-col sm:flex-row gap-2">
                      <Button
                        onClick={() => handleEdit(subject)}
                        className="w-full"
                      >
                        {AdminGeneralText.subjectsEditBtn}
                      </Button>

                      <Button
                        onClick={() => handleDelete(subject.id)}
                        variant="destructive"
                        className="w-full"
                      >
                        {AdminGeneralText.subjectsDeleteBtn}
                      </Button>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        )
      ) : (
        <div className="mt-6 flex items-center justify-center">
          <span className="text-gray-primary/70 text-center font-medium text-base">
            {AdminGeneralText.subjectsNotFound}
          </span>
        </div>
      )}
    </div>
  );
}

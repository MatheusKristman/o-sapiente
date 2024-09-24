"use client";

import axios from "axios";
import toast from "react-hot-toast";
import { Course } from "@prisma/client";
import { useSession } from "next-auth/react";
import { Loader2, Search, X } from "lucide-react";
import { ChangeEvent, useEffect, useState } from "react";

import { AdminGeneralText } from "@/constants/dashboard/admin-general-br";
import { Input } from "@/components/ui/input";
import { CourseItem } from "./CourseItem";
import { CourseModalForm } from "./CourseModalForm";
import { Button } from "@/components/ui/button";

import useUserStore from "@/stores/useUserStore";
import useAdminStore from "@/stores/useAdminStore";

const COURSE_TEST = [
  {
    id: "id1",
    courseName: "Curso teste 1",
    courseImage: "/assets/images/profile-test.png",
    price: 13999,
    benefits: [
      "Material Gravado",
      "Oficina de Questões",
      "Oficina de Peças",
      "Marcação de Vade Mecum",
      "Aulas Ao Vivo de Terça e Quinta (2h de duração)",
      "Correção Individualizada de Peças",
    ],
    themes: [
      "Constitucionalismo",
      "Fenômenos Constitucionais",
      "Organização do Estado",
      "Poder Constituinte",
      "Teoria da Constituição",
      "Direitos de Nacionalidade",
      "Recursos Constitucionais",
      "Ações de Controle Difuso e Concentrado",
    ],
  },
  {
    id: "id2",
    courseName: "Curso teste 2",
    courseImage: "/assets/images/profile-test.png",
    price: 15999,
    benefits: [
      "Material Gravado",
      "Oficina de Questões",
      "Oficina de Peças",
      "Marcação de Vade Mecum",
      "Aulas Ao Vivo de Terça e Quinta (2h de duração)",
      "Correção Individualizada de Peças",
    ],
    themes: [
      "Constitucionalismo",
      "Fenômenos Constitucionais",
      "Organização do Estado",
      "Poder Constituinte",
      "Teoria da Constituição",
      "Direitos de Nacionalidade",
      "Recursos Constitucionais",
      "Ações de Controle Difuso e Concentrado",
    ],
  },
  {
    id: "id3",
    courseName: "Curso teste 3",
    courseImage: "/assets/images/profile-test.png",
    price: 17999,
    benefits: [
      "Material Gravado",
      "Oficina de Questões",
      "Oficina de Peças",
      "Marcação de Vade Mecum",
      "Aulas Ao Vivo de Terça e Quinta (2h de duração)",
      "Correção Individualizada de Peças",
    ],
    themes: [
      "Constitucionalismo",
      "Fenômenos Constitucionais",
      "Organização do Estado",
      "Poder Constituinte",
      "Teoria da Constituição",
      "Direitos de Nacionalidade",
      "Recursos Constitucionais",
      "Ações de Controle Difuso e Concentrado",
    ],
  },
  {
    id: "id4",
    courseName: "Curso teste 4",
    courseImage: "/assets/images/profile-test.png",
    price: 19999,
    benefits: [
      "Material Gravado",
      "Oficina de Questões",
      "Oficina de Peças",
      "Marcação de Vade Mecum",
      "Aulas Ao Vivo de Terça e Quinta (2h de duração)",
      "Correção Individualizada de Peças",
    ],
    themes: [
      "Constitucionalismo",
      "Fenômenos Constitucionais",
      "Organização do Estado",
      "Poder Constituinte",
      "Teoria da Constituição",
      "Direitos de Nacionalidade",
      "Recursos Constitucionais",
      "Ações de Controle Difuso e Concentrado",
    ],
  },
];

export function CoursesBox() {
  const [filterValue, setFilterValue] = useState<string>("");
  const [coursesLoading, setCoursesLoading] = useState<boolean>(false);
  const [coursesFiltered, setCoursesFiltered] = useState<Course[]>([]);

  const { userId } = useUserStore();
  const { courses, setCourses } = useAdminStore();
  const session = useSession();

  useEffect(() => {
    if (userId && session.status === "authenticated") {
      setCoursesLoading(true);

      axios
        .get("/api/courses/get")
        .then((res) => {
          setCourses(res.data);
        })
        .catch((error) => {
          console.error(error);

          toast.error(error.response.data);
        })
        .finally(() => {
          setCoursesLoading(false);
        });
    }
  }, [userId, session]);

  useEffect(() => {
    if (filterValue.length > 3 && courses) {
      const filter = courses.filter((course) =>
        course.courseName
          .toLowerCase()
          .normalize("NFD")
          .replace(/[\u0300-\u036f]/g, "")
          .includes(
            filterValue
              .toLowerCase()
              .normalize("NFD")
              .replace(/[\u0300-\u036f]/g, ""),
          ),
      );

      setCoursesFiltered(filter);

      console.log("filtro ativado");
    } else {
      setCoursesFiltered([]);
      console.log("filtro desativado");
    }
  }, [filterValue, courses]);

  function clearSearch() {
    setFilterValue("");
  }

  return (
    <div className="w-full h-full rounded-lg bg-green-primary p-9 shadow-md shadow-[rgba(0,0,0,0.25)]">
      <div className="w-full flex flex-col sm:flex-row sm:justify-between sm:items-center lg:flex-col lg:justify-start lg:items-start gap-2">
        <h2 className="text-white text-xl font-semibold lg:whitespace-nowrap whitespace-normal">
          {AdminGeneralText.coursesBoxTitle}
        </h2>

        <div className="w-full sm:max-w-md flex items-center gap-4 pb-1">
          <div className="basis-full flex items-center justify-between input-admin-requests-search focus-within:ring-2 focus-within:ring-[#00FFAB] peer">
            <Input
              type="text"
              name="filter"
              value={filterValue}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setFilterValue(e.target.value)
              }
              placeholder={AdminGeneralText.placeholder}
              className="bg-transparent placeholder:text-green-primary outline-none w-full"
            />

            {filterValue.length > 0 ? (
              <Button size="icon" variant="link" onClick={clearSearch} asChild>
                <X
                  className="h-6 w-6 min-h-[24px] min-w-[24px]"
                  style={{
                    color: "#03C988",
                  }}
                />
              </Button>
            ) : (
              <Search
                className="h-6 w-6 min-h-[24px] min-w-[24px]"
                style={{
                  color: "#03C988",
                }}
              />
            )}
          </div>

          <CourseModalForm />
        </div>
      </div>

      {coursesLoading ? (
        <div className="w-full mt-4 flex items-center justify-center">
          <Loader2 size={50} color="#FFF" className="animate-spin" />
        </div>
      ) : (
        <div className="relative w-full max-h-[640px] lg:max-h-[450px] overflow-auto scrollbar-thumb-rounded-full scrollbar-track-rounded-full scrollbar-thin scrollbar-thumb-gray-primary/40 scrollbar-track-gray-primary/20">
          {filterValue.length > 3 && coursesFiltered.length > 0 ? (
            <>
              <div className="sticky z-10 -top-px left-0 w-full h-6 bg-gradient-to-b from-green-primary to-transparent" />

              <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4">
                {coursesFiltered.map((course, index) => (
                  <CourseItem
                    key={course.id}
                    last={index === COURSE_TEST.length - 1}
                    course={course}
                  />
                ))}
              </div>

              <div className="sticky z-10 -bottom-px left-0 w-full h-6 bg-gradient-to-t from-green-primary to-transparent" />
            </>
          ) : filterValue.length > 3 && coursesFiltered.length === 0 ? (
            <span className="block mt-6 text-lg font-medium text-[#00744E] text-center">
              Nenhum curso encontrado
            </span>
          ) : courses && courses.length > 0 ? (
            <>
              <div className="sticky z-10 -top-px left-0 w-full h-6 bg-gradient-to-b from-green-primary to-transparent" />

              <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4">
                {courses.map((course, index) => (
                  <CourseItem
                    key={course.id}
                    last={index === COURSE_TEST.length - 1}
                    course={course}
                  />
                ))}
              </div>

              <div className="sticky z-10 -bottom-px left-0 w-full h-6 bg-gradient-to-t from-green-primary to-transparent" />
            </>
          ) : (
            <span className="block mt-6 text-lg font-medium text-[#00744E] text-center">
              Nenhum curso cadastrado no momento
            </span>
          )}
        </div>
      )}
    </div>
  );
}

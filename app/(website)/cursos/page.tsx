"use client";

import { AlertTriangle, Loader2, Search, X } from "lucide-react";
import { ChangeEvent, useEffect, useState } from "react";

import { Input } from "@/components/ui/input";
import { Course } from "@/components/courses/course";
import { Course as CourseType } from "@prisma/client";
import axios from "axios";
import { cn } from "@/libs/utils";
import { Button } from "@/components/ui/button";

function CoursesPage() {
  const [searchValue, setSearchValue] = useState<string>("");
  const [coursesLoading, setCoursesLoading] = useState<boolean>(false);
  const [courses, setCourses] = useState<CourseType[] | null>(null);
  const [coursesFiltered, setCoursesFiltered] = useState<CourseType[]>([]);

  useEffect(() => {
    setCoursesLoading(true);

    axios
      .get("/api/courses/get")
      .then((res) => {
        setCourses(res.data);
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => {
        setCoursesLoading(false);
      });
  }, [setCourses]);

  useEffect(() => {
    if (searchValue.length > 3 && courses) {
      const filter = courses.filter((course) =>
        course.courseName
          .toLowerCase()
          .normalize("NFD")
          .replace(/[\u0300-\u036f]/g, "")
          .includes(
            searchValue
              .toLowerCase()
              .normalize("NFD")
              .replace(/[\u0300-\u036f]/g, ""),
          ),
      );

      setCoursesFiltered(filter);

      console.log("Busca ativada");
    } else {
      setCoursesFiltered([]);

      console.log("Busca desativada");
    }
  }, [searchValue, courses]);

  function clearSearch() {
    setSearchValue("");
  }

  return (
    <div className="w-full min-h-[calc(100vh-301.14px)] px-6 sm:px-16 lg:container lg:mx-auto py-12 flex flex-col gap-y-12">
      <div className="w-full flex flex-col sm:flex-row sm:items-center sm:justify-between gap-y-4">
        <h1 className="text-2xl sm:text-3xl font-semibold text-gray-primary">
          Meus Cursos
        </h1>

        <div className="w-full flex items-center justify-between input-courses-search focus-within:ring-2 focus-within:ring-[#9DA5AA] peer sm:w-[300px]">
          <Input
            type="text"
            name="search"
            value={searchValue}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setSearchValue(e.target.value)
            }
            placeholder="Pesquise o curso que deseja"
            className="bg-transparent outline-none w-full"
          />

          {searchValue.length > 0 ? (
            <Button size="icon" variant="link" onClick={clearSearch} asChild>
              <X
                className="h-6 w-6 min-h-[24px] min-w-[24px]"
                style={{
                  color: "#9DA5AA",
                }}
              />
            </Button>
          ) : (
            <Search
              className="h-6 w-6 min-h-[24px] min-w-[24px]"
              style={{
                color: "#9DA5AA",
              }}
            />
          )}
        </div>
      </div>

      <div
        className={cn(
          "w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-4 gap-y-6",
          { "flex-1": coursesLoading || !courses || courses.length === 0 },
        )}
      >
        {coursesLoading ? (
          <div className="w-full col-span-1 sm:col-span-2 lg:col-span-3 flex flex-col items-center gap-2 my-auto">
            <Loader2
              className="w-16 h-16 sm:w-24 sm:h-24 animate-spin text-green-primary"
              strokeWidth={1}
            />

            <span className="text-lg sm:text-xl text-green-primary font-semibold text-center">
              Aguarde um momento...
            </span>
          </div>
        ) : searchValue.length > 3 && coursesFiltered.length > 0 ? (
          coursesFiltered.map((course) => (
            <Course
              key={course.id}
              courseId={course.id}
              courseName={course.courseName}
              courseImage={course.courseImage!}
              lessonsCount={course.lessonsCount}
              hoursCount={course.hoursCount}
              price={course.price / 100}
              contents={course.themes}
              benefits={course.benefits}
            />
          ))
        ) : searchValue.length > 3 && coursesFiltered.length === 0 ? (
          <div className="w-full col-span-1 sm:col-span-2 lg:col-span-3 flex flex-col items-center gap-2 my-auto">
            <AlertTriangle
              className="w-16 h-16 sm:w-24 sm:h-24 text-green-primary"
              strokeWidth={1}
            />

            <span className="text-lg sm:text-xl text-green-primary font-semibold text-center">
              Nenhum curso encontrado
            </span>
          </div>
        ) : courses && courses.length > 0 ? (
          courses.map((course) => (
            <Course
              key={course.id}
              courseId={course.id}
              courseName={course.courseName}
              courseImage={course.courseImage!}
              lessonsCount={course.lessonsCount}
              hoursCount={course.hoursCount}
              price={course.price / 100}
              contents={course.themes}
              benefits={course.benefits}
            />
          ))
        ) : (
          <div className="w-full col-span-1 sm:col-span-2 lg:col-span-3 flex flex-col items-center gap-2 my-auto">
            <AlertTriangle
              className="w-16 h-16 sm:w-24 sm:h-24 text-green-primary"
              strokeWidth={1}
            />

            <span className="text-lg sm:text-xl text-green-primary font-semibold text-center">
              Nenhum curso disponível no momento
            </span>
          </div>
        )}
      </div>
    </div>
  );
}

export default CoursesPage;

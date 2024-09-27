"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Course } from "@prisma/client";
import Link from "next/link";

import { courseAdInfo } from "@/constants/courseAd-br";
import { AdCard } from "./components/course-ad/AdCard";
import { titleAnimation } from "@/constants/framer-animations/course-ad";
import { Button } from "@/components/ui/button";
import { CoursesSlider } from "./components/course-ad/CoursesSlider";
import axios from "axios";
import useHomeStore from "@/stores/useHomeStore";

export function CourseAd() {
  const [courses, setCourses] = useState<Course[]>([]);

  const { setRecentsCourses } = useHomeStore();

  useEffect(() => {
    fetch("/api/courses/get-ad", { cache: "no-store" })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }

        throw new Error("Ocorreu um erro ao resgatar os cursos");
      })
      .then((res) => {
        setCourses(res);
      })
      .catch((error) => {
        console.error(error);
      });

    axios
      .get("/api/courses/get-recents")
      .then((res) => {
        setRecentsCourses(res.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [setCourses, setRecentsCourses]);

  return (
    <section id="cursos" className="w-full bg-[#E5ECF0] mt-12">
      <div className="w-full px-6 py-12 flex flex-col gap-12 sm:px-16 lg:container lg:mx-auto">
        <motion.h2
          initial="offscreen"
          whileInView="onscreen"
          viewport={{ once: true, amount: 0.1 }}
          variants={titleAnimation}
          className="text-2xl text-gray-primary font-semibold text-center sm:text-3xl lg:text-4xl"
        >
          {courseAdInfo.title}
        </motion.h2>

        <div className="flex flex-col gap-12 items-center sm:flex-row">
          {courses.map((course) => (
            <AdCard
              key={course.id}
              title={course.courseName}
              price={course.price}
              themes={course.themes}
              benefits={course.benefits}
              courseId={course.id}
              isRight={course.courseName === "Repescagem"}
            />
          ))}
        </div>

        <div className="w-full flex flex-col items-center">
          <h3 className="text-xl text-gray-primary font-semibold text-center mb-6 sm:text-2xl lg:text-3xl">
            {courseAdInfo.coursePageTitle}
          </h3>

          <div className="w-full mb-12">
            <CoursesSlider />
          </div>

          <div className="w-full flex flex-col items-center gap-6">
            <h4 className="text-lg text-gray-primary font-semibold text-center sm:text-xl lg:text-2xl">
              {courseAdInfo.coursePageSubtitle}
            </h4>

            <Button asChild>
              <Link href="/cursos">{courseAdInfo.coursePageButton}</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}

"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Course } from "@prisma/client";
import axios from "axios";

import { courseAdInfo } from "@/constants/courseAd-br";
import { AdCard } from "./components/course-ad/AdCard";
import { titleAnimation } from "@/constants/framer-animations/course-ad";

export function CourseAd() {
  const [courses, setCourses] = useState<Course[]>([]);

  useEffect(() => {
    axios
      .get("/api/courses/get-ad")
      .then((res) => {
        setCourses(res.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [setCourses]);

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
              courseLink={
                course.courseName === "Constitucional do Zero"
                  ? "Constitucional%20do%20Zero"
                  : "Repescagem"
              }
              courseId={course.id}
              isRight={course.courseName === "Repescagem"}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

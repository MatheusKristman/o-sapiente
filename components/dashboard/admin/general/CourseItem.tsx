import { Course } from "@prisma/client";
import Image from "next/image";
import { Check, Edit, MoveRight, Plus } from "lucide-react";

import { cn, formatPrice } from "@/libs/utils";
import { Button } from "@/components/ui/button";
import { CourseEditModalForm } from "./CourseEditModalForm";
import { Dialog, DialogContent, DialogHeader, DialogFooter, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

interface CourseItemProps {
  last: boolean;
  course: Course;
}

export function CourseItem({ last, course }: CourseItemProps) {
  return (
    <div className={cn("w-full bg-white p-4 rounded-lg flex flex-col items-center gap-6", last && "mb-0")}>
      <div className="w-full flex flex-col items-center gap-2">
        <div className="w-full aspect-video rounded-[9.5px] relative overflow-hidden">
          <Image src={course.courseImage!} alt="Image do Curso" fill className="object-cover object-center" />
        </div>

        <span className="text-gray-primary text-lg font-semibold text-center">{course.courseName}</span>
      </div>

      <Dialog>
        <DialogTrigger asChild>
          <Button className="w-full flex items-center gap-2">
            <Plus className="text-white" />
            <span className="text-white font-semibold text-base uppercase">Ver detalhes</span>
          </Button>
        </DialogTrigger>

        <DialogContent className="h-full sm:h-auto overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-left text-xl text-gray-primary font-semibold mb-6">
              {course.courseName}
            </DialogTitle>

            <div className="w-full flex flex-col gap-4">
              {course.themes.length > 0 && (
                <>
                  <h5 className="text-lg font-semibold text-gray-primary text-left">Conteúdo do Curso</h5>

                  <ul className="flex flex-col sm:grid sm:grid-cols-2 gap-2">
                    {course.themes.map((content, index) => (
                      <li key={`content-${index}`} className="flex gap-2">
                        <MoveRight color="#03C988" className="shrink-0 w-6 h-6" />

                        <span className="text-sm font-medium text-gray-primary text-left mt-[2px]">{content}</span>
                      </li>
                    ))}
                  </ul>
                </>
              )}

              {course.benefits.length > 0 && (
                <div className="w-full sm:w-fit border-2 border-green-primary rounded-xl p-5 flex flex-col items-center sm:mx-auto">
                  <p className="text-lg font-semibold text-green-primary text-center">Mais Vantagens</p>

                  <ul className="flex flex-col gap-2">
                    {course.benefits.map((benefit, index) => (
                      <li key={`benefit-${index}`} className="flex items-center gap-2">
                        <Check color="#03C988" className="shrink-0 w-6 h-6" />

                        <span className="text-sm font-medium text-gray-primary/70 text-left">{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </DialogHeader>

          <DialogFooter className="flex flex-row items-end justify-between sm:justify-between">
            <span className="text-2xl text-green-primary font-semibold !leading-tight">
              {formatPrice(course.price / 100)}
            </span>

            <CourseEditModalForm courseSelected={course} />
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

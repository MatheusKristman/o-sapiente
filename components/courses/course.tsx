import Image from "next/image";
import { Check, ChevronDown, Dot, MoveRight } from "lucide-react";

import { formatPrice } from "@/libs/utils";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface CourseProps {
  courseName: string;
  courseImage: string;
  lessonsCount: number;
  hoursCount: number;
  price: number;
  contents: string[];
  benefits?: string[];
}

export function Course({
  courseName,
  courseImage,
  lessonsCount,
  hoursCount,
  price,
  contents,
  benefits,
}: CourseProps) {
  return (
    <div className="w-full rounded-2xl bg-white shadow-lg px-8 py-9 flex flex-col gap-4">
      <div className="w-full aspect-video rounded-[9.5px] overflow-hidden relative group">
        <Image
          src={courseImage}
          alt="Imagem do Curso"
          fill
          className="object-cover"
        />

        <div className="absolute bottom-4 right-4 flex items-center gap-2">
          <span className="bg-white rounded-full px-4 py-1 text-green-primary font-semibold text-base">
            {formatPrice(price)}
          </span>
        </div>
      </div>

      <div className="w-full flex flex-col md:flex-row md:items-end md:justify-between gap-2">
        <div className="flex flex-col gap-1">
          <h4 className="text-xl font-semibold text-gray-primary">
            {courseName}
          </h4>

          <div className="flex items-center text-gray-primary/50">
            <span className="text-base font-medium">{`${lessonsCount} ${lessonsCount > 1 ? "aulas" : "aula"}`}</span>

            <Dot />

            <span className="text-base font-medium">{`${hoursCount} ${hoursCount > 1 ? "horas" : "hora"}`}</span>
          </div>
        </div>

        <Dialog>
          <DialogTrigger className="w-full h-fit md:w-fit bg-[#F0F5F8] px-2 py-1 rounded-full text-gray-primary/70 self-center md:self-auto text-sm font-medium md:transition-all md:hover:bg-green-primary md:hover:text-white">
            ver mais
          </DialogTrigger>

          <DialogContent className="h-full sm:h-auto overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="text-left text-xl text-gray-primary font-semibold mb-6">
                {courseName}
              </DialogTitle>

              <div className="w-full flex flex-col gap-4">
                <h5 className="text-lg font-semibold text-gray-primary text-left">
                  Conteúdo do Curso
                </h5>

                <ul className="flex flex-col sm:grid sm:grid-cols-2 gap-2">
                  {contents.map((content, index) => (
                    <li key={`content-${index}`} className="flex gap-2">
                      <MoveRight color="#03C988" className="shrink-0 w-6 h-6" />

                      <span className="text-sm font-medium text-gray-primary text-left mt-[2px]">
                        {content}
                      </span>
                    </li>
                  ))}
                </ul>

                {benefits && (
                  <div className="w-full sm:w-fit border-2 border-green-primary rounded-xl p-5 flex flex-col items-center sm:mx-auto">
                    <p className="text-lg font-semibold text-green-primary text-center">
                      Mais Vantagens
                    </p>

                    <ul className="flex flex-col gap-2">
                      {benefits.map((benefit, index) => (
                        <li
                          key={`benefit-${index}`}
                          className="flex items-center gap-2"
                        >
                          <Check color="#03C988" className="shrink-0 w-6 h-6" />

                          <span className="text-sm font-medium text-gray-primary/70 text-left">
                            {benefit}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </DialogHeader>

            <DialogFooter className="flex flex-row items-end justify-between sm:justify-between">
              <div className="w-fit flex flex-col">
                <span className="text-2xl text-green-primary font-semibold">
                  {formatPrice(price)}
                </span>

                <p className="text-sm font-medium text-gray-primary/60 !leading-tight">
                  Com opções de parcelamento
                </p>
              </div>

              <Button>Comprar</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}

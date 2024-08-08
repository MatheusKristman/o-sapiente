"use client";

import { motion } from "framer-motion";

import { courseAdInfo } from "@/constants/courseAd-br";
import { AdCard } from "./components/course-ad/AdCard";
import { titleAnimation } from "@/constants/framer-animations/course-ad";

export function CourseAd() {
  return (
    <section className="w-full bg-[#E5ECF0] mt-12">
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
          <AdCard
            title="Constitucional Do Zero"
            price="499,99"
            themes={[
              "Constitucionalismo",
              "Fenômenos Constitucionais",
              "Organização do Estado",
              "Poder Constituinte",
              "Teoria da Constituição",
              "Direitos Fundamentais",
              "Direito de Nacionalidade",
              "Recursos Constitucionais",
              "Ações de Controle Difuso e Concentrado",
            ]}
            benefits={[
              "Material Gravado",
              "Oficina de Questões",
              "Oficina de Peças",
              "Marcação de Vade Mecum",
              "Aulas Ao Vivo de Terça a Quinta (2h de duração)",
              "Correção Individualizada de Peças",
            ]}
          />

          <AdCard
            title="Repescagem"
            price="199,99"
            benefits={[
              "Oficina de Questões",
              "Oficina de Peças",
              "Marcação de Vade Mecum",
              "Aulas Ao Vivo de Terça a Quinta (2h de duração)",
              "Correção Individualizada de Peças",
            ]}
            isRight
          />
        </div>
      </div>
    </section>
  );
}

"use client";

import { Search } from "lucide-react";
import { ChangeEvent, useState } from "react";

import { Input } from "@/components/ui/input";
import { Course } from "@/components/courses/course";

const contentTest = [
  "Constitucionalismo",
  "Organização do Estado",
  "Teoria da Constituição",
  "Direito de Nacionalidade",
  "Ações de Controle Difuso e Concentrado",
  "Fenômenos Constitucionais",
  "Poder Constituinte",
  "Direitos Fundamentais",
  "Recursos Constitucionais",
];

const benefitTest = [
  "Material Gravado",
  "Oficina de Peças",
  "Aulas Ao Vivo de Terça a Quinta (2h de duração)",
  "Oficina de Questões",
  "Marcação de Vade Mecum",
  "Correção Individualizada de Peças",
];

function CoursesPage() {
  const [searchValue, setSearchValue] = useState<string>("");

  return (
    <div className="w-full min-h-[calc(100vh-301.14px)] px-6 sm:px-16 lg:container lg:mx-auto py-12 flex flex-col gap-y-12">
      <div className="w-full flex flex-col sm:flex-row sm:items-center sm:justify-between gap-y-4">
        <h1 className="text-2xl sm:text-3xl font-semibold text-gray-primary">Meus Cursos</h1>

        <div className="w-full flex items-center justify-between input-courses-search focus-within:ring-2 focus-within:ring-[#9DA5AA] peer sm:w-[300px]">
          <Input
            type="text"
            name="search"
            value={searchValue}
            onChange={(e: ChangeEvent<HTMLInputElement>) => setSearchValue(e.target.value)}
            placeholder="Pesquise o curso que deseja"
            className="bg-transparent outline-none w-full"
          />

          <Search
            className="h-6 w-6 min-h-[24px] min-w-[24px]"
            style={{
              color: "#9DA5AA",
            }}
          />
        </div>
      </div>

      <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-4 gap-y-6">
        <Course
          courseName="Teste"
          courseImage="/assets/images/profile-test.png"
          lessonsCount={30}
          hoursCount={40}
          price={29999 / 100}
          contents={contentTest}
          benefits={benefitTest}
        />

        <Course
          courseName="Teste"
          courseImage="/assets/images/profile-test.png"
          lessonsCount={30}
          hoursCount={40}
          price={29999 / 100}
          contents={contentTest}
        />

        <Course
          courseName="Teste"
          courseImage="/assets/images/profile-test.png"
          lessonsCount={30}
          hoursCount={40}
          price={29999 / 100}
          contents={contentTest}
          benefits={benefitTest}
        />
      </div>
    </div>
  );
}

export default CoursesPage;

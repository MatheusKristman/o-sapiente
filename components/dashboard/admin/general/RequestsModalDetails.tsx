"use client";

import { Button } from "@/components/ui/button";
import { FormAnimation } from "@/constants/framer-animations/modal";
import useAdminRequestsModalStore from "@/stores/useAdminRequestsModalStore";

import { motion } from "framer-motion";

export function RequestsModalDetails() {
  const { setDeleteConfirmation } = useAdminRequestsModalStore();

  function handleDelete() {
    setDeleteConfirmation(true);
  }

  return (
    <motion.div
      initial="initial"
      animate="animate"
      exit="exit"
      variants={FormAnimation}
      className="w-full"
    >
      <h1 className="text-2xl sm:text-3xl font-semibold text-gray-primary text-left mb-4">
        Solicitação
      </h1>

      <div className="w-full flex flex-col gap-2 mb-6">
        <div className="w-full flex gap-2">
          <span className="text-green-primary font-semibold text-left text-lg">
            Aluno:
          </span>

          <span className="text-gray-primary font-medium text-left text-base mt-1">
            John Doe
          </span>
        </div>

        <div className="w-full flex gap-2">
          <span className="text-green-primary font-semibold text-left text-lg">
            Matéria:
          </span>

          <span className="text-gray-primary font-medium text-left text-base mt-1">
            Matemática
          </span>
        </div>

        <div className="w-full flex gap-2">
          <span className="text-green-primary font-semibold text-left text-lg">
            Descrição:
          </span>

          <span className="text-gray-primary font-medium text-left text-base mt-1">
            Lorem ipsum dolor sit amet, officia excepteur ex fugiat
            reprehenderit enim labore culpa sint ad nisi Lorem pariatur mollit
            ex esse exercitation amet. Nisi anim cupidatat excepteur officia.
            Reprehenderit nostrud nostrud ipsum Lorem est aliquip amet voluptate
            voluptate dolor minim nulla est proident. Nostrud officia pariatur
            ut officia. Sit irure elit esse ea nulla sunt ex occaecat
            reprehenderit commodo officia dolor Lorem duis laboris cupidatat
            officia voluptate. Culpa proident adipisicing id nulla nisi laboris
            ex in Lorem sunt duis officia eiusmod. Aliqua reprehenderit commodo
            ex non excepteur duis sunt velit enim. Voluptate laboris sint
            cupidatat ullamco ut ea consectetur et est culpa et culpa duis.
          </span>
        </div>

        <div className="w-full flex gap-2">
          <span className="text-green-primary font-semibold text-left text-lg">
            Data de criação:
          </span>

          <span className="text-gray-primary font-medium text-left text-base mt-1">
            28/05/2024
          </span>
        </div>

        <div className="w-full flex gap-2">
          <span className="text-green-primary font-semibold text-left text-lg">
            Status:
          </span>

          <span className="text-gray-primary font-medium text-left text-base mt-1">
            Em andamento
          </span>
        </div>

        <div className="w-full flex gap-2">
          <span className="text-green-primary font-semibold text-left text-lg">
            Certificado:
          </span>

          <span className="text-gray-primary font-medium text-left text-base mt-1">
            Solicitado
          </span>
        </div>

        <div className="w-full flex gap-2">
          <span className="text-green-primary font-semibold text-left text-lg">
            Professor:
          </span>

          <span className="text-gray-primary font-medium text-left text-base mt-1">
            Mary Doe
          </span>
        </div>

        <div className="w-full flex gap-2">
          <span className="text-green-primary font-semibold text-left text-lg">
            Professor:
          </span>

          <span className="text-gray-primary font-medium text-left text-base mt-1">
            Mary Doe
          </span>
        </div>

        <div className="w-full flex gap-2">
          <span className="text-green-primary font-semibold text-left text-lg">
            Valor da aula:
          </span>

          <span className="text-gray-primary font-medium text-left text-base mt-1">
            R$ 15,00
          </span>
        </div>

        <div className="w-full flex gap-2">
          <span className="text-green-primary font-semibold text-left text-lg">
            Data da aula:
          </span>

          <span className="text-gray-primary font-medium text-left text-base mt-1">
            12/10/2024
          </span>
        </div>

        <div className="w-full flex gap-2">
          <span className="text-green-primary font-semibold text-left text-lg">
            Data de finalização:
          </span>

          <span className="text-gray-primary font-medium text-left text-base mt-1">
            --/--/----
          </span>
        </div>
      </div>

      <Button onClick={handleDelete} variant="destructive" className="w-full">
        DELETAR
      </Button>
    </motion.div>
  );
}

"use client";

import { AccountRole, Status } from "@prisma/client";
import { format } from "date-fns";
import { motion } from "framer-motion";

import { Button } from "@/components/ui/button";
import { FormAnimation } from "@/constants/framer-animations/modal";
import useAdminRequestsModalStore from "@/stores/useAdminRequestsModalStore";
import { formatPrice } from "@/libs/utils";
import { Skeleton } from "@/components/ui/skeleton";

export function RequestsModalDetails() {
  const { setDeleteConfirmation, requestSelected, isModalOpen, setRequestId } =
    useAdminRequestsModalStore();

  function handleDelete() {
    if (requestSelected) {
      setDeleteConfirmation(true);
      setRequestId(requestSelected.id);
    }
  }

  if (!requestSelected && isModalOpen) {
    return <RequestsModalSkeleton />;
  }

  const student = requestSelected?.users.filter(
    (user) => user.accountType === AccountRole.STUDENT,
  )[0];
  const professor = requestSelected?.users.filter(
    (user) => user.accountType === AccountRole.PROFESSOR,
  )[0];
  let status;

  switch (requestSelected?.status) {
    case Status.searchingProfessor:
      status = "Em busca de professor";
      break;
    case Status.support:
      status = "Em suporte";
      break;
    case Status.finished:
      status = "Finalizado";
      break;
    case Status.finishing:
      status = "Finalizando";
      break;
    case Status.inProgress:
      status = "Em andamento";
      break;
    default:
      status = "Invalido";
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
            {`${student?.firstName} ${student?.lastName}`}
          </span>
        </div>

        <div className="w-full flex gap-2">
          <span className="text-green-primary font-semibold text-left text-lg">
            Matéria:
          </span>

          <span className="text-gray-primary font-medium text-left text-base mt-1">
            {requestSelected?.subject}
          </span>
        </div>

        <div className="w-full flex gap-2">
          <span className="text-green-primary font-semibold text-left text-lg">
            Descrição:
          </span>

          <span className="text-gray-primary font-medium text-left text-base mt-1">
            {requestSelected?.description}
          </span>
        </div>

        <div className="w-full flex gap-2">
          <span className="text-green-primary font-semibold text-left text-lg">
            Data de criação:
          </span>

          <span className="text-gray-primary font-medium text-left text-base mt-1">
            {requestSelected
              ? format(new Date(requestSelected.createdAt), "dd/MM/yyyy")
              : "--/--/----"}
          </span>
        </div>

        <div className="w-full flex gap-2">
          <span className="text-green-primary font-semibold text-left text-lg">
            Status:
          </span>

          <span className="text-gray-primary font-medium text-left text-base mt-1">
            {status}
          </span>
        </div>

        <div className="w-full flex gap-2">
          <span className="text-green-primary font-semibold text-left text-lg">
            Certificado:
          </span>

          <span className="text-gray-primary font-medium text-left text-base mt-1">
            {requestSelected?.certificateRequested
              ? "Solicitado"
              : "Não solicitado"}
          </span>
        </div>

        {professor !== undefined && (
          <div className="w-full flex gap-2">
            <span className="text-green-primary font-semibold text-left text-lg">
              Professor:
            </span>

            <span className="text-gray-primary font-medium text-left text-base mt-1">
              {`${professor.firstName} ${professor.lastName}`}
            </span>
          </div>
        )}

        {requestSelected && requestSelected.lessonPrice && (
          <div className="w-full flex gap-2">
            <span className="text-green-primary font-semibold text-left text-lg">
              Valor da aula:
            </span>

            <span className="text-gray-primary font-medium text-left text-base mt-1">
              {formatPrice(requestSelected.lessonPrice)}
            </span>
          </div>
        )}

        {requestSelected && requestSelected.lessonDate && (
          <div className="w-full flex gap-2">
            <span className="text-green-primary font-semibold text-left text-lg">
              Data da aula:
            </span>

            <span className="text-gray-primary font-medium text-left text-base mt-1">
              {format(new Date(requestSelected.lessonDate), "dd/MM/yyyy")}
            </span>
          </div>
        )}

        {requestSelected && requestSelected.beginLessonDate && (
          <div className="w-full flex gap-2">
            <span className="text-green-primary font-semibold text-left text-lg">
              Data de finalização:
            </span>

            <span className="text-gray-primary font-medium text-left text-base mt-1">
              {requestSelected.finishLessonDate
                ? format(
                    new Date(requestSelected.finishLessonDate),
                    "dd/MM/yyyy",
                  )
                : "--/--/----"}
            </span>
          </div>
        )}
      </div>

      <Button onClick={handleDelete} variant="destructive" className="w-full">
        DELETAR
      </Button>
    </motion.div>
  );
}

function RequestsModalSkeleton() {
  return (
    <div className="w-full flex flex-col gap-4">
      <Skeleton className="w-[80%] h-10" />
      <Skeleton className="w-[60%] h-10" />
      <Skeleton className="w-[50%] h-10" />
      <Skeleton className="w-[90%] h-10" />
      <Skeleton className="w-[70%] h-10" />
      <Skeleton className="w-[100%] h-10" />
    </div>
  );
}

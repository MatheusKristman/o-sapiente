import Image from "next/image";
import { motion } from "framer-motion";
import { format } from "date-fns";
import { Status } from "@prisma/client";
import { useState } from "react";

import { UsersModalText } from "@/constants/dashboard/admin-general-br";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { FormAnimation } from "@/constants/framer-animations/modal";
import useAdminUsersModalStore from "@/stores/useAdminUsersModalStore";
import { Skeleton } from "@/components/ui/skeleton";
import { formatPrice } from "@/libs/utils";

export function UsersModalDetails() {
  const {
    isUserBanConfirmation,
    isRequestDeletionConfirmation,
    setRequestDeletionConfirmation,
    setUserBanConfirmation,
    userSelected,
    isModalOpen,
    setRequestId,
  } = useAdminUsersModalStore();

  if (!userSelected && isModalOpen) {
    return <UsersModalSkeleton />;
  }

  function handleUserBanConfirmation() {
    setUserBanConfirmation(true);
  }

  function handleRequestDeletionConfirmation(id: string) {
    setRequestDeletionConfirmation(true);
    setRequestId(id);
  }

  return (
    <motion.div
      initial="initial"
      animate="animate"
      exit="exit"
      variants={FormAnimation}
      className="w-full"
    >
      <div className="w-16 min-w-[64px] h-16 min-h-[64px] mb-4 rounded-full relative overflow-hidden">
        {userSelected && userSelected.profilePhoto ? (
          <Image
            src={userSelected.profilePhoto}
            alt="Usuário"
            fill
            className="object-center object-cover"
          />
        ) : (
          <Image
            src="/assets/images/default-user-photo.svg"
            alt="Usuário"
            fill
            className="object-center object-cover"
          />
        )}
      </div>

      <div className="flex flex-col gap-2 mb-6">
        <div className="flex gap-2">
          <span className="text-green-primary font-semibold text-lg text-left">
            {UsersModalText.nameLabel}
          </span>

          <span className="mt-1 text-gray-primary font-medium text-base text-left">
            {userSelected &&
              `${userSelected.firstName} ${userSelected.lastName}`}
          </span>
        </div>

        <div className="flex gap-2">
          <span className="text-green-primary font-semibold text-lg text-left">
            {UsersModalText.typeLabel}
          </span>

          <span className="mt-1 text-gray-primary font-medium text-base text-left">
            {userSelected && userSelected.accountType === "PROFESSOR"
              ? "Professor"
              : "Aluno"}
          </span>
        </div>

        <div className="flex gap-2">
          <span className="text-green-primary font-semibold text-lg text-left">
            {UsersModalText.telLabel}
          </span>

          <span className="mt-1 text-gray-primary font-medium text-base text-left">
            {userSelected && userSelected.tel}
          </span>
        </div>

        <div className="flex gap-2">
          <span className="text-green-primary font-semibold text-lg text-left">
            {UsersModalText.emailLabel}
          </span>

          <span className="mt-1 text-gray-primary font-medium text-base text-left">
            {userSelected && userSelected.email}
          </span>
        </div>

        {userSelected && userSelected.themes.length > 0 && (
          <div className="flex gap-2">
            <span className="text-green-primary font-semibold text-lg text-left">
              {UsersModalText.themesLabel}
            </span>

            <span className="mt-1 text-gray-primary font-medium text-base text-left">
              {userSelected.themes.join(", ")}
            </span>
          </div>
        )}

        {userSelected && userSelected.aboutMe && (
          <div className="w-full flex gap-2">
            <span className="text-green-primary font-semibold text-lg text-left">
              {UsersModalText.aboutLabel}
            </span>

            <span className="mt-1 text-gray-primary font-medium text-base text-left break-all">
              {userSelected.aboutMe}
            </span>
          </div>
        )}

        <div className="flex gap-2">
          <span className="text-green-primary font-semibold text-lg text-left">
            {UsersModalText.confirmedLabel}
          </span>

          <span className="mt-1 text-gray-primary font-medium text-base text-left">
            {userSelected && userSelected.isConfirmed
              ? "Confirmado"
              : "Não confirmado"}
          </span>
        </div>

        {userSelected && userSelected.accountType === "PROFESSOR" && (
          <div className="flex gap-2">
            <span className="text-green-primary font-semibold text-lg text-left">
              {UsersModalText.planLabel}
            </span>

            <span className="mt-1 text-gray-primary font-medium text-base text-left">
              {userSelected.planId ? "Ativo" : "Inativo"}
            </span>
          </div>
        )}
      </div>

      <h3 className="text-left text-xl text-gray-primary font-semibold mb-4">
        {UsersModalText.requestsTitle}
      </h3>

      {userSelected && userSelected.requests.length > 0 ? (
        <Accordion type="single" collapsible>
          {userSelected.requests.map((request, index) => {
            const otherUser = request.users.filter(
              (user) => user.id !== userSelected.id,
            )[0];

            let status;

            switch (request.status) {
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

            if (otherUser) {
              return (
                <AccordionItem value={request.id} className="px-4">
                  <AccordionTrigger>
                    <div className="flex items-center gap-x-4">
                      <div className="relative w-12 min-w-[48px] max-w-[48px] h-12 min-h-[48px] max-h-[48px] rounded-full overflow-hidden">
                        {otherUser.profilePhoto ? (
                          <Image
                            src={otherUser.profilePhoto}
                            alt="Professor"
                            fill
                            className="object-cover object-center"
                          />
                        ) : (
                          <Image
                            src="/assets/images/default-user-photo.svg"
                            alt="Professor"
                            fill
                            className="object-cover object-center"
                          />
                        )}
                      </div>

                      <span className="text-lg font-semibold text-left text-gray-primary">
                        {`${otherUser.firstName} ${otherUser.lastName}`}
                      </span>
                    </div>
                  </AccordionTrigger>

                  <AccordionContent>
                    <div className="w-full flex flex-col gap-6">
                      <div className="w-full flex flex-col gap-4">
                        <div className="w-full flex gap-2">
                          <span className="text-left text-base font-medium text-gray-primary">
                            Matéria:
                          </span>

                          <span className="text-base text-left text-gray-primary">
                            {request.subject}
                          </span>
                        </div>

                        <div className="w-full flex gap-2">
                          <span className="text-left text-base font-medium text-gray-primary">
                            Descrição:
                          </span>

                          <span className="text-base text-left text-gray-primary">
                            {request.description}
                          </span>
                        </div>

                        <div className="w-full flex gap-2">
                          <span className="text-left text-base font-medium text-gray-primary">
                            Data de criação:
                          </span>

                          <span className="text-base text-left text-gray-primary">
                            {format(new Date(request.createdAt), "dd/MM/yyyy")}
                          </span>
                        </div>

                        <div className="w-full flex gap-2">
                          <span className="text-left text-base font-medium text-gray-primary">
                            Status:
                          </span>

                          <span className="text-base text-left text-gray-primary">
                            {status}
                          </span>
                        </div>

                        {request.beginLessonDate && (
                          <div className="w-full flex gap-2">
                            <span className="text-left text-base font-medium text-gray-primary">
                              Data que a proposta foi aceita:
                            </span>

                            <span className="text-base text-left text-gray-primary">
                              {format(
                                new Date(request.beginLessonDate),
                                "dd/MM/yyyy",
                              )}
                            </span>
                          </div>
                        )}

                        {request.lessonDate && (
                          <div className="w-full flex gap-2">
                            <span className="text-left text-base font-medium text-gray-primary">
                              Data da aula:
                            </span>

                            <span className="text-base text-left text-gray-primary">
                              {format(
                                new Date(request.lessonDate),
                                "dd/MM/yyyy",
                              )}
                            </span>
                          </div>
                        )}

                        {request.lessonPrice && (
                          <div className="w-full flex gap-2">
                            <span className="text-left text-base font-medium text-gray-primary">
                              Valor da proposta:
                            </span>

                            <span className="text-base text-left text-gray-primary">
                              {formatPrice(request.lessonPrice)}
                            </span>
                          </div>
                        )}

                        {request.beginLessonDate && (
                          <div className="w-full flex gap-2">
                            <span className="text-left text-base font-medium text-gray-primary">
                              Certificado:
                            </span>

                            <span className="text-base text-left text-gray-primary">
                              {request.certificateRequested
                                ? "Solicitado"
                                : "Não solicitado"}
                            </span>
                          </div>
                        )}
                      </div>

                      <Button
                        variant="outlineDestructive"
                        onClick={() =>
                          handleRequestDeletionConfirmation(request.id)
                        }
                        className="flex items-center gap-2"
                      >
                        {UsersModalText.delBtn}
                      </Button>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              );
            } else {
              const student = request.users[0];

              return (
                <AccordionItem value={request.id} className="px-4">
                  <AccordionTrigger>
                    <div className="flex items-center gap-x-4">
                      <div className="relative w-12 min-w-[48px] max-w-[48px] h-12 min-h-[48px] max-h-[48px] rounded-full overflow-hidden">
                        {student.profilePhoto ? (
                          <Image
                            src={student.profilePhoto}
                            alt="Aluno"
                            fill
                            className="object-cover object-center"
                          />
                        ) : (
                          <Image
                            src="/assets/images/default-user-photo.svg"
                            alt="Aluno"
                            fill
                            className="object-cover object-center"
                          />
                        )}
                      </div>

                      <span className="text-lg font-semibold text-left text-gray-primary">
                        {`${student.firstName} ${student.lastName}`}
                      </span>
                    </div>
                  </AccordionTrigger>

                  <AccordionContent>
                    <div className="w-full flex flex-col gap-6">
                      <div className="w-full flex flex-col gap-4">
                        <div className="w-full flex gap-2">
                          <span className="text-left text-base font-medium text-gray-primary">
                            Matéria:
                          </span>

                          <span className="text-base text-left text-gray-primary">
                            {request.subject}
                          </span>
                        </div>

                        <div className="w-full flex gap-2">
                          <span className="text-left text-base font-medium text-gray-primary">
                            Descrição:
                          </span>

                          <span className="text-base text-left text-gray-primary">
                            {request.description}
                          </span>
                        </div>

                        <div className="w-full flex gap-2">
                          <span className="text-left text-base font-medium text-gray-primary">
                            Data de criação:
                          </span>

                          <span className="text-base text-left text-gray-primary">
                            {format(new Date(request.createdAt), "dd/MM/yyyy")}
                          </span>
                        </div>

                        <div className="w-full flex gap-2">
                          <span className="text-left text-base font-medium text-gray-primary">
                            Status:
                          </span>

                          <span className="text-base text-left text-gray-primary">
                            {status}
                          </span>
                        </div>
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              );
            }
          })}
        </Accordion>
      ) : (
        <div className="w-full flex items-center justify-center">
          <span className="text-gray-primary/70 text-center font-medium text-base">
            Nenhuma solicitação vinculada no momento
          </span>
        </div>
      )}

      <Button
        onClick={handleUserBanConfirmation}
        variant="destructive"
        className="w-full mt-6"
      >
        {UsersModalText.banBtn}
      </Button>
    </motion.div>
  );
}

function UsersModalSkeleton() {
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

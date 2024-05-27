import Image from "next/image";
import { motion } from "framer-motion";

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

export function UsersModalDetails() {
  const {
    isUserBanConfirmation,
    isRequestDeletionConfirmation,
    setRequestDeletionConfirmation,
    setUserBanConfirmation,
  } = useAdminUsersModalStore();

  function handleUserBanConfirmation() {
    setUserBanConfirmation(true);
  }

  function handleRequestDeletionConfirmation() {
    setRequestDeletionConfirmation(true);
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
        <Image
          src="/assets/images/default-user-photo.svg"
          alt="Usuário"
          fill
          className="object-center object-cover"
        />
      </div>

      <div className="flex flex-col gap-4 mb-6">
        <div className="flex gap-2">
          <span className="text-green-primary font-semibold !leading-tight text-lg text-left">
            {UsersModalText.nameLabel}
          </span>

          <span className="mt-1 text-gray-primary font-medium !leading-tight text-base text-left">
            John Doe
          </span>
        </div>

        <div className="flex gap-2">
          <span className="text-green-primary font-semibold !leading-tight text-lg text-left">
            {UsersModalText.typeLabel}
          </span>

          <span className="mt-1 text-gray-primary font-medium !leading-tight text-base text-left">
            Professor
          </span>
        </div>

        <div className="flex gap-2">
          <span className="text-green-primary font-semibold !leading-tight text-lg text-left">
            {UsersModalText.telLabel}
          </span>

          <span className="mt-1 text-gray-primary font-medium !leading-tight text-base text-left">
            (11) 91004-1998
          </span>
        </div>

        <div className="flex gap-2">
          <span className="text-green-primary font-semibold !leading-tight text-lg text-left">
            {UsersModalText.emailLabel}
          </span>

          <span className="mt-1 text-gray-primary font-medium !leading-tight text-base text-left">
            email@teste.com
          </span>
        </div>

        <div className="flex gap-2">
          <span className="text-green-primary font-semibold !leading-tight text-lg text-left">
            {UsersModalText.themesLabel}
          </span>

          <span className="mt-1 text-gray-primary font-medium !leading-tight text-base text-left">
            Portugues, Matemativa, História
          </span>
        </div>

        <div className="flex gap-2">
          <span className="text-green-primary font-semibold !leading-tight text-lg text-left">
            {UsersModalText.aboutLabel}
          </span>

          <span className="mt-1 text-gray-primary font-medium !leading-tight text-base text-left">
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

        <div className="flex gap-2">
          <span className="text-green-primary font-semibold !leading-tight text-lg text-left">
            {UsersModalText.confirmedLabel}
          </span>

          <span className="mt-1 text-gray-primary font-medium !leading-tight text-base text-left">
            Confirmado
          </span>
        </div>

        <div className="flex gap-2">
          <span className="text-green-primary font-semibold !leading-tight text-lg text-left">
            {UsersModalText.planLabel}
          </span>

          <span className="mt-1 text-gray-primary font-medium !leading-tight text-base text-left">
            Ativo
          </span>
        </div>
      </div>

      <h3 className="text-left text-xl text-gray-primary font-semibold mb-4">
        {UsersModalText.requestsTitle}
      </h3>

      <Accordion type="single" collapsible>
        <AccordionItem value={"1"} className="px-4">
          <AccordionTrigger>
            <div className="flex items-center gap-x-4">
              <div className="relative w-12 min-w-[48px] max-w-[48px] h-12 min-h-[48px] max-h-[48px] rounded-full overflow-hidden">
                <Image
                  src="/assets/images/default-user-photo.svg"
                  alt="Professor"
                  fill
                  className="object-cover object-center"
                />
              </div>

              <span className="text-lg font-semibold text-left text-gray-primary">
                Mary Doe
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
                    Matemática
                  </span>
                </div>

                <div className="w-full flex gap-2">
                  <span className="text-left text-base font-medium text-gray-primary">
                    Descrição:
                  </span>

                  <span className="text-base text-left text-gray-primary">
                    Lorem ipsum dolor sit amet, officia excepteur ex fugiat
                    reprehenderit enim labore culpa sint ad nisi Lorem pariatur
                    mollit ex esse exercitation amet. Nisi anim cupidatat
                    excepteur officia. Reprehenderit nostrud nostrud ipsum Lorem
                    est aliquip amet voluptate voluptate dolor minim nulla est
                    proident. Nostrud officia pariatur ut officia. Sit irure
                    elit esse ea nulla sunt ex occaecat reprehenderit commodo
                    officia dolor Lorem duis laboris cupidatat officia
                    voluptate. Culpa proident adipisicing id nulla nisi laboris
                    ex in Lorem sunt duis officia eiusmod. Aliqua reprehenderit
                    commodo ex non excepteur duis sunt velit enim. Voluptate
                    laboris sint cupidatat ullamco ut ea consectetur et est
                    culpa et culpa duis.
                  </span>
                </div>

                <div className="w-full flex gap-2">
                  <span className="text-left text-base font-medium text-gray-primary">
                    Data de criação:
                  </span>

                  <span className="text-base text-left text-gray-primary">
                    21/02/2024
                  </span>
                </div>

                <div className="w-full flex gap-2">
                  <span className="text-left text-base font-medium text-gray-primary">
                    Status:
                  </span>

                  <span className="text-base text-left text-gray-primary">
                    Em andamento
                  </span>
                </div>

                <div className="w-full flex gap-2">
                  <span className="text-left text-base font-medium text-gray-primary">
                    Data que a proposta foi aceita:
                  </span>

                  <span className="text-base text-left text-gray-primary">
                    14/02/2024
                  </span>
                </div>

                <div className="w-full flex gap-2">
                  <span className="text-left text-base font-medium text-gray-primary">
                    Data da aula:
                  </span>

                  <span className="text-base text-left text-gray-primary">
                    16/02/2024
                  </span>
                </div>

                <div className="w-full flex gap-2">
                  <span className="text-left text-base font-medium text-gray-primary">
                    Valor da proposta:
                  </span>

                  <span className="text-base text-left text-gray-primary">
                    R$ 20,00
                  </span>
                </div>

                <div className="w-full flex gap-2">
                  <span className="text-left text-base font-medium text-gray-primary">
                    Certificado:
                  </span>

                  <span className="text-base text-left text-gray-primary">
                    Solicitado
                  </span>
                </div>
              </div>

              <Button
                onClick={handleRequestDeletionConfirmation}
                className="flex items-center gap-2"
              >
                {UsersModalText.delBtn}
              </Button>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>

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

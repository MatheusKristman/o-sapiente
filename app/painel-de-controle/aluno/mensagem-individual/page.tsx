"use client";

import Image from "next/image";
import {
  ImageIcon,
  Mic,
  ChevronLeft,
  MoreHorizontal,
  Plus,
  Video,
} from "lucide-react";

import Button from "@/components/Button";
import { useState } from "react";
import { useRouter } from "next/navigation";

const DashboardPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  console.log(isModalOpen);

  const router = useRouter();
  function handleNavigation() {
    router.push("/painel-de-controle/aluno/mensagens/651c6e6d60387a3209064589");
  }

  function openModal() {
    console.log("CLICK");
    setIsModalOpen(true);
  }

  function closeModal() {
    setIsModalOpen(false);
  }

  return (
    <div className="flex-1 w-full mx-auto flex flex-row ">
      <div className="flex flex-col w-full">
        <div className="w-full bg-[#2C383F] h-fit px-2 lg:px-6 py-2">
          <div className="flex flex-row w-full">
            <button
              className="text-green-primary px-3 block md:hidden"
              onClick={handleNavigation}
            >
              <ChevronLeft size={35} />
            </button>
            <div className="flex justify-start  md:px-6 py-2">
              <Image
                src="/assets/images/profile-test.png"
                alt="Perfil"
                width={50}
                height={50}
                className="object-cover rounded-full w-12 h-12"
              />
            </div>
            <div className="flex flex-col text-white py-2 px-3">
              <span className="text-md font-medium"> John Doe</span>
              <span className="text-xs">Online</span>
            </div>
            <button
              onClick={openModal}
              className="text-green-primary px-4 flex items-center ml-auto md:hidden"
            >
              <MoreHorizontal size={35} />
            </button>
            {isModalOpen && (
              <div
                tabIndex={-1}
                className="fixed top-0 left-0 right-0 z-50 md:hidden w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full"
              >
                <div className="relative w-full max-w-2xl max-h-full">
                  {/* <!-- Modal content --> */}
                  <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                    {/* <!-- Modal header --> */}
                    <div className="flex items-center justify-between p-5 border-b rounded-t dark:border-gray-600">
                      <h3 className="text-xl font-medium text-gray-900 dark:text-white">
                        Top right modal
                      </h3>
                      <button
                        onClick={closeModal}
                        type="button"
                        className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                        data-modal-hide="top-right-modal"
                      >
                        <svg
                          className="w-3 h-3"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 14 14"
                        >
                          <path
                            stroke="currentColor"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                          />
                        </svg>
                        <span className="sr-only">Close modal</span>
                      </button>
                    </div>
                    {/* <!-- Modal body --> */}
                    <div className="p-6 space-y-6">
                      <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                        With less than a month to go before the European Union
                        enacts new consumer privacy laws for its citizens,
                        companies around the world are updating their terms of
                        service agreements to comply.
                      </p>
                      <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                        The European Union’s General Data Protection Regulation
                        (G.D.P.R.) goes into effect on May 25 and is meant to
                        ensure a common set of data rights in the European
                        Union. It requires organizations to notify users as soon
                        as possible of high-risk data breaches that could
                        personally affect them.
                      </p>
                    </div>
                    {/* <!-- Modal footer --> */}
                    <div className="flex items-center p-6 space-x-2 border-t border-gray-200 rounded-b dark:border-gray-600">
                      <button
                        onClick={closeModal}
                        data-modal-hide="top-right-modal"
                        type="button"
                        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                      >
                        I accept
                      </button>
                      <button
                        onClick={closeModal}
                        data-modal-hide="top-right-modal"
                        type="button"
                        className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
                      >
                        Decline
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            <div className="hidden md:flex justify-end ml-auto px-4 py-2">
              <Button label="Confirmar Finalização" fullWidth primary />
            </div>
          </div>
        </div>

        <div className="w-full flex bg-[#2C383F] h-28 mt-auto">
          <div className="w-full flex flex-row px-4 py-4 gap-8">
            <div className="flex flex-row items-center justify-start gap-3.5 md:pl-11">
              <button className="flex rounded-xl w-12 h-12 bg-green-primary text-white md:hidden justify-center items-center">
                <Plus />
              </button>
              <button className="hidden rounded-xl w-12 h-12 bg-green-primary text-white md:flex justify-center items-center">
                <ImageIcon />
              </button>

              <button className="hidden rounded-xl w-12 h-12 bg-green-primary text-white md:flex justify-center items-center">
                <Video />
              </button>
            </div>

            <div className="w-full flex items-center">
              <input
                type="search"
                name="search"
                placeholder="Digite a sua mensagem"
                className="w-full border-2 border-[#40535D] bg-[#40535D] h-12 pl-5 pr-5 rounded-xl text-md text-white focus:outline-none"
              />
            </div>

            <div className="flex flex-row items-center justify-start md:pr-11">
              <button className="rounded-xl w-12 md:w-full h-12 px-2.5 gap-2.5  bg-green-primary text-white flex justify-center items-center font-semibold">
                <Mic />
                <span className="hidden md:block">Gravar</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default DashboardPage;

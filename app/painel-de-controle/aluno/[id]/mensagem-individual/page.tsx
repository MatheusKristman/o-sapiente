"use client";

import Image from "next/image";
import {
  ImageIcon,
  Mic,
  ChevronLeft,
  MoreHorizontal,
  Plus,
  Video,
  XCircleIcon,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const DashboardPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalFooterOpen, setIsModalFooterOpen] = useState(false);

  const router = useRouter();
  function handleNavigation() {
    router.push("/painel-de-controle/aluno/mensagens/651c6e6d60387a3209064589");
  }

  const toggleModalNav = () => {
    setIsModalOpen(!isModalOpen); // Inverte o estado atual da modal
  };

  const toggleModalFooter = () => {
    setIsModalFooterOpen(!isModalFooterOpen); // Inverte o estado atual da modal
  };

  useEffect(() => {
    function handleResize() {
      if (window.innerWidth >= 768) {
        setIsModalOpen(false);
        setIsModalFooterOpen(false);
      }
    }
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="flex-1 w-full mx-auto flex flex-row ">
      <div className="flex flex-col w-full">
        <div className="w-full bg-[#2C383F] h-fit px-2 lg:px-6 py-2">
          <div className="flex flex-row w-full">
            <Button
              variant="link"
              size="icon"
              className="text-green-primary px-3 block md:hidden"
              onClick={handleNavigation}
            >
              <ChevronLeft size={35} />
            </Button>
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

            <Button
              variant="link"
              size="icon"
              className="text-green-primary px-4 flex items-center ml-auto md:hidden"
            >
              {isModalOpen ? (
                <XCircleIcon onClick={toggleModalNav} size={35} />
              ) : (
                <MoreHorizontal onClick={toggleModalNav} size={35} />
              )}
            </Button>

            <div className="hidden md:flex justify-end ml-auto px-4 py-2">
              <Button className="w-full">Confirmar Finalização</Button>
            </div>
          </div>
        </div>

        {isModalOpen && (
          <div className="flex w-full">
            <div className="flex w-full justify-end ">
              <div className="flex justify-center items-center w-72 h-24 bg-white rounded-l-lg rounded-br-lg">
                <Button className="w-full">Confirmar Finalização</Button>
              </div>
            </div>
          </div>
        )}

        {isModalFooterOpen && (
          <div className="flex flex-col justify-end h-screen">
            <div className="flex justify-start w-full">
              <div className="flex flex-col gap-4 items-start  h-fit bg-white rounded-r-lg rounded-tl-lg p-6">
                <Button className="rounded-xl gap-2.5 p-2.5 w-44 h-12 bg-green-primary text-white flex justify-start items-center">
                  <ImageIcon />
                  Enviar Imagem
                </Button>

                <Button className="rounded-xl gap-2.5 p-2.5 w-44 h-12 bg-green-primary text-white flex justify-start items-center">
                  <Video />
                  Enviar Video
                </Button>
              </div>
            </div>
          </div>
        )}

        <div className="w-full flex bg-[#2C383F] h-28 mt-auto">
          <div className="w-full flex flex-row px-4 py-4 gap-8">
            <div className="flex flex-row items-center justify-start gap-3.5 md:pl-11">
              <Button
                onClick={toggleModalFooter}
                className="flex rounded-xl w-12 h-12 bg-green-primary text-white md:hidden justify-center items-center"
              >
                {isModalFooterOpen ? <XCircleIcon /> : <Plus />}
              </Button>

              <Button className="hidden rounded-xl w-12 h-12 bg-green-primary text-white md:flex justify-center items-center">
                <ImageIcon />
              </Button>

              <Button className="hidden rounded-xl w-12 h-12 bg-green-primary text-white md:flex justify-center items-center">
                <Video />
              </Button>
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
              <Button className="rounded-xl w-12 md:w-full h-12 px-2.5 gap-2.5  bg-green-primary text-white flex justify-center items-center font-semibold">
                <Mic />
                <span className="hidden md:block">Gravar</span>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default DashboardPage;

import {
  ChevronLeft,
  MoreHorizontal,
  Plus,
  ImageIcon,
  Video,
  Mic,
  XCircleIcon,
} from "lucide-react";
import Image from "next/image";

import Button from "@/components/Button";
import { cn } from "@/libs/utils";
import { useEffect, useState } from "react";

interface MessagesChatBoxProps {
  isMessageOpen: boolean;
  handleBackBtn: () => void;
}

const MessagesChatBox = ({
  isMessageOpen,
  handleBackBtn,
}: MessagesChatBoxProps) => {
  const [isModalNavOpen, setIsModalNavOpen] = useState(false);
  const [isModalFooterOpen, setIsModalFooterOpen] = useState(false);

  const toggleModalNav = () => {
    setIsModalNavOpen(!isModalNavOpen);
  };

  const toggleModalFooter = () => {
    setIsModalFooterOpen(!isModalFooterOpen);
  };

  useEffect(() => {
    function handleResize() {
      if (window.innerWidth >= 768) {
        setIsModalNavOpen(false);
        setIsModalFooterOpen(false);
      }
    }
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div
      className={cn(
        "flex-1 flex flex-col lg:w-full lg:h-full lg:flex ",
        isMessageOpen ? "flex" : "hidden lg:flex",
      )}
    >
      <div className=" w-full bg-[#2C383F] h-fit px-6 py-4 sm:px-16">
        <div className="w-full flex items-center justify-between">
          <div className="flex items-center gap-x-4">
            <button
              onClick={handleBackBtn}
              className="text-green-primary block lg:hidden"
            >
              <ChevronLeft size={35} />
            </button>

            <div className="relative flex items-center jusitfy-center w-12 h-12 min-w-[48px] max-w-[48px] min-h-[48px] max-h-[48px] rounded-full overflow-hidden">
              <Image
                src="/assets/images/profile-test.png"
                alt="Perfil"
                fill
                className="object-cover w-full h-full"
              />
            </div>

            <div className="flex flex-col gap-y-1">
              <span className="text-white text-md font-medium"> John Doe</span>
              <span className="text-white text-xs">Online</span>
            </div>
          </div>

          <div className="flex items-center">
            <button
              onClick={toggleModalNav}
              className="text-green-primary flex items-center ml-auto md:hidden"
            >
              {isModalNavOpen ? (
                <XCircleIcon
                  onClick={toggleModalNav}
                  size={35}
                  strokeWidth={2.7}
                />
              ) : (
                <MoreHorizontal
                  onClick={toggleModalNav}
                  size={35}
                  strokeWidth={2.7}
                />
              )}
            </button>

            <div className="hidden md:flex justify-end ml-auto">
              <Button
                onClick={() => {}}
                label="Confirmar Finalização"
                fullWidth
                primary
              />
            </div>
          </div>
        </div>
      </div>

      {isModalNavOpen && (
        <div className="flex w-full">
          <div className="flex w-full justify-end  mt-1">
            <div className="flex w-full justify-end ">
              <div className="flex justify-center items-center w-72 h-24 bg-white rounded-l-lg rounded-br-lg">
                <Button
                  onClick={() => {}}
                  label="Confirmar Finalização"
                  primary
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {isModalFooterOpen && (
        <div className="flex flex-col-reverse justify-start w-[233px] h-full">
          <div className="flex flex-col gap-4 items-center h-fit bg-white rounded-r-lg rounded-tl-lg p-6">
            <button
              onClick={() => {}}
              className=" rounded-xl gap-2.5 p-2.5 w-44 h-12 bg-green-primary text-white flex justify-start items-center"
            >
              <ImageIcon />
              Enviar Imagem
            </button>
            <button
              onClick={() => {}}
              className="rounded-xl gap-2.5 p-2.5 w-44 h-12 bg-green-primary text-white flex justify-start items-center"
            >
              <Video />
              Enviar Video
            </button>
          </div>
        </div>
      )}

      <div className="w-full flex bg-[#2C383F] h-[112px]  mt-auto">
        <div className="w-full flex flex-row px-6 py-4 gap-8 sm:px-16">
          <div className="flex flex-row items-center justify-start gap-3.5">
            <button
              onClick={toggleModalFooter}
              className="flex rounded-xl w-12 h-12 bg-green-primary text-white md:hidden justify-center items-center"
            >
              {isModalFooterOpen ? <XCircleIcon /> : <Plus />}
            </button>
            <button
              onClick={() => {}}
              className="hidden rounded-xl w-12 h-12 bg-green-primary text-white md:flex justify-center items-center"
            >
              <ImageIcon />
            </button>

            <button
              onClick={() => {}}
              className="hidden rounded-xl w-12 h-12 bg-green-primary text-white md:flex justify-center items-center"
            >
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

          <div className="flex flex-row items-center justify-start">
            <button className="rounded-xl w-12 md:w-full h-12 px-2.5 gap-2.5  bg-green-primary text-white flex justify-center items-center font-semibold">
              <Mic />
              <span className="hidden md:block">Gravar</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MessagesChatBox;

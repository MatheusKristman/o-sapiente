import { ChevronLeft, MoreHorizontal, Plus, ImageIcon, Video, Mic } from "lucide-react";
import Image from "next/image";

import Button from "@/components/Button";
import { cn } from "@/libs/utils";

interface MessagesChatBoxProps {
  isMessageOpen: boolean;
  handleBackBtn: () => void;
}

const MessagesChatBox = ({ isMessageOpen, handleBackBtn }: MessagesChatBoxProps) => {
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
            <button onClick={handleBackBtn} className="text-green-primary block lg:hidden">
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
            <button className="text-green-primary flex items-center ml-auto md:hidden">
              <MoreHorizontal size={35} strokeWidth={2.7} />
            </button>

            <div className="hidden md:flex justify-end ml-auto">
              <Button onClick={() => {}} label="Confirmar Finalização" fullWidth primary />
            </div>
          </div>
        </div>
      </div>

      <div className="w-full flex bg-[#2C383F] h-28 mt-auto">
        <div className="w-full flex flex-row px-6 py-4 gap-8 sm:px-16">
          <div className="flex flex-row items-center justify-start gap-3.5">
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

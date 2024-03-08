"use client";

import { ChevronLeft, MoreHorizontal, Plus, XCircleIcon } from "lucide-react";
import Image from "next/image";
import {
  ChangeEvent,
  Dispatch,
  SetStateAction,
  useEffect,
  useState,
  useRef,
} from "react";
import { useSession } from "next-auth/react";
import { useParams } from "next/navigation";
import axios from "axios";

import Button from "@/components/Button";
import { cn } from "@/libs/utils";
import Body from "./Body";
import { RequestWithUsers } from "@/types";

interface MessagesChatBoxProps {
  handleBackBtn: () => void;
  requestId: string;
  request: RequestWithUsers;
  setIsImageModalOpen: Dispatch<SetStateAction<boolean>>;
  setIsVideoModalOpen: Dispatch<SetStateAction<boolean>>;
}

const MessagesChatBox = ({
  handleBackBtn,
  requestId,
  request,
  setIsImageModalOpen,
  setIsVideoModalOpen,
}: MessagesChatBoxProps) => {
  const [isMessageOpen, setIsMessageOpen] = useState<boolean>(false);
  const [content, setContent] = useState<string>("");
  const [isModalNavOpen, setIsModalNavOpen] = useState<boolean>(false);
  const [isModalFooterOpen, setIsModalFooterOpen] = useState<boolean>(false);
  const session = useSession();
  const params = useParams();
  const messageInputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (params?.requestId) {
      setIsMessageOpen(true);
    }

    return () => {
      setIsMessageOpen(false);
    };
  }, [params?.requestId]);

  const toggleModalNav = () => {
    setIsModalNavOpen(!isModalNavOpen);
  };

  const toggleModalFooter = () => {
    setIsModalFooterOpen(!isModalFooterOpen);
  };

  const handleContent = (event: ChangeEvent<HTMLInputElement>) => {
    setContent(event.target.value);
  };

  const handleImageModalOpen = () => {
    setIsModalFooterOpen(false);
    setIsImageModalOpen(true);
  };

  const handleVideoModalOpen = () => {
    setIsModalFooterOpen(false);
    setIsVideoModalOpen(true);
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

  const handleSubmitTest = () => {
    if (content.length > 0) {
      axios
        .post(`/api/socket/messages?requestId=${requestId}`, {
          content,
          email: session.data?.user?.email,
        })
        .then((res) => console.log(res.data))
        .catch((error) => console.error(error));
    } else {
      messageInputRef.current?.focus();

      return;
    }
  };

  return (
    <div
      className={cn(
        "flex-1 flex flex-col lg:w-full lg:h-full lg:flex",
        isMessageOpen ? "flex" : "hidden lg:flex"
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

            <div className="relative flex items-center justify-center w-12 h-12 min-w-[48px] max-w-[48px] min-h-[48px] max-h-[48px] rounded-full overflow-hidden">
              <Image
                src="/assets/images/default-user-photo.svg"
                alt="Perfil"
                fill
                className="object-cover w-full h-full"
              />
            </div>

            <div className="flex flex-col gap-y-1">
              <span className="text-white text-md font-medium">John Doe</span>
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

      <Body />

      {isModalFooterOpen && (
        <div className="flex flex-col-reverse justify-start w-[233px] h-full">
          <div className="flex flex-col gap-4 items-center h-fit bg-white rounded-r-lg rounded-tl-lg p-6">
            <button
              onClick={handleImageModalOpen}
              className=" rounded-xl gap-2.5 p-2.5 w-full h-12 bg-green-primary text-white flex justify-start items-center"
            >
              <div className="bg-galleryIcon bg-no-repeat bg-contain w-7 h-7" />
              Enviar Imagem
            </button>
            <button
              onClick={handleVideoModalOpen}
              className="rounded-xl gap-2.5 p-2.5 w-full h-12 bg-green-primary text-white flex justify-start items-center"
            >
              <div className="bg-videoIcon bg-no-repeat bg-contain w-7 h-7" />
              Enviar Video
            </button>
          </div>
        </div>
      )}

      <div className="w-full flex bg-[#2C383F] mt-auto">
        <div className="w-full flex flex-row px-6 py-4 gap-8 sm:px-16">
          <div className="flex flex-row items-center justify-start gap-3.5">
            <button
              onClick={toggleModalFooter}
              className="flex rounded-xl w-12 h-12 bg-green-primary text-white md:hidden justify-center items-center"
            >
              {isModalFooterOpen ? <XCircleIcon /> : <Plus />}
            </button>

            <button
              onClick={handleImageModalOpen}
              className="hidden rounded-xl w-12 h-12 bg-green-primary text-white md:flex justify-center items-center"
            >
              <div className="bg-galleryIcon bg-no-repeat bg-contain w-7 h-7" />
            </button>

            <button
              onClick={handleVideoModalOpen}
              className="hidden rounded-xl w-12 h-12 bg-green-primary text-white md:flex justify-center items-center"
            >
              <div className="bg-videoIcon bg-no-repeat bg-contain w-7 h-7" />
            </button>
          </div>

          <div className="w-full flex items-center">
            <input
              ref={messageInputRef}
              type="text"
              name="message"
              placeholder="Digite a sua mensagem"
              value={content}
              onChange={handleContent}
              className="w-full border-2 border-[#40535D] bg-[#40535D] h-12 pl-5 pr-5 rounded-xl text-md text-white focus:outline-none"
            />
          </div>

          {/* <div className="flex flex-row items-center justify-start"> */}
          {/*     {content.length > 0 ? ( */}
          {/*         <button */}
          {/*             onClick={handleSubmitTest} */}
          {/*             className="rounded-xl w-12 md:w-full h-12 px-2.5 gap-2.5  bg-green-primary text-white flex justify-center items-center font-semibold" */}
          {/*         > */}
          {/*             <div className="bg-sendIcon w-7 h-7 text-white bg-no-repeat bg-contain" /> */}
          {/*             <span className="hidden md:block">Enviar</span> */}
          {/*         </button> */}
          {/*     ) : ( */}
          {/*         <button */}
          {/*             onClick={handleSubmitTest} */}
          {/*             className="rounded-xl w-12 md:w-full h-12 px-2.5 gap-2.5  bg-green-primary text-white flex justify-center items-center font-medium" */}
          {/*         > */}
          {/*             <div className="bg-micOnIcon w-7 h-7 text-white bg-no-repeat bg-contain" /> */}
          {/*             <span className="hidden md:block">Gravar</span> */}
          {/*         </button> */}
          {/*     )} */}
          {/* </div> */}

          <div className="flex flex-row items-center justify-start">
            <button
              onClick={handleSubmitTest}
              className="rounded-xl w-12 md:w-full h-12 px-2.5 gap-2.5  bg-green-primary text-white flex justify-center items-center font-semibold"
            >
              <div className="bg-sendIcon w-7 h-7 text-white bg-no-repeat bg-contain" />
              <span className="hidden md:block">Enviar</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MessagesChatBox;

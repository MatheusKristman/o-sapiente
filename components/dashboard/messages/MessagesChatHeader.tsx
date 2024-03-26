import { Button } from "@/components/ui/button";
import useActiveStore from "@/hooks/useActiveStore";
import useOtherUser from "@/hooks/useOtherUser";
import { Conversation, User } from "@prisma/client";
import { ChevronLeft, MoreHorizontal, XCircleIcon } from "lucide-react";
import Image from "next/image";

interface Props {
  conversation: Conversation & {
    users: User[];
  };
}

const MessagesChatHeader = ({ conversation }: Props) => {
  const otherUser = useOtherUser(conversation);

  const { members } = useActiveStore();
  const isActive = members.indexOf(otherUser?.email!) !== -1;

  if (!otherUser) {
    return (
      <div>
        <div>Carregando...</div>
      </div>
    );
  }

  return (
    <>
      <div className=" w-full bg-[#2C383F] h-fit px-6 py-4 sm:px-16">
        <div className="w-full flex items-center justify-between">
          <div className="flex items-center gap-x-4">
            <Button
              variant="link"
              size="icon"
              onClick={() => {}}
              className="text-green-primary block lg:hidden"
            >
              <ChevronLeft size={35} />
            </Button>

            <div className="relative flex items-center justify-center w-12 h-12 min-w-[48px] max-w-[48px] min-h-[48px] max-h-[48px] rounded-full overflow-hidden">
              {otherUser.profilePhoto ? (
                <Image
                  src={otherUser.profilePhoto}
                  alt="Perfil"
                  fill
                  className="object-cover w-full h-full"
                />
              ) : (
                <Image
                  src="/assets/images/default-user-photo.svg"
                  alt="Perfil"
                  fill
                  className="object-cover w-full h-full"
                />
              )}
            </div>

            <div className="flex flex-col gap-y-1">
              <span className="text-white text-md font-medium">{`${otherUser.firstName} ${otherUser.lastName}`}</span>
              <span className="text-white text-xs">
                {isActive ? "Online" : "Offline"}
              </span>
            </div>
          </div>

          <div className="flex items-center">
            <Button
              variant="link"
              size="icon"
              onClick={() => {}}
              className="text-green-primary flex items-center ml-auto md:hidden"
            >
              {false ? (
                <XCircleIcon onClick={() => {}} size={35} strokeWidth={2.7} />
              ) : (
                <MoreHorizontal
                  onClick={() => {}}
                  size={35}
                  strokeWidth={2.7}
                />
              )}
            </Button>

            <div className="hidden md:flex justify-end ml-auto">
              <Button className="w-full">Confirmar Finalização</Button>
            </div>
          </div>
        </div>
      </div>

      {false && (
        <div className="flex w-full">
          <div className="flex w-full justify-end  mt-1">
            <div className="flex w-full justify-end ">
              <div className="flex justify-center items-center w-72 h-24 bg-white rounded-l-lg rounded-br-lg">
                <Button className="w-full">Confirmar Finalização</Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default MessagesChatHeader;

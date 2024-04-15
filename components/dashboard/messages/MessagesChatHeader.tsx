import { ChevronLeft, MoreHorizontal, XCircleIcon } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Conversation, User } from "@prisma/client";

import { Button } from "@/components/ui/button";
import useActiveStore from "@/hooks/useActiveStore";
import useOtherUser from "@/hooks/useOtherUser";
import useHeaderStore from "@/stores/useHeaderStore";
import { Skeleton } from "@/components/ui/skeleton";

interface Props {
  conversation: Conversation & {
    users: User[];
  };
  handleNavModal: () => void;
  isModalNavOpen: boolean;
  userType: "aluno" | "professor";
}

const MessagesChatHeader = ({
  conversation,
  handleNavModal,
  isModalNavOpen,
  userType,
}: Props) => {
  const otherUser = useOtherUser(conversation);
  const { userId } = useHeaderStore();
  const router = useRouter();

  const { members } = useActiveStore();
  const isActive = members.indexOf(otherUser?.email!) !== -1;

  function handleBackButton() {
    router.push(`/painel-de-controle/${userType}/${userId}/mensagens`);
  }

  if (!otherUser) {
    return <SkeletonMessagesChatHeader />;
  }

  return (
    <>
      <div className=" w-full bg-[#2C383F] h-fit px-6 py-4 sm:px-16">
        <div className="w-full flex items-center justify-between">
          <div className="flex items-center gap-x-4">
            <Button
              variant="link"
              size="icon"
              onClick={handleBackButton}
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
        </div>
      </div>
    </>
  );
};

const SkeletonMessagesChatHeader = () => {
  return (
    <div className=" w-full bg-[#2C383F] h-fit px-6 py-4 sm:px-16">
      <div className="w-full flex items-center justify-between">
        <div className="flex items-center gap-x-4">
          <Skeleton className="block lg:hidden w-8 h-12 bg-[#40535E]" />

          <div className="relative flex items-center justify-center w-12 h-12 min-w-[48px] max-w-[48px] min-h-[48px] max-h-[48px] rounded-full overflow-hidden">
            <Skeleton className="w-full h-full bg-[#40535E]" />
          </div>

          <div className="flex flex-col gap-y-1">
            <Skeleton className="h-6 w-24 sm:w-36 bg-[#40535E]" />

            <Skeleton className="h-4 w-14 sm:w-20 bg-[#40535E]" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MessagesChatHeader;

import { noConversationInfo } from "@/constants/dashboard/message-br";

const MessagesEmpty = () => {
    return (
        <div className="hidden flex-1 flex-col items-center justify-center gap-y-12 lg:w-full lg:h-full lg:flex">
            <div className="bg-logoIcon bg-no-repeat bg-contain bg-center w-80 h-80" />
            <span className="text-2xl text-[#C8D6DF] text-center font-medium">
                {noConversationInfo.desc}
            </span>
        </div>
    );
};

export default MessagesEmpty;

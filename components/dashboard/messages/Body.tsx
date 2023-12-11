"use cliente";

import { useRef, useState } from "react";

interface BodyProps {
    initialMessages: string;
}

const Body: React.FC<BodyProps> = ({ initialMessages }) => {
    const [messages, setMessages] = useState(initialMessages);
    const bottomRef = useRef<HTMLDivElement>(null);

    return (
        <div className="w-full h-[calc(100vh-291px)] overflow-y-auto">
            {/* Quando voce envia */}
            <div className="flex gap-3 px-6 py-4 justify-end">
                <div className="flex flex-col gap-2 items-end">
                    <div className="text-sm text-white w-fit overflow-hidden bg-green-primary rounded-l-lg rounded-br-lg py-2 px-3">
                        Teste 1
                    </div>
                </div>
            </div>

            {/* quando voce recebe */}
            <div className="flex gap-3 px-6 py-4 pt-0 justify-start">
                <div className="flex flex-col gap-2 items-end">
                    <div className="text-sm text-[#2C383F] w-fit overflow-hidden bg-[#C8D6DF] rounded-r-lg rounded-bl-lg py-2 px-3">
                        Teste 1
                    </div>
                </div>
            </div>
            <div className="flex gap-3 px-6 py-4 justify-end">
                <div className="flex flex-col gap-2 items-end">
                    <div className="text-sm text-white w-fit overflow-hidden bg-green-primary rounded-l-lg rounded-br-lg py-2 px-3">
                        Teste 1
                    </div>
                </div>
            </div>

            {/* quando voce recebe */}
            <div className="flex gap-3 px-6 py-4 pt-0 justify-start">
                <div className="flex flex-col gap-2 items-end">
                    <div className="text-sm text-[#2C383F] w-fit overflow-hidden bg-[#C8D6DF] rounded-r-lg rounded-bl-lg py-2 px-3">
                        Teste 1
                    </div>
                </div>
            </div>
            <div className="flex gap-3 px-6 py-4 justify-end">
                <div className="flex flex-col gap-2 items-end">
                    <div className="text-sm text-white w-fit overflow-hidden bg-green-primary rounded-l-lg rounded-br-lg py-2 px-3">
                        Teste 1
                    </div>
                </div>
            </div>

            {/* quando voce recebe */}
            <div className="flex gap-3 px-6 py-4 pt-0 justify-start">
                <div className="flex flex-col gap-2 items-end">
                    <div className="text-sm text-[#2C383F] w-fit overflow-hidden bg-[#C8D6DF] rounded-r-lg rounded-bl-lg py-2 px-3">
                        Teste 1
                    </div>
                </div>
            </div>
            <div className="flex gap-3 px-6 py-4 justify-end">
                <div className="flex flex-col gap-2 items-end">
                    <div className="text-sm text-white w-fit overflow-hidden bg-green-primary rounded-l-lg rounded-br-lg py-2 px-3">
                        Teste 1
                    </div>
                </div>
            </div>

            {/* quando voce recebe */}
            <div className="flex gap-3 px-6 py-4 pt-0 justify-start">
                <div className="flex flex-col gap-2 items-end">
                    <div className="text-sm text-[#2C383F] w-fit overflow-hidden bg-[#C8D6DF] rounded-r-lg rounded-bl-lg py-2 px-3">
                        Teste 1
                    </div>
                </div>
            </div>
            <div className="flex gap-3 px-6 py-4 justify-end">
                <div className="flex flex-col gap-2 items-end">
                    <div className="text-sm text-white w-fit overflow-hidden bg-green-primary rounded-l-lg rounded-br-lg py-2 px-3">
                        Teste 1
                    </div>
                </div>
            </div>

            {/* quando voce recebe */}
            <div className="flex gap-3 px-6 py-4 pt-0 justify-start">
                <div className="flex flex-col gap-2 items-end">
                    <div className="text-sm text-[#2C383F] w-fit overflow-hidden bg-[#C8D6DF] rounded-r-lg rounded-bl-lg py-2 px-3">
                        Teste 1
                    </div>
                </div>
            </div>
            <div className="flex gap-3 px-6 py-4 justify-end">
                <div className="flex flex-col gap-2 items-end">
                    <div className="text-sm text-white w-fit overflow-hidden bg-green-primary rounded-l-lg rounded-br-lg py-2 px-3">
                        Teste 1
                    </div>
                </div>
            </div>

            {/* quando voce recebe */}
            <div className="flex gap-3 px-6 py-4 pt-0 justify-start">
                <div className="flex flex-col gap-2 items-end">
                    <div className="text-sm text-[#2C383F] w-fit overflow-hidden bg-[#C8D6DF] rounded-r-lg rounded-bl-lg py-2 px-3">
                        Teste 1
                    </div>
                </div>
            </div>
            <div className="flex gap-3 px-6 py-4 justify-end">
                <div className="flex flex-col gap-2 items-end">
                    <div className="text-sm text-white w-fit overflow-hidden bg-green-primary rounded-l-lg rounded-br-lg py-2 px-3">
                        Teste 1
                    </div>
                </div>
            </div>

            {/* quando voce recebe */}
            <div className="flex gap-3 px-6 py-4 pt-0 justify-start">
                <div className="flex flex-col gap-2 items-end">
                    <div className="text-sm text-[#2C383F] w-fit overflow-hidden bg-[#C8D6DF] rounded-r-lg rounded-bl-lg py-2 px-3">
                        Teste 1
                    </div>
                </div>
            </div>
            <div className="flex gap-3 px-6 py-4 justify-end">
                <div className="flex flex-col gap-2 items-end">
                    <div className="text-sm text-white w-fit overflow-hidden bg-green-primary rounded-l-lg rounded-br-lg py-2 px-3">
                        Teste 1
                    </div>
                </div>
            </div>

            {/* quando voce recebe */}
            <div className="flex gap-3 px-6 py-4 pt-0 justify-start">
                <div className="flex flex-col gap-2 items-end">
                    <div className="text-sm text-[#2C383F] w-fit overflow-hidden bg-[#C8D6DF] rounded-r-lg rounded-bl-lg py-2 px-3">
                        Teste 1
                    </div>
                </div>
            </div>
            <div className="flex gap-3 px-6 py-4 justify-end">
                <div className="flex flex-col gap-2 items-end">
                    <div className="text-sm text-white w-fit overflow-hidden bg-green-primary rounded-l-lg rounded-br-lg py-2 px-3">
                        Teste 1
                    </div>
                </div>
            </div>

            {/* quando voce recebe */}
            <div className="flex gap-3 px-6 py-4 pt-0 justify-start">
                <div className="flex flex-col gap-2 items-end">
                    <div className="text-sm text-[#2C383F] w-fit overflow-hidden bg-[#C8D6DF] rounded-r-lg rounded-bl-lg py-2 px-3">
                        Teste 1
                    </div>
                </div>
            </div>
            <div className="flex gap-3 px-6 py-4 justify-end">
                <div className="flex flex-col gap-2 items-end">
                    <div className="text-sm text-white w-fit overflow-hidden bg-green-primary rounded-l-lg rounded-br-lg py-2 px-3">
                        Teste 1
                    </div>
                </div>
            </div>

            {/* quando voce recebe */}
            <div className="flex gap-3 px-6 py-4 pt-0 justify-start">
                <div className="flex flex-col gap-2 items-end">
                    <div className="text-sm text-[#2C383F] w-fit overflow-hidden bg-[#C8D6DF] rounded-r-lg rounded-bl-lg py-2 px-3">
                        Teste 1
                    </div>
                </div>
            </div>
            <div className="flex gap-3 px-6 py-4 justify-end">
                <div className="flex flex-col gap-2 items-end">
                    <div className="text-sm text-white w-fit overflow-hidden bg-green-primary rounded-l-lg rounded-br-lg py-2 px-3">
                        Teste 1
                    </div>
                </div>
            </div>

            {/* quando voce recebe */}
            <div className="flex gap-3 px-6 py-4 pt-0 justify-start">
                <div className="flex flex-col gap-2 items-end">
                    <div className="text-sm text-[#2C383F] w-fit overflow-hidden bg-[#C8D6DF] rounded-r-lg rounded-bl-lg py-2 px-3">
                        Teste 1
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Body;

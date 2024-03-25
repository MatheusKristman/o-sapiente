"use client";

import { Search } from "lucide-react";
import Image from "next/image";
import { cn } from "@/libs/utils";
import { useRouter, useParams } from "next/navigation";
import { useState, useEffect } from "react";

import { Button } from "@/components/ui/button";

const MessagesContactsBox = () => {
  const [isMessageOpen, setIsMessageOpen] = useState<boolean>(false);

  const router = useRouter();
  const params = useParams();

  useEffect(() => {
    if (params?.requestId) {
      setIsMessageOpen(true);
    }

    return () => {
      setIsMessageOpen(false);
    };
  }, [params?.requestId]);

  function handleNavigation() {
    router.push(
      `/painel-de-controle/professor/${params?.id}/mensagens/${"656e2030bb73a681424b52e1"}`,
    );
  }

  return (
    <div
      className={cn(
        "flex-1 w-full flex flex-col bg-white lg:max-w-md lg:min-w-[448px] pt-9",
        isMessageOpen ? "hidden lg:flex" : "flex",
      )}
    >
      <div className="px-9 w-full">
        <div className="w-full flex items-center justify-between h-[46px] bg-[#EBEFF1] rounded-lg px-5 peer">
          <input
            type="text"
            name="search"
            placeholder="Faça sua pesquisa aqui..."
            className="bg-transparent outline-none w-full"
          />

          <Search
            className="h-6 w-6 min-h-[24px] min-w-[24px]"
            style={{
              color: "#9DA5AA",
            }}
          />
        </div>
      </div>

      <div className="w-full h-56 scrollbar scrollbar-thumb-slate-100 mt-9">
        <div
          className="w-full bg-white hover:bg-green-primary transition ease-in-out delay-150 group px-9 py-6 lg:cursor-pointer"
          onClick={handleNavigation}
        >
          <div className="flex flex-row justify-between items-center w-full">
            <div className="flex gap-5 items-center">
              <div className="relative flex justify-center items-center w-12 h-12 min-w-[48px] min-h-[48px] max-w-[48px] max-h-[48px] rounded-full overflow-hidden">
                <Image
                  src="/assets/images/profile-test.png"
                  alt="Perfil"
                  fill
                  className="object-cover"
                />
              </div>

              <div className="flex flex-col gap-y-1 group-hover:text-white transition ease-in-out delay-150 max-w-[200px]">
                <span className="font-semibold">John Doe</span>

                <span className="text-sm whitespace-nowrap truncate">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae
                  optio voluptatibus molestiae praesentium qui nisi quod, ipsa
                  animi voluptate quas!
                </span>
              </div>
            </div>

            <span className="rounded-3xl w-12 h-12 bg-green-primary text-white flex justify-center items-center font-semibold group-hover:text-green-primary group-hover:bg-white  transition ease-in-out delay-150">
              1
            </span>
          </div>
        </div>
      </div>

      <div className="flex px-9 pb-6 mt-auto">
        <Button className="w-full">Suporte</Button>
      </div>
    </div>
  );
};

export default MessagesContactsBox;

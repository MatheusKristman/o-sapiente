"use client";

import { ChevronDown, Search } from "lucide-react";
import axios from "axios";
import { useEffect } from "react";
import { toast } from "react-hot-toast";
import { useSession } from "next-auth/react";

import { Input } from "@/components/ui/input";
import { AdminGeneralText } from "@/constants/dashboard/admin-general-br";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { UserItem } from "./UserItem";
import useUserStore from "@/stores/useUserStore";
import useAdminStore from "@/stores/useAdminStore";

export function UsersBox() {
  const { userId } = useUserStore();
  const { setUsers, users } = useAdminStore();
  const session = useSession();

  useEffect(() => {
    console.log(userId);
    if (userId && session.status === "authenticated") {
      axios
        .get(`/api/adm/users/get-users/${userId}`)
        .then((res) => {
          setUsers(res.data);
        })
        .catch((error) => {
          console.error(error);

          toast.error(error.response.data);
        });
    }
  }, [userId, session]);

  return (
    <div className="w-full h-full lg:max-w-[350px] rounded-lg bg-white p-9 mb-5 shadow-md shadow-[rgba(0,0,0,0.25)]">
      <div className="w-full flex flex-col sm:flex-row sm:justify-between sm:gap-6 lg:flex-col lg:justify-start lg:gap-2 gap-2">
        <h2 className="text-gray-primary text-xl font-semibold lg:whitespace-nowrap whitespace-normal">
          {AdminGeneralText.usersBoxTitle}
        </h2>

        <div className="w-full sm:max-w-md flex items-center gap-4 pb-1">
          <div className="basis-full flex items-center justify-between input-admin-users-search focus-within:ring-2 focus-within:ring-[#9DA5AA] peer">
            <Input
              type="text"
              name="search"
              placeholder={AdminGeneralText.usersPlaceholder}
              className="bg-transparent outline-none w-full"
            />

            <Search
              className="h-6 w-6 min-h-[24px] min-w-[24px]"
              style={{
                color: "#9DA5AA",
              }}
            />
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger className="bg-[#EBEFF1] px-4 py-3 h-12 rounded-lg flex items-center justify-center">
              <ChevronDown size="30" strokeWidth={1.5} color="#9DA5AA" />
            </DropdownMenuTrigger>

            <DropdownMenuContent>
              <DropdownMenuLabel className="text-gray-primary">
                {AdminGeneralText.usersDropdownLabel}
              </DropdownMenuLabel>

              <DropdownMenuSeparator />

              <DropdownMenuItem className="text-gray-primary">
                Nome
              </DropdownMenuItem>
              <DropdownMenuItem className="text-gray-primary">
                E-mail
              </DropdownMenuItem>
              <DropdownMenuItem className="text-gray-primary">
                Tipo de conta
              </DropdownMenuItem>
              <DropdownMenuItem className="text-gray-primary">
                Data de cadastro
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      <div className="relative w-full max-h-[640px] lg:max-h-[450px] overflow-auto scrollbar-thumb-rounded-full scrollbar-track-rounded-full scrollbar-thin scrollbar-thumb-gray-primary/40 scrollbar-track-gray-primary/20">
        <div className="sticky z-10 top-0 left-0 w-full h-6 bg-gradient-to-b from-white to-transparent" />

        {!users ? null : users.length > 0 ? (
          users.map((user, index) => (
            <UserItem
              key={user.id}
              last={index === users.length - 1}
              user={user}
            />
          ))
        ) : (
          <p>Sem usuários</p>
        )}

        <div className="sticky z-10 bottom-0 left-0 w-full h-6 bg-gradient-to-t from-white to-transparent" />
      </div>
    </div>
  );
}

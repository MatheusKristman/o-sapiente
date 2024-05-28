"use client";

import { ChevronDown, Search } from "lucide-react";
import axios from "axios";
import { useEffect } from "react";
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
import { RequestItem } from "@/components/dashboard/admin/general/RequestItem";
import useAdminStore from "@/stores/useAdminStore";
import useUserStore from "@/stores/useUserStore";

export function RequestsBox() {
  const { requests, setRequests } = useAdminStore();
  const { userId } = useUserStore();
  const session = useSession();

  useEffect(() => {
    if (userId && session.status === "authenticated") {
      axios
        .get(`/api/adm/requests/get-requests/${userId}`)
        .then((res) => {
          setRequests(res.data);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, [userId, session]);

  return (
    <div className="w-full rounded-lg bg-green-primary p-9 shadow-md shadow-[rgba(0,0,0,0.25)]">
      <div className="w-full flex flex-col sm:flex-row lg:flex-col xl:flex-row sm:justify-between lg:justify-start xl:justify-between sm:gap-6 lg:gap-2 xl:gap-6 gap-2">
        <h2 className="text-white text-xl font-semibold lg:whitespace-nowrap whitespace-normal">
          {AdminGeneralText.requestsBoxTitle}
        </h2>

        <div className="w-full sm:max-w-md flex items-center gap-4 pb-1">
          <div className="basis-full flex items-center justify-between input-admin-requests-search focus-within:ring-2 focus-within:ring-[#00FFAB] peer">
            <Input
              type="text"
              name="search"
              placeholder={AdminGeneralText.requestsPlaceholder}
              className="bg-transparent placeholder:text-green-primary outline-none w-full"
            />

            <Search
              className="h-6 w-6 min-h-[24px] min-w-[24px]"
              style={{
                color: "#03C988",
              }}
            />
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger className="bg-white px-4 py-3 h-12 rounded-lg flex items-center justify-center">
              <ChevronDown size="30" strokeWidth={1.5} color="#03C988" />
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

      <div className="relative w-full max-h-[600px] lg:max-h-[450px] overflow-auto scrollbar-thumb-rounded-full scrollbar-track-rounded-full scrollbar-thin scrollbar-thumb-gray-primary/40 scrollbar-track-gray-primary/20">
        {requests && requests.length > 0 ? (
          <>
            <div className="sticky z-10 top-0 left-0 w-full h-6 bg-gradient-to-b from-green-primary to-transparent" />

            {requests.map((request, index) => (
              <RequestItem
                key={request.id}
                last={index === requests.length - 1}
                request={request}
              />
            ))}

            <div className="sticky z-10 bottom-0 left-0 w-full h-6 bg-gradient-to-t from-green-primary to-transparent" />
          </>
        ) : (
          <div>
            <span>Nenhuma solicitação no momento</span>
          </div>
        )}
      </div>
    </div>
  );
}

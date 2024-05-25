import { ChevronDown, Search } from "lucide-react";

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

export function UsersBox() {
  return (
    <div className="w-full rounded-lg bg-white p-9 mb-5 shadow-md shadow-[rgba(0,0,0,0.25)]">
      <h2 className="text-gray-primary text-xl font-semibold mb-2 lg:whitespace-nowrap whitespace-normal">
        {AdminGeneralText.usersBoxTitle}
      </h2>

      <div className="w-full flex items-center gap-4">
        <div className="basis-full flex items-center justify-between input-admin-search focus-within:ring-2 focus-within:ring-[#9DA5AA] peer">
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
            <DropdownMenuLabel className="text-gray-primary">{AdminGeneralText.usersDropdownLabel}</DropdownMenuLabel>

            <DropdownMenuSeparator />

            <DropdownMenuItem className="text-gray-primary">Nome</DropdownMenuItem>
            <DropdownMenuItem className="text-gray-primary">E-mail</DropdownMenuItem>
            <DropdownMenuItem className="text-gray-primary">Tipo de conta</DropdownMenuItem>
            <DropdownMenuItem className="text-gray-primary">Data de cadastro</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <div className="relative w-full max-h-[600px] lg:max-h-[400px] overflow-auto scrollbar-thumb-rounded-full scrollbar-track-rounded-full scrollbar-thin scrollbar-thumb-gray-primary/40 scrollbar-track-gray-primary/20">
        <div className="sticky top-0 left-0 w-full h-6 bg-gradient-to-b from-white to-transparent" />

        <UserItem />

        <div className="sticky bottom-0 left-0 w-full h-6 bg-gradient-to-t from-white to-transparent" />
      </div>
    </div>
  );
}

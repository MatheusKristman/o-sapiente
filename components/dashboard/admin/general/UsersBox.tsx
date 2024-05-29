"use client";

import { CalendarIcon, ChevronDown, Search } from "lucide-react";
import axios from "axios";
import { ChangeEvent, useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { useSession } from "next-auth/react";
import { addDays, format, getYear, isBefore, isAfter, isEqual } from "date-fns";
import { ptBR } from "date-fns/locale";

import { Input } from "@/components/ui/input";
import { AdminGeneralText } from "@/constants/dashboard/admin-general-br";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { UserItem } from "./UserItem";
import useUserStore from "@/stores/useUserStore";
import useAdminStore from "@/stores/useAdminStore";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { AccountRole } from "@prisma/client";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { cn } from "@/libs/utils";
import { Calendar } from "@/components/ui/calendar";
import { DateRange } from "react-day-picker";

export function UsersBox() {
  const initialRange: DateRange = {
    from: new Date(),
    to: addDays(new Date(), 4),
  };

  const [filterType, setFilterType] = useState<string>("name");
  const [filterValue, setFilterValue] = useState<string>("");
  const [filterDateValue, setFilterDateValue] = useState<DateRange | undefined>(
    initialRange,
  );

  const { userId } = useUserStore();
  const { setUsers, users } = useAdminStore();
  const session = useSession();
  const currentYear = getYear(new Date());

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

  useEffect(() => {
    console.log(filterDateValue);
  }, [filterDateValue]);

  function handleFilter(value: string) {
    setFilterValue("");
    setFilterDateValue(undefined);
    setFilterType(value);
  }

  return (
    <div className="w-full h-full lg:max-w-[350px] rounded-lg bg-white p-9 mb-5 shadow-md shadow-[rgba(0,0,0,0.25)]">
      <div className="w-full flex flex-col sm:flex-row sm:justify-between sm:gap-6 lg:flex-col lg:justify-start lg:gap-2 gap-2">
        <h2 className="text-gray-primary text-xl font-semibold lg:whitespace-nowrap whitespace-normal">
          {AdminGeneralText.usersBoxTitle}
        </h2>

        <div className="w-full sm:max-w-md flex items-center gap-4 pb-1">
          {filterType === "name" ? (
            <div className="basis-full flex items-center justify-between input-admin-users-search focus-within:ring-2 focus-within:ring-[#9DA5AA] peer">
              <Input
                type="text"
                name="filter"
                value={filterValue}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  setFilterValue(e.target.value)
                }
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
          ) : filterType === "email" ? (
            <div className="basis-full flex items-center justify-between input-admin-users-search focus-within:ring-2 focus-within:ring-[#9DA5AA] peer">
              <Input
                type="text"
                name="filter"
                value={filterValue}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  setFilterValue(e.target.value)
                }
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
          ) : filterType === "type" ? (
            <Select
              // disabled={isSubmitting || isLoading}
              // defaultValue={field.value}
              value={filterValue}
              onValueChange={setFilterValue}
              name="filter"
            >
              <SelectTrigger className="input placeholder:text-white">
                <SelectValue
                  placeholder={AdminGeneralText.usersTypePlaceholder}
                />
              </SelectTrigger>

              <SelectContent>
                <SelectItem value="PROFESSOR">Professor</SelectItem>

                <SelectItem value="STUDENT">Aluno</SelectItem>
              </SelectContent>
            </Select>
          ) : filterType === "date" ? (
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="datePicker"
                  className={cn(
                    "w-full pl-3 text-left font-normal",
                    !filterDateValue && "text-muted-foreground",
                  )}
                >
                  {filterDateValue &&
                  filterDateValue.from &&
                  filterDateValue.to ? (
                    `${format(new Date(filterDateValue.from), "dd/MM")} - ${format(new Date(filterDateValue.to), "dd/MM")}`
                  ) : (
                    <span className="text-gray-primary/50">
                      Data de nascimento
                    </span>
                  )}

                  <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                </Button>
              </PopoverTrigger>

              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="range"
                  locale={ptBR}
                  selected={filterDateValue}
                  onSelect={setFilterDateValue}
                  disabled={(date) =>
                    date > new Date() || date < new Date("1900-01-01")
                  }
                  captionLayout="dropdown"
                  fromYear={1900}
                  toYear={currentYear}
                  classNames={{
                    day_hidden: "invisible",
                    dropdown:
                      "px-2 py-1.5 rounded-md bg-popover text-popover-foreground text-sm  focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 ring-offset-background",
                    caption_dropdowns: "flex gap-3",
                    vhidden: "hidden",
                    caption_label: "hidden",
                  }}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          ) : null}

          <DropdownMenu>
            <DropdownMenuTrigger className="bg-[#EBEFF1] px-4 py-3 h-12 rounded-lg flex items-center justify-center">
              <ChevronDown size="30" strokeWidth={1.5} color="#9DA5AA" />
            </DropdownMenuTrigger>

            <DropdownMenuContent>
              <DropdownMenuLabel className="text-gray-primary">
                {AdminGeneralText.usersDropdownLabel}
              </DropdownMenuLabel>

              <DropdownMenuSeparator />

              <DropdownMenuRadioGroup
                value={filterType}
                onValueChange={handleFilter}
              >
                <DropdownMenuRadioItem
                  value="name"
                  className="text-gray-primary"
                >
                  Nome
                </DropdownMenuRadioItem>
                <DropdownMenuRadioItem
                  value="email"
                  className="text-gray-primary"
                >
                  E-mail
                </DropdownMenuRadioItem>
                <DropdownMenuRadioItem
                  value="type"
                  className="text-gray-primary"
                >
                  Tipo de conta
                </DropdownMenuRadioItem>
                <DropdownMenuRadioItem
                  value="date"
                  className="text-gray-primary"
                >
                  Data de cadastro
                </DropdownMenuRadioItem>
              </DropdownMenuRadioGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      <div className="relative w-full max-h-[640px] lg:max-h-[450px] overflow-auto scrollbar-thumb-rounded-full scrollbar-track-rounded-full scrollbar-thin scrollbar-thumb-gray-primary/40 scrollbar-track-gray-primary/20">
        {!users ? null : filterType === "name" && filterValue.length > 3 ? (
          <>
            <div className="sticky z-10 top-0 left-0 w-full h-6 bg-gradient-to-b from-white to-transparent" />

            {users
              .filter((user) =>
                `${user.firstName} ${user.lastName}`
                  .toLowerCase()
                  .normalize("NFD")
                  .replace(/[\u0300-\u036f]/g, "")
                  .includes(
                    filterValue
                      .normalize("NFD")
                      .replace(/[\u0300-\u036f]/g, "")
                      .toLowerCase(),
                  ),
              )
              .map((user, index) => (
                <UserItem
                  key={user.id}
                  last={index === users.length - 1}
                  user={user}
                />
              ))}

            <div className="sticky z-10 bottom-0 left-0 w-full h-6 bg-gradient-to-t from-white to-transparent" />
          </>
        ) : filterType === "email" && filterValue.length > 3 ? (
          <>
            <div className="sticky z-10 top-0 left-0 w-full h-6 bg-gradient-to-b from-white to-transparent" />

            {users
              .filter((user) =>
                user.email
                  .toLowerCase()
                  .normalize("NFD")
                  .replace(/[\u0300-\u036f]/g, "")
                  .includes(
                    filterValue
                      .normalize("NFD")
                      .replace(/[\u0300-\u036f]/g, "")
                      .toLowerCase(),
                  ),
              )
              .map((user, index) => (
                <UserItem
                  key={user.id}
                  last={index === users.length - 1}
                  user={user}
                />
              ))}

            <div className="sticky z-10 bottom-0 left-0 w-full h-6 bg-gradient-to-t from-white to-transparent" />
          </>
        ) : filterType === "type" && filterValue.length > 0 ? (
          <>
            <div className="sticky z-10 top-0 left-0 w-full h-6 bg-gradient-to-b from-white to-transparent" />

            {users
              .filter((user) => {
                if (filterValue === "PROFESSOR") {
                  return user.accountType === AccountRole.PROFESSOR;
                } else if (filterValue === "STUDENT") {
                  return user.accountType === AccountRole.STUDENT;
                }
              })
              .map((user, index) => (
                <UserItem
                  key={user.id}
                  last={index === users.length - 1}
                  user={user}
                />
              ))}

            <div className="sticky z-10 bottom-0 left-0 w-full h-6 bg-gradient-to-t from-white to-transparent" />
          </>
        ) : filterType === "date" &&
          filterDateValue &&
          filterDateValue.from &&
          filterDateValue.to ? (
          <>
            <div className="sticky z-10 top-0 left-0 w-full h-6 bg-gradient-to-b from-white to-transparent" />

            {users
              .filter((user) => {
                if (
                  filterDateValue &&
                  filterDateValue.from &&
                  filterDateValue.to
                ) {
                  if (
                    isAfter(
                      new Date(user.createdAt),
                      new Date(filterDateValue.from),
                    ) &&
                    isBefore(
                      new Date(user.createdAt),
                      new Date(filterDateValue.to),
                    )
                  ) {
                    return user;
                  } else {
                    return null;
                  }
                } else {
                  return user;
                }
              })
              .map((user, index) => (
                <UserItem
                  key={user.id}
                  last={index === users.length - 1}
                  user={user}
                />
              ))}

            <div className="sticky z-10 bottom-0 left-0 w-full h-6 bg-gradient-to-t from-white to-transparent" />
          </>
        ) : users.length > 0 ? (
          <>
            <div className="sticky z-10 top-0 left-0 w-full h-6 bg-gradient-to-b from-white to-transparent" />

            {users.map((user, index) => (
              <UserItem
                key={user.id}
                last={index === users.length - 1}
                user={user}
              />
            ))}

            <div className="sticky z-10 bottom-0 left-0 w-full h-6 bg-gradient-to-t from-white to-transparent" />
          </>
        ) : (
          <div className="mt-6 flex items-center justify-center">
            <span className="text-gray-primary/70 text-center font-medium text-base">
              Nenhuma usuário cadastrado no momento
            </span>
          </div>
        )}
      </div>
    </div>
  );
}

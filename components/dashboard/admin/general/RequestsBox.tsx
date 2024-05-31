"use client";

import { CalendarIcon, ChevronDown, Loader2, Search } from "lucide-react";
import axios from "axios";
import { ChangeEvent, useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { compareAsc, format, getYear } from "date-fns";
import { ptBR } from "date-fns/locale";

import { Input } from "@/components/ui/input";
import { AdminGeneralText } from "@/constants/dashboard/admin-general-br";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuRadioGroup,
} from "@/components/ui/dropdown-menu";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { cn } from "@/libs/utils";
import { Calendar } from "@/components/ui/calendar";
import { RequestItem } from "@/components/dashboard/admin/general/RequestItem";
import useAdminStore from "@/stores/useAdminStore";
import useUserStore from "@/stores/useUserStore";

export function RequestsBox() {
  const [filterType, setFilterType] = useState<string>("subject");
  const [filterValue, setFilterValue] = useState<string>("");
  const [filterDateValue, setFilterDateValue] = useState<Date | undefined>(
    undefined,
  );
  const [requestsLoading, setRequestsLoading] = useState<boolean>(false);

  const { requests, setRequests } = useAdminStore();
  const { userId } = useUserStore();
  const session = useSession();
  const currentYear = getYear(new Date());

  useEffect(() => {
    if (userId && session.status === "authenticated") {
      setRequestsLoading(true);

      axios
        .get(`/api/adm/requests/get-requests/${userId}`)
        .then((res) => {
          setRequests(res.data);
        })
        .catch((error) => {
          console.error(error);
        })
        .finally(() => {
          setRequestsLoading(false);
        });
    }
  }, [userId, session]);

  function handleFilter(value: string) {
    setFilterValue("");
    setFilterDateValue(undefined);
    setFilterType(value);
  }

  return (
    <div className="w-full rounded-lg bg-green-primary p-9 shadow-md shadow-[rgba(0,0,0,0.25)]">
      <div className="w-full flex flex-col sm:flex-row lg:flex-col xl:flex-row sm:justify-between lg:justify-start xl:justify-between sm:gap-6 lg:gap-2 xl:gap-6 gap-2">
        <h2 className="text-white text-xl font-semibold lg:whitespace-nowrap whitespace-normal">
          {AdminGeneralText.requestsBoxTitle}
        </h2>

        <div className="w-full sm:max-w-md lg:max-w-none xl:max-w-md flex items-center gap-4 pb-1">
          {filterType === "subject" ? (
            <div className="basis-full flex items-center justify-between input-admin-requests-search focus-within:ring-2 focus-within:ring-[#00FFAB] peer">
              <Input
                type="text"
                name="filter"
                value={filterValue}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  setFilterValue(e.target.value)
                }
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
          ) : filterType === "date" ? (
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="datePicker"
                  className={cn(
                    "w-full bg-[#00744E] pl-3 text-left font-normal hover:bg-[#00744E]/80",
                    !filterDateValue && "text-muted-foreground",
                  )}
                >
                  {filterDateValue ? (
                    <span className="text-green-primary">
                      {format(new Date(filterDateValue), "dd/MM/yyyy")}
                    </span>
                  ) : (
                    <span className="text-green-primary/70">
                      {AdminGeneralText.requestsDatePlaceholder}
                    </span>
                  )}

                  <CalendarIcon
                    color="#03C988"
                    className="ml-auto h-4 w-4 opacity-50"
                  />
                </Button>
              </PopoverTrigger>

              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
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
            <DropdownMenuTrigger className="bg-white px-4 py-3 h-12 rounded-lg flex items-center justify-center">
              <ChevronDown size="30" strokeWidth={1.5} color="#03C988" />
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
                  value="subject"
                  className="text-gray-primary"
                >
                  {AdminGeneralText.requestsDropdownSubject}
                </DropdownMenuRadioItem>

                <DropdownMenuRadioItem
                  value="date"
                  className="text-gray-primary"
                >
                  {AdminGeneralText.requestsDropdownDate}
                </DropdownMenuRadioItem>
              </DropdownMenuRadioGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {requestsLoading ? (
        <div className="w-full mt-4 flex items-center justify-center">
          <Loader2 size={50} color="#FFFFFF" className="animate-spin" />
        </div>
      ) : (
        <div className="relative w-full max-h-[600px] lg:max-h-[450px] overflow-auto scrollbar-thumb-rounded-full scrollbar-track-rounded-full scrollbar-thin scrollbar-thumb-gray-primary/40 scrollbar-track-gray-primary/20">
          {requests && filterType === "subject" && filterValue.length > 3 ? (
            <>
              <div className="sticky z-10 top-0 left-0 w-full h-6 bg-gradient-to-b from-green-primary to-transparent" />

              {requests
                .filter((request) =>
                  request.subject
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
                .map((request, index) => (
                  <RequestItem
                    key={request.id}
                    last={index === requests.length - 1}
                    request={request}
                  />
                ))}

              <div className="sticky z-10 bottom-0 left-0 w-full h-6 bg-gradient-to-t from-green-primary to-transparent" />
            </>
          ) : requests && filterType === "date" && filterDateValue ? (
            <>
              <div className="sticky z-10 top-0 left-0 w-full h-6 bg-gradient-to-b from-green-primary to-transparent" />

              {requests
                .filter(
                  (request) =>
                    compareAsc(filterDateValue, request.createdAt) <= 0,
                )
                .map((request, index) => (
                  <RequestItem
                    key={request.id}
                    last={index === requests.length - 1}
                    request={request}
                  />
                ))}

              <div className="sticky z-10 bottom-0 left-0 w-full h-6 bg-gradient-to-t from-green-primary to-transparent" />
            </>
          ) : requests && requests.length > 0 ? (
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
            <div className="mt-6 flex items-center justify-center">
              <span className="text-gray-primary/70 text-center font-medium text-lg">
                {AdminGeneralText.requestsNotFound}
              </span>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

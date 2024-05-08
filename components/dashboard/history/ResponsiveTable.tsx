"use client";

import React, { useEffect } from "react";
import { compareAsc, subDays } from "date-fns";

import ResultCard from "@/components/dashboard/history/ResultCard";
import TableRow from "@/components/dashboard/history/TableRow";
import { RequestWithUsersAndOffers } from "@/types";
import useHistoryStore from "@/stores/useHistoryStore";

interface ResponsiveTableProps {
  requests: RequestWithUsersAndOffers[];
  type: "Professor" | "Student";
}

const ResponsiveTable: React.FC<ResponsiveTableProps> = ({
  requests,
  type,
}) => {
  const { filterDateNumber, filterDate, setFilterDate, searchValue } =
    useHistoryStore();

  useEffect(() => {
    setFilterDate(new Date(subDays(new Date(), filterDateNumber)));
  }, [filterDateNumber, setFilterDate]);

  return (
    <div className="relative pb-12 pt-12">
      <div className="sticky top-0 left-0 w-6 bg-gradient-to-r from-white to-transparent" />

      <div className="hidden lg:block sm:overflow-x-auto">
        <table className="w-full border-separate border-spacing-y-5">
          <thead>
            <tr>
              <th className="w-40 min-w-[300px] p-3 text-base font-medium tracking-wide text-left text-[#879298] whitespace-nowrap">
                {type === "Professor" ? "Aluno" : null}
                {type === "Student" ? "Professor" : null}
              </th>

              <th className="w-24 p-3 text-base font-medium tracking-wide text-left text-[#879298] whitespace-nowrap">
                Data Início
              </th>

              <th className="w-24 p-3 text-base font-medium tracking-wide text-left text-[#879298] whitespace-nowrap">
                Data Finalização
              </th>

              <th className="w-24 p-3 text-base font-medium tracking-wide text-left text-[#879298]">
                Status
              </th>

              <th className="w-32 p-3 text-base font-medium tracking-wide text-left text-[#879298]">
                Valor
              </th>
            </tr>
          </thead>

          <tbody>
            {searchValue.length > 0
              ? requests
                  .filter((request) => {
                    const isRequestDateOnRange: boolean =
                      compareAsc(filterDate, request.createdAt) <= 0;
                    const hasOtherUser: boolean = request.users.length === 2;

                    if (!hasOtherUser) {
                      return false;
                    }

                    const firstName =
                      type === "Professor"
                        ? request.users[0].firstName
                        : request.users[1].firstName;
                    const lastName =
                      type === "Professor"
                        ? request.users[0].lastName
                        : request.users[1].lastName;

                    const userFoundOnSearch: boolean = `${firstName
                      .toLowerCase()
                      .normalize("NFD")
                      .replace(/[\u0300-\u036f]/g, "")} ${lastName
                      .toLowerCase()
                      .normalize("NFD")
                      .replace(/[\u0300-\u036f]/g, "")}`.includes(
                      searchValue
                        .toLowerCase()
                        .normalize("NFD")
                        .replace(/[\u0300-\u036f]/g, ""),
                    );

                    return isRequestDateOnRange && userFoundOnSearch;
                  })
                  .map((request, index) => (
                    <TableRow key={index} request={request} />
                  ))
              : requests
                  .filter(
                    (request) => compareAsc(filterDate, request.createdAt) <= 0,
                  )
                  .map((request, index) => (
                    <TableRow key={index} request={request} />
                  ))}
          </tbody>
        </table>
      </div>

      <div className="relative w-full flex flex-col gap-y-5 overflow-y-auto max-h-[500px] lg:hidden">
        <div className="sticky top-0 left-0 w-full h-6 min-h-[24px] bg-gradient-to-b from-[#F0F5F8] to-transparent z-[9]" />

        {searchValue.length > 0
          ? requests
              .filter((request) => {
                const isRequestDateOnRange: boolean =
                  compareAsc(filterDate, request.createdAt) <= 0;
                const hasOtherUser: boolean = request.users.length === 2;

                if (!hasOtherUser) {
                  return false;
                }

                const firstName =
                  type === "Professor"
                    ? request.users[0].firstName
                    : request.users[1].firstName;
                const lastName =
                  type === "Professor"
                    ? request.users[0].lastName
                    : request.users[1].lastName;

                const userFoundOnSearch: boolean = `${firstName
                  .toLowerCase()
                  .normalize("NFD")
                  .replace(/[\u0300-\u036f]/g, "")} ${lastName
                  .toLowerCase()
                  .normalize("NFD")
                  .replace(/[\u0300-\u036f]/g, "")}`.includes(
                  searchValue
                    .toLowerCase()
                    .normalize("NFD")
                    .replace(/[\u0300-\u036f]/g, ""),
                );

                return isRequestDateOnRange && userFoundOnSearch;
              })
              .map((request, index) => (
                <ResultCard key={index} request={request} />
              ))
          : requests
              .filter(
                (request) => compareAsc(filterDate, request.createdAt) <= 0,
              )
              .map((request, index) => (
                <ResultCard key={index} request={request} />
              ))}

        <div className="sticky bottom-0 left-0 w-full h-6 min-h-[24px] bg-gradient-to-t from-[#F0F5F8] to-transparent z-[9]" />
      </div>
    </div>
  );
};

export default ResponsiveTable;

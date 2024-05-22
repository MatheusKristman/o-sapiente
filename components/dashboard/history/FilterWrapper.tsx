"use client";

import { Search, ChevronDown } from "lucide-react";
import { ChangeEvent } from "react";

import useHistoryStore from "@/stores/useHistoryStore";
import { Input } from "@/components/ui/input";

interface FilterWrapperProps {
  isTeacher: boolean;
}

const FilterWrapper: React.FC<FilterWrapperProps> = ({ isTeacher }) => {
  const { filterDateNumber, setFilterDateNumber, searchValue, setSearchValue } = useHistoryStore();

  return (
    <div className="flex flex-col pt-9 md:flex-row md:justify-between">
      <div className="w-full flex items-center justify-between input-light focus-within:ring-2 focus-within:ring-[#9DA5AA] peer md:w-7/12 lg:w-96">
        <Input
          type="text"
          name="search"
          value={searchValue}
          onChange={(event: ChangeEvent<HTMLInputElement>) => setSearchValue(event.target.value)}
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

      <div className="flex flex-col md:flex-row w-full md:justify-end mt-6 gap-6 lg:w-fit md:mt-0">
        {/* <div */}
        {/*     className={ */}
        {/*         isTeacher */}
        {/*             ? "hidden" */}
        {/*             : "flex w-full md:w-6/12 md:whitespace-nowrap lg:w-fit" */}
        {/*     } */}
        {/* > */}
        {/*     <Button onClick={() => {}} className="w-full"> */}
        {/*         Consultar Certificado */}
        {/*     </Button> */}
        {/* </div> */}

        <div className={isTeacher ? "relative w-full md:w-4/12 lg:w-40" : "relative w-full md:w-3/12 lg:w-40"}>
          <select
            id="periodo"
            value={filterDateNumber}
            onChange={(event: ChangeEvent<HTMLSelectElement>) => setFilterDateNumber(Number(event.target.value))}
            className="bg-[#2C383F] border border-[#2C383F] text-white text-lg rounded-lg w-full pl-0 sm:pl-5 h-[46px] appearance-none text-center md:text-start outline-green-primary lg:cursor-pointer"
          >
            <option value={30} defaultChecked>
              30 Dias
            </option>
            <option value={60}>60 Dias</option>
            <option value={90}>90 Dias</option>
            <option value={120}>120 Dias</option>
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center  px-2 text-white">
            <ChevronDown size={25} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilterWrapper;

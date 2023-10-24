"use client";

import Image from "next/image";
import { Dot, Search, ChevronDown } from "lucide-react";

import Button from "@/components/Button";

import ResponsiveTable from "@/components/table/ResponsiveTable";

const DashboardPage = () => {
  const tableData = [
    {
      imageSrc: "/assets/images/profile-test.png",
      name: "John Doe",
      startDate: "18/08/2023",
      endDate: "23/08/2023",
      status: "Finalizado",
      value: "R$100.00",
    },
    {
      imageSrc: "/assets/images/profile-test.png",
      name: "Mary Doe",
      startDate: "",
      endDate: "",
      status: "A Finalizar",
      value: "R$300.00",
    },
    {
      imageSrc: "/assets/images/profile-test.png",
      name: "John Doe",
      startDate: "18/08/2023",
      endDate: "23/08/2023",
      status: "Suporte",
      value: "R$200.00",
    },
  ];
  return (
    <>
      <div className=" w-full px-6 pt-9 mx-auto md:px-16 lg:container">
        <div className="flex flex-col mt-8 gap-6 items-center md:flex-row md:gap-24 md:mt-12 md:px-14 desktop:px-[120px]">
          <div className="flex flex-col items-center md:items-start">
            <h2 className="font-normal text-[#879298] text-xl">Finalizadas</h2>
            <p className="font-medium text-4xl">10</p>
          </div>

          <div className="flex flex-col items-center md:items-start">
            <h2 className="font-normal text-[#879298] text-xl">Em Andamento</h2>
            <p className="font-medium text-4xl">10</p>
          </div>

          <div className="flex flex-col items-center md:items-start">
            <h2 className="font-normal text-[#879298] text-xl">Total</h2>
            <p className="font-medium text-4xl">10</p>
          </div>
        </div>

        <div className="w-full px-6 md:px-14 md:w-7/12 desktop:px-[120px]">
          <div className="pt-8 relative mx-auto">
            <input
              type="search"
              name="search"
              placeholder="Faça sua pesquisa aqui..."
              className="w-full border-2 border-[#C8D6DF] bg-[#C8D6DF] h-10 px-5 pr-16 rounded-lg text-md focus:outline-none"
            />
            <button type="submit" className="absolute right-0 top-6 mt-4 mr-4">
              <Search
                style={{
                  color: "#9DA5AA",
                }}
              />
            </button>
          </div>
        </div>
        <div className="flex flex-col md:flex-row w-full mt-5 px-6 md:pl-14 gap-6">
          <div className="flex w-full md:w-5/12 md:whitespace-nowrap">
            <Button label="Consultar Certificado" fullWidth primary />
          </div>

          <div className="relative w-full md:w-3/12">
            <select
              id="periodo"
              className="bg-[#2C383F] border border-[#2C383F] text-white text-lg rounded-lg w-full px-5 h-[46px] appearance-none text-center md:text-start"
            >
              <option value="30">30 Dias</option>
              <option value="60">60 Dias</option>
              <option value="90">90 Dias</option>
              <option value="120">120 Dias</option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center  px-2 text-white">
              <ChevronDown size={25} />
            </div>
          </div>
        </div>

        <ResponsiveTable data={tableData} />
      </div>
    </>
  );
};

export default DashboardPage;

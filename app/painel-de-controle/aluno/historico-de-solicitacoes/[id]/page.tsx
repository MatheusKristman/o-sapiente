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
    {
      imageSrc: "/assets/images/profile-test.png",
      name: "John Doe",
      startDate: "18/08/2023",
      endDate: "23/08/2023",
      status: "Suporte",
      value: "R$200.00",
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

  setTimeout(() => {
    // função
  }, 100);

  return (
    <>
      <div className=" w-full px-6 pt-12 mx-auto md:px-16 lg:container lg:pt-24 lg:pb-12">
        <div className="flex flex-col gap-6 items-center md:flex-row md:gap-24">
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

        <div className="flex flex-col pt-9 lg:flex-row lg:justify-between">
          <div className="w-full flex items-center justify-between h-[46px] bg-[#C8D6DF] rounded-lg px-5 peer md:w-7/12 lg:w-96">
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

          <div className="flex flex-col md:flex-row w-full mt-6 gap-6 lg:w-fit lg:mt-0">
            <div className="flex w-full md:w-5/12 md:whitespace-nowrap lg:w-fit">
              <Button onClick={() => {}} label="Consultar Certificado" fullWidth primary />
            </div>

            <div className="relative w-full md:w-3/12 lg:w-40">
              <select
                id="periodo"
                className="bg-[#2C383F] border border-[#2C383F] text-white text-lg rounded-lg w-full pl-5 h-[46px] appearance-none text-center md:text-start outline-green-primary lg:cursor-pointer">
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
        </div>

        <ResponsiveTable data={tableData} />
      </div>
    </>
  );
};

export default DashboardPage;

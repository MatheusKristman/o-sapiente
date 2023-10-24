"use client";

import Image from "next/image";
import { Dot, Search } from "lucide-react";

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
      <div className="flex flex-col mt-8 gap-6 items-center">
        <div className="flex flex-col items-center">
          <h2 className="font-normal text-[#879298] text-xl">Finalizadas</h2>
          <p className="font-medium text-4xl">10</p>
        </div>

        <div className="flex flex-col items-center">
          <h2 className="font-normal text-[#879298] text-xl">Em Andamento</h2>
          <p className="font-medium text-4xl">10</p>
        </div>

        <div className="flex flex-col items-center">
          <h2 className="font-normal text-[#879298] text-xl">Total</h2>
          <p className="font-medium text-4xl">10</p>
        </div>
      </div>

      <div className="w-full px-6">
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
      <div className="flex mt-5 px-6">
        <Button label="Consultar Certificado" fullWidth primary />
      </div>

      <ResponsiveTable data={tableData} />
    </>
  );
};

export default DashboardPage;

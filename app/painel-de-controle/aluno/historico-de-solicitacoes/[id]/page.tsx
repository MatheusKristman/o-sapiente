"use client";

import Image from "next/image";
import { Dot, Search } from "lucide-react";

import Button from "@/components/Button";

const DashboardPage = () => {
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

      <div className="px-5 py-10">
        <div className="overflow-x-auto ">
          <table className="w-full border-separate border-spacing-y-5">
            <thead>
              <tr>
                <th className="w-40 min-w-[300px] p-3 text-base font-medium tracking-wide text-left text-[#879298] whitespace-nowrap">
                  Professor
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
              <tr className="bg-white ">
                <td className="px-8 py-9   text-lg text-black whitespace-nowrap rounded-l-lg">
                  <div className="flex items-center gap-4">
                    <Image
                      src="/assets/images/profile-test.png"
                      alt="Perfil"
                      width={50}
                      height={50}
                      className="object-cover rounded-full w-20 h-20"
                    />
                    <span className="font-bold text-center">John Doe</span>
                  </div>
                </td>
                <td className="p-3 text-base text-[#879298] whitespace-nowrap">
                  16/10/2021
                </td>
                <td className="p-3 text-base text-[#879298] whitespace-nowrap">
                  16/10/2021
                </td>
                <td className="p-3 text-sm ">
                  <span className="p-2 text-base  font-medium  text-green-800 bg-green-200 rounded-lg bg-opacity-50 whitespace-nowrap">
                    Finalizado
                  </span>
                </td>
                <td className="p-3 text-lg text-black  font-bold rounded-r-lg whitespace-nowrap">
                  R$200.00
                </td>
              </tr>

              <tr className="bg-white ">
                <td className="px-8 py-9   text-lg text-black whitespace-nowrap rounded-l-lg">
                  <div className="flex items-center gap-4">
                    <Image
                      src="/assets/images/profile-test.png"
                      alt="Perfil"
                      width={50}
                      height={50}
                      className="object-cover rounded-full w-20 h-20"
                    />
                    <span className="font-bold text-center">John Doe</span>
                  </div>
                </td>
                <td className="p-3 text-base text-[#879298] whitespace-nowrap">
                  16/10/2021
                </td>
                <td className="p-3 text-base text-[#879298] whitespace-nowrap">
                  16/10/2021
                </td>
                <td className="p-3 text-sm ">
                  <span className="p-2 text-base  font-medium  text-[#8A8A8A] bg-[#E8E8E8] rounded-lg bg-opacity-50 whitespace-nowrap">
                    A Finalizar
                  </span>
                </td>
                <td className="p-3 text-lg text-black  font-bold rounded-r-lg whitespace-nowrap">
                  Combinado
                </td>
              </tr>

              <tr className="bg-white ">
                <td className="px-8 py-9   text-lg text-black whitespace-nowrap rounded-l-lg">
                  <div className="flex items-center gap-4">
                    <Image
                      src="/assets/images/profile-test.png"
                      alt="Perfil"
                      width={50}
                      height={50}
                      className="object-cover rounded-full w-20 h-20"
                    />
                    <span className="font-bold text-center">John Doe</span>
                  </div>
                </td>
                <td className="p-3 text-base text-[#879298] whitespace-nowrap">
                  16/10/2021
                </td>
                <td className="p-3 text-base text-[#879298] whitespace-nowrap">
                  16/10/2021
                </td>
                <td className="p-3 text-sm ">
                  <span className="p-2 text-base  font-medium  text-[#B93737] bg-[#FFD1D1] rounded-lg bg-opacity-50 whitespace-nowrap">
                    Suporte
                  </span>
                </td>
                <td className="p-3 text-lg text-black  font-bold rounded-r-lg whitespace-nowrap">
                  R$200.00
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default DashboardPage;

"use client";

import { useState } from "react";
import { Dot, Search, ChevronDown } from "lucide-react";

import Button from "@/components/Button";

import TopStats from "@/components/dashboard/history/TopStats";
import ResponsiveTable from "@/components/dashboard/history/ResponsiveTable";
import FilterWrapper from "@/components/dashboard/history/FilterWrapper";

export type StatsType = {
  finished: number;
  current: number;
  total: number;
};

const HistoryPage = () => {
  const [stats, setStats] = useState<StatsType>({
    finished: 10,
    current: 10,
    total: 10,
  });

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

  return (
    <div className="w-full px-6 pt-12 mx-auto md:px-16 lg:container lg:pt-24 lg:pb-12">
      <TopStats stats={stats} />

      <FilterWrapper isProfessor={false} />

      <ResponsiveTable data={tableData} type="Professor" />
    </div>
  );
};

export default HistoryPage;

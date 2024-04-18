"use client";

import { useEffect, useState } from "react";
import axios from "axios";

import TopStats from "@/components/dashboard/history/TopStats";
import ResponsiveTable from "@/components/dashboard/history/ResponsiveTable";
import FilterWrapper from "@/components/dashboard/history/FilterWrapper";
import { RequestWithUsersAndOffers } from "@/types";

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
    const [requests, setRequests] = useState<RequestWithUsersAndOffers[]>([]);

    useEffect(() => {
        axios
            .get("/api/request/get-requests")
            .then((res) => {
                setRequests(res.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

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

            <FilterWrapper isTeacher={true} />

            <ResponsiveTable requests={requests} type="Professor" />
        </div>
    );
};

export default HistoryPage;

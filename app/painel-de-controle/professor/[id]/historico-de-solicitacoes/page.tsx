import TopStats from "@/components/dashboard/history/TopStats";
import ResponsiveTable from "@/components/dashboard/history/ResponsiveTable";
import FilterWrapper from "@/components/dashboard/history/FilterWrapper";
import { RequestWithUsersAndOffers } from "@/types";
import getRequests from "@/app/action/getRequests";

export type StatsType = {
  finished: number;
  current: number;
  total: number;
};

//TODO: ajustar para receber as requests corretas

const HistoryPage = async () => {
  const requests: RequestWithUsersAndOffers[] = await getRequests();

  console.log("Requests: ", requests);

  if (!requests) {
    //TODO: inserir componente de loading
    return (
      <div>
        <div>Carregando...</div>
      </div>
    );
  }

  return (
    <div className="w-full min-h-[calc(100vh-144px)] px-6 pt-12 mx-auto md:px-16 lg:container lg:pt-24 lg:pb-12">
      <TopStats requests={requests} />

      <FilterWrapper isTeacher={true} />

      <ResponsiveTable requests={requests} type="Professor" />
    </div>
  );
};

export default HistoryPage;

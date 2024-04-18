import { RequestWithUsersAndOffers } from "@/types";
import { Status } from "@prisma/client";

interface TopStatsProps {
    requests: RequestWithUsersAndOffers[];
}

const TopStats = ({ requests }: TopStatsProps) => {
    return (
        <div className="flex flex-col gap-6 items-center md:flex-row md:gap-24">
            <div className="flex flex-col items-center md:items-start">
                <h2 className="font-normal text-[#879298] text-xl">
                    Finalizadas
                </h2>
                <p className="font-medium text-4xl">
                    {
                        requests.filter(
                            (request: RequestWithUsersAndOffers) =>
                                request.status === Status.finished,
                        ).length
                    }
                </p>
            </div>

            <div className="flex flex-col items-center md:items-start">
                <h2 className="font-normal text-[#879298] text-xl">
                    Em Andamento
                </h2>
                <p className="font-medium text-4xl">
                    {
                        requests.filter(
                            (request: RequestWithUsersAndOffers) =>
                                request.status !== Status.finished,
                        ).length
                    }
                </p>
            </div>

            <div className="flex flex-col items-center md:items-start">
                <h2 className="font-normal text-[#879298] text-xl">Total</h2>
                <p className="font-medium text-4xl">{requests.length}</p>
            </div>
        </div>
    );
};

export default TopStats;

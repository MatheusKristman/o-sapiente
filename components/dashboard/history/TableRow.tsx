import Image from "next/image";
import { format } from "date-fns";

import { RequestWithUsersAndOffers } from "@/types";
import { Status } from "@prisma/client";
import { formatPrice } from "@/libs/utils";

interface Props {
    request: RequestWithUsersAndOffers;
}

const TableRow = ({ request }: Props) => {
    const statusStyles: { [key: string]: string } = {
        finished: "text-green-800 bg-green-200 rounded-lg bg-opacity-50",
        inProgress: "text-[#8A8A8A] bg-[#E8E8E8] rounded-lg bg-opacity-50",
        searchingProfessor:
            "text-[#8A8A8A] bg-[#E8E8E8] rounded-lg bg-opacity-50",
        finishing: "text-[#8A8A8A] bg-[#E8E8E8] rounded-lg bg-opacity-50",
        Suporte: "text-[#B93737] bg-[#FFD1D1] rounded-lg bg-opacity-50",
    };

    const hasOtherUser: boolean = request.users.length === 2;
    const otherUserHasPhoto: boolean =
        hasOtherUser && request.users[1].profilePhoto !== null;

    const profileImageUrl = hasOtherUser
        ? otherUserHasPhoto
            ? request.users[1].profilePhoto!
            : "/assets/images/default-user-photo.svg"
        : "/assets/images/default-user-photo.svg";
    const profileName = hasOtherUser
        ? `${request.users[1].firstName} ${request.users[1].lastName}`
        : "Não definido";
    const startDate: Date | null = request.beginLessonDate;
    const endDate: Date | null = request.finishLessonDate;
    const status: Status = request.status;
    const price: number = request.offers[0].lessonPrice;

    return (
        <tr className="bg-white">
            <td className="px-8 py-4 text-lg text-black whitespace-nowrap rounded-l-2xl">
                <div className="flex items-center gap-4">
                    <Image
                        src={profileImageUrl}
                        alt="Perfil"
                        width={50}
                        height={50}
                        className="object-cover rounded-full w-20 h-20"
                    />
                    <span className="font-semibold text-center">
                        {profileName}
                    </span>
                </div>
            </td>

            <td className="p-4 text-base text-[#879298] whitespace-nowrap">
                {startDate ? format(startDate, "dd/MM/yyyy") : "--/--/----"}
            </td>

            <td className="p-4 text-base text-[#879298] whitespace-nowrap">
                {endDate ? format(endDate, "dd/MM/yyyy") : "--/--/----"}
            </td>

            <td className="p-4 text-sm">
                <span
                    className={`p-2 text-base font-medium whitespace-nowrap ${statusStyles[status]}`}
                >
                    {status === Status.inProgress && "Em andamento"}
                    {status === Status.support && "Suporte"}
                    {status === Status.finished && "Finalizado"}
                    {status === Status.finishing && "Finalizando"}
                    {status === Status.searchingProfessor &&
                        "Aguardando proposta"}
                </span>
            </td>

            <td className="p-4 text-lg text-black font-semibold rounded-r-2xl whitespace-nowrap">
                {formatPrice(price)}
            </td>
        </tr>
    );
};

export default TableRow;

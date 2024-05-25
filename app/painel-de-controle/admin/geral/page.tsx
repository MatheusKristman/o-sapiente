import { UsersBox } from "@/components/dashboard/admin/general/UsersBox";
import { AdminGeneralText } from "@/constants/dashboard/admin-general-br";

export default function AdminGeneralPage() {
  return (
    <div className="w-full h-full min-h-[100vh-88px] px-6 mt-4">
      <h1 className="text-2xl text-gray-primary font-semibold mb-6">{AdminGeneralText.title}</h1>

      <div className="w-full flex flex-col gap-12">
        <UsersBox />
      </div>
    </div>
  );
}

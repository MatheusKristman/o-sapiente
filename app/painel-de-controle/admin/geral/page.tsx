import { UsersBox } from "@/components/dashboard/admin/general/UsersBox";
import { RequestsBox } from "@/components/dashboard/admin/general/RequestsBox";
import { AdminGeneralText } from "@/constants/dashboard/admin-general-br";
import { UsersModal } from "@/components/dashboard/admin/general/UsersModal";
import { RequestsModal } from "@/components/dashboard/admin/general/RequestsModal";
import { SubjectsBox } from "@/components/dashboard/admin/general/SubjectsBox";
import { SubjectsModal } from "@/components/dashboard/admin/general/SubjectsModal";
import { SubjectsEditModal } from "@/components/dashboard/admin/general/SubjectsEditModal";
import { SubjectsDeleteModal } from "@/components/dashboard/admin/general/SubjectsDeleteModal";

export default function AdminGeneralPage() {
  return (
    <>
      <div className="w-full min-h-[calc(100vh-104px)] px-6 sm:px-16 lg:container lg:mx-auto mt-4 mb-12">
        <h1 className="text-2xl text-gray-primary font-semibold mb-6">
          {AdminGeneralText.title}
        </h1>

        <div className="w-full flex flex-col lg:flex-row gap-x-6 gap-y-12">
          <UsersBox />

          <div className="w-full flex flex-col gap-12">
            <RequestsBox />

            <SubjectsBox />
          </div>
        </div>
      </div>

      <UsersModal />
      <RequestsModal />
      <SubjectsModal />
      <SubjectsEditModal />
      <SubjectsDeleteModal />
    </>
  );
}

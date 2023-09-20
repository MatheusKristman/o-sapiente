import DashboardNav from "@/components/dashboard/DashboardNav";

const DashboardLayout = ({children}: {children: React.ReactNode}) => {
  return (
    <div className="w-full min-h-full flex flex-col">
      <DashboardNav />
      {children}
    </div>
  );
}

export default DashboardLayout;

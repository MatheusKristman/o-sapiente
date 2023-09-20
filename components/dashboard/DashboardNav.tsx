"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

import { menuItems } from "@/constants/dashboard/dashboard-nav-br";
import useHeaderStore from "@/stores/useHeaderStore";

const DashboardNav = () => {
  const { accountType, userId } = useHeaderStore();

  const linkInactiveClass = "bg-green-primary text-white";
  const linkActiveClass = "bg-white text-green-primary";

  const pathname = usePathname();
  const router = useRouter();

  console.log(pathname);

  function handleNavigation(type: string, index: number) {
    if (type === "Student") {
      const href = menuItems[index].studentHref; 

      if (href !== "") {
        router.push(href + userId);
      }
    }

    if (type === "Professor") {
      const href = menuItems[index].professorHref;

      if (href !== "") {
        router.push(href + userId);
      }
    }
  }

  return (
    <nav className="w-full bg-green-primary">
      <div className="w-full px-6 mx-auto md:px-16 lg:container">
        <ul className="w-full flex items-center justify-between">
          {menuItems.map((item, index) => (
            <li onClick={() => handleNavigation(accountType!, index)} className={`p-4 flex itens-center gap-2 cursor-pointer transition-colors ${pathname.includes(item.studentHref) && item.studentHref !== "" ? linkActiveClass : linkInactiveClass} hover:bg-white hover:text-green-primary`}>
              <item.icon />
              <span>{item.label}</span>
            </li>
          ))}
        </ul>
      </div>
    </nav> 
  );
}

export default DashboardNav;

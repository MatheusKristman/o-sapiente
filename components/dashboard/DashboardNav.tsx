"use client";

import { usePathname, useRouter } from "next/navigation";

import { menuItems } from "@/constants/dashboard/dashboard-nav-br";
import useHeaderStore from "@/stores/useHeaderStore";
import { cn } from "@/libs/utils";

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
          {pathname.includes("professor")
            ? menuItems.map((item, index) => (
                <li
                  key={item.label}
                  onClick={() => handleNavigation(accountType!, index)}
                  className={cn(
                    "p-4 flex items-center gap-2 cursor-pointer transition-colors hover:bg-white hover:text-green-primary",
                    pathname.includes(item.professorHref) && item.professorHref !== ""
                      ? linkActiveClass
                      : linkInactiveClass,
                  )}
                >
                  <item.icon className="h-fit w-fit" />
                  <span
                    className={cn(
                      "hidden md:block",
                      pathname.includes(item.professorHref) && item.professorHref !== ""
                        ? "md:block lg:block"
                        : "md:hidden lg:block",
                    )}
                  >
                    {item.label}
                  </span>
                </li>
              ))
            : null}
          {pathname.includes("aluno")
            ? menuItems.map((item, index) => (
                <li
                  key={item.label}
                  onClick={() => handleNavigation(accountType!, index)}
                  className={cn(
                    "p-4 flex items-center gap-2 cursor-pointer transition-colors hover:bg-white hover:text-green-primary",
                    pathname.includes(item.studentHref) && item.studentHref !== ""
                      ? linkActiveClass
                      : linkInactiveClass,
                  )}
                >
                  <item.icon className="h-fit w-fit" />
                  <span
                    className={cn(
                      "hidden md:block",
                      pathname.includes(item.studentHref) && item.studentHref !== ""
                        ? "md:block lg:block"
                        : "md:hidden lg:block",
                    )}
                  >
                    {item.label}
                  </span>
                </li>
              ))
            : null}
        </ul>
      </div>
    </nav>
  );
};

export default DashboardNav;

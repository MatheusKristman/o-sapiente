"use client";

import { useEffect } from "react";
import Image from "next/image";
import { BsXLg } from "react-icons/bs";
import { AnimatePresence, motion } from "framer-motion";
import { useSession, signOut } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";
import { LogOut } from "lucide-react";

import { Button } from "@/components/ui/button";
import { navLinks, professorHeaderButton, studentHeaderButton, headerTexts } from "@/constants/header-br";
import { mobileMenuAnimation } from "@/constants/framer-animations/header";
import useHeaderStore from "@/stores/useHeaderStore";
import useLoginModalStore from "@/stores/useLoginModalStore";
import useProfessorModalStore from "@/stores/useProfessorModalStore";
import { menuItems } from "@/constants/dashboard/dashboard-nav-br";
import useUserStore from "@/stores/useUserStore";

const HeaderMobile = () => {
  const { isMobileMenuOpen, closeMobileMenu } = useHeaderStore();
  const { accountType, userId } = useUserStore();
  const { openModal, setToLogin } = useLoginModalStore();

  const session = useSession();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflowY = "hidden";
    } else {
      setTimeout(() => {
        document.body.style.overflowY = "unset";
      }, 450);
    }
  }, [isMobileMenuOpen]);

  function scrollTo(id: string) {
    if (pathname !== "/") {
      closeMobileMenu();

      setTimeout(() => {
        router.push("/");
      }, 500);

      return;
    }

    if (id === "cursos") {
      closeMobileMenu();

      setTimeout(() => {
        router.push("/cursos");
      }, 500);

      return;
    }

    closeMobileMenu();
    const element = document.getElementById(id);

    if (element) {
      setTimeout(() => {
        element.scrollIntoView({ behavior: "smooth" });
      }, 500);
    }
  }

  function openLoginModal() {
    closeMobileMenu();

    setTimeout(() => {
      openModal();
      setToLogin();
    }, 500);
  }

  // function handleDashboardStudentBtn() {
  //   closeMobileMenu();

  //   setTimeout(() => {
  //     router.push(`${menuItems[0].studentHref}${userId}${menuItems[0].pageHref}`);
  //   }, 500);
  // }

  // function handleDashboardProfessorBtn() {
  //   //TODO: alterar todas as rotas para texto literal
  //   closeMobileMenu();

  //   setTimeout(() => {
  //     router.push(`${menuItems[0].professorHref}${userId}${menuItems[0].pageHref}`);
  //   }, 500);
  // }

  function handleProfessorRegister() {
    closeMobileMenu();

    setTimeout(() => {
      router.push("/cadastro/professor");
    }, 500);
  }

  async function handleLogOut() {
    closeMobileMenu();

    const data = await signOut({ redirect: false, callbackUrl: "/" });

    router.replace(data.url);
  }

  return (
    <>
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            variants={mobileMenuAnimation}
            initial="offscreen"
            animate="onscreen"
            exit="exit"
            className="bg-green-primary rounded-lg py-8 pl-6 pr-8 flex xl:hidden flex-col items-end justify-between gap-y-8 w-fit absolute right-0 top-0 z-[9999] h-full max-h-[calc(452px+32px+32px)]"
          >
            <Button
              variant="link"
              size="icon"
              type="button"
              onClick={closeMobileMenu}
              className="text-white cursor-pointer"
            >
              <BsXLg size={26} />
            </Button>

            <nav className="overflow-y-auto flex flex-col gap-y-12">
              <ul className="xl:hidden flex flex-col items-end justify-between gap-y-6">
                {navLinks.map((link) => (
                  <li
                    key={link.href}
                    onClick={() => scrollTo(link.href)}
                    className="text-white cursor-pointer text-lg whitespace-nowrap"
                  >
                    {link.label}
                  </li>
                ))}
              </ul>

              <div className="xl:hidden flex flex-col items-end justify-center gap-y-4 w-full">
                {session.status === "authenticated" ? (
                  <>
                    <Button
                      variant="link"
                      size="sm"
                      type="button"
                      onClick={handleLogOut}
                      className="px-0 flex gap-2 items-center justify-center text-white text-lg"
                    >
                      <LogOut className="h-6 w-6" />
                      {headerTexts.logoutBtn}
                    </Button>

                    <Button
                      variant="secondary"
                      type="button"
                      onClick={() => {}}
                      className="flex gap-2 items-center justify-center"
                    >
                      <Image
                        src="/assets/icons/user-green.svg"
                        alt="Usuário"
                        width={24}
                        height={24}
                        className="object-contain"
                      />
                      {headerTexts.dashboardBtn}
                    </Button>
                  </>
                ) : (
                  <>
                    <Button variant="secondary" className="w-full" onClick={handleProfessorRegister}>
                      {headerTexts.professorRegister}
                    </Button>

                    <Button variant="secondary" className="w-full" onClick={openLoginModal}>
                      {headerTexts.loginBtn}
                    </Button>
                  </>
                )}
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default HeaderMobile;

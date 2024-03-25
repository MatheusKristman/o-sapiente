"use client";

import { useEffect } from "react";
import Image from "next/image";
import { BsXLg } from "react-icons/bs";
import { AnimatePresence, motion } from "framer-motion";
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import {
  navLinks,
  professorHeaderButton,
  studentHeaderButton,
} from "@/constants/header-br";
import { mobileMenuAnimation } from "@/constants/framer-animations/header";
import useHeaderStore from "@/stores/useHeaderStore";
import useStudentModalStore from "@/stores/useStudentModalStore";
import { LogOut } from "lucide-react";
import useProfessorModalStore from "@/stores/useProfessorModalStore";
import { menuItems } from "@/constants/dashboard/dashboard-nav-br";

const HeaderMobile = () => {
  const { isMobileMenuOpen, closeMobileMenu, accountType, userId } =
    useHeaderStore();
  const { openModal: openStudentModal, setToRegister } = useStudentModalStore();
  const { openModal: openProfessorModal } = useProfessorModalStore();

  const session = useSession();
  const router = useRouter();

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
    closeMobileMenu();
    const element = document.getElementById(id);

    if (element) {
      setTimeout(() => {
        element.scrollIntoView({ behavior: "smooth" });
      }, 500);
    }
  }

  function openStudentRegisterModal() {
    closeMobileMenu();

    setTimeout(() => {
      openStudentModal();
      setToRegister();
    }, 500);
  }

  function handleDashboardStudentBtn() {
    closeMobileMenu();

    setTimeout(() => {
      router.push(
        `${menuItems[0].studentHref}${userId}${menuItems[0].pageHref}`
      );
    }, 500);
  }

  function openProfessorLoginModal() {
    closeMobileMenu();

    setTimeout(() => {
      openProfessorModal();
    }, 500);
  }

  function handleDashboardProfessorBtn() {
    closeMobileMenu();

    setTimeout(() => {
      router.push(
        `${menuItems[0].professorHref}${userId}${menuItems[0].pageHref}`
      );
    }, 500);
  }

  async function handleLogOut() {
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
            className="bg-green-primary rounded-lg py-8 pl-6 pr-8 flex lg:hidden flex-col items-end justify-between gap-y-8 w-fit absolute right-0 top-0 z-[9999]"
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

            <nav>
              <ul className="lg:hidden flex flex-col items-end justify-between gap-y-6">
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
            </nav>

            <div className="lg:hidden flex flex-col items-end justify-center gap-y-4 w-full">
              {session.status === "authenticated" ? (
                accountType === "Student" ? (
                  <>
                    <Button
                      variant="link"
                      type="button"
                      onClick={handleLogOut}
                      className="flex gap-2 items-center justify-center text-white text-lg"
                    >
                      <LogOut className="h-6 w-6" />
                      Sair
                    </Button>

                    <Button
                      variant="secondary"
                      type="button"
                      onClick={handleDashboardStudentBtn}
                      className="flex gap-2 items-center justify-center"
                    >
                      <Image
                        src="/assets/icons/user-green.svg"
                        alt="Usuário"
                        width={24}
                        height={24}
                        className="object-contain"
                      />
                      Área do Aluno
                    </Button>
                  </>
                ) : accountType === "Professor" ? (
                  <>
                    <Button
                      variant="link"
                      size="icon"
                      type="button"
                      onClick={handleLogOut}
                      className="flex gap-2 items-center justify-center text-white text-lg"
                    >
                      <LogOut className="h-6 w-6" />
                      Sair
                    </Button>

                    <Button
                      variant="secondary"
                      type="button"
                      onClick={handleDashboardProfessorBtn}
                      className="flex gap-2 items-center justify-center"
                    >
                      <Image
                        src="/assets/icons/user-green.svg"
                        alt="Usuário"
                        width={24}
                        height={24}
                        className="object-contain"
                      />
                      Área do Professor
                    </Button>
                  </>
                ) : null
              ) : (
                <>
                  <Button
                    variant="outline"
                    className="w-full"
                    onClick={openProfessorLoginModal}
                  >
                    {professorHeaderButton.label}
                  </Button>

                  <Button
                    variant="secondary"
                    className="w-full"
                    onClick={openStudentRegisterModal}
                  >
                    {studentHeaderButton.label}
                  </Button>
                </>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default HeaderMobile;

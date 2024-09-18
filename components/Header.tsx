"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { IoIosMenu } from "react-icons/io";
import { useSession, signOut } from "next-auth/react";
import axios from "axios";
import { useRouter, usePathname } from "next/navigation";
import { LogOut } from "lucide-react";

import { navLinks, headerTexts } from "@/constants/header-br";
import { Button } from "@/components/ui/button";
import useHeaderStore from "@/stores/useHeaderStore";
import useLoginModalStore from "@/stores/useLoginModalStore";
import useProfessorModalStore from "@/stores/useProfessorModalStore";
import { menuItems } from "@/constants/dashboard/dashboard-nav-br";
import { cn } from "@/libs/utils";
import useUserStore from "@/stores/useUserStore";
import { roundToNearestMinutes } from "date-fns";

const Header = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { isMobileMenuOpen, openMobileMenu } = useHeaderStore();
  const { accountType, setAccountType, userId, setUserId } = useUserStore();
  const { openModal, setToLogin } = useLoginModalStore();

  const session = useSession();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (session) {
      setIsLoading(true);

      axios
        .get("/api/user/get-user")
        .then((res) => {
          setAccountType(res.data.type);
          setUserId(res.data.id);
        })
        .catch((error) => console.error(error))
        .finally(() => {
          setIsLoading(false);
        });
    }
  }, [session, setAccountType, setUserId, setIsLoading]);

  function scrollTo(id: string) {
    if (pathname !== "/") {
      router.push("/");

      return;
    }

    if (id === "cursos") {
      router.push("/cursos");

      return;
    }

    setTimeout(() => {
      const element = document.getElementById(id);

      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "center" });
      }
    }, 100);
  }

  function openLoginModal() {
    openModal();
    setToLogin();
  }

  function handleDashboardBtn() {
    if (session.status === "authenticated" && userId) {
      if (accountType === "ADMIN") {
        router.push("/painel-de-controle/admin/geral");
      }

      if (accountType === "PROFESSOR") {
        router.push(`/painel-de-controle/professor/${userId}/resumo`);
      }

      if (accountType === "STUDENT") {
        router.push(`/painel-de-controle/aluno/${userId}/resumo`);
      }
    }
  }

  async function handleLogOut() {
    const data = await signOut({ redirect: false, callbackUrl: "/" });

    router.replace(data.url);
  }

  return (
    <header className="lg:container mx-auto py-5 px-6 md:px-16 flex justify-between items-center gap-4 w-full lg:w-auto">
      <Link href="/">
        <Image
          src="/assets/images/logo-colored.svg"
          alt="O Sapiente"
          width={160}
          height={30}
          priority
          className="object-contain"
        />
      </Link>

      <Button
        variant="link"
        size="icon"
        type="button"
        disabled={isLoading}
        onClick={openMobileMenu}
        className={cn(
          "flex xl:hidden items-center justify-center cursor-pointer",
          {
            "opacity-0 pointer-events-none": isMobileMenuOpen,
          },
        )}
      >
        <IoIosMenu size={35} className="text-green-primary" />
      </Button>

      {pathname === "/" && (
        <ul className="hidden xl:flex items-center justify-between gap-x-12">
          {navLinks.map((link) => (
            <li
              key={link.href}
              onClick={() => scrollTo(link.href)}
              className="text-gray-primary cursor-pointer text-base xl:text-base hover:opacity-70 transition duration-200 whitespace-nowrap"
            >
              {link.label}
            </li>
          ))}
        </ul>
      )}

      <div className="hidden xl:flex items-center justify-center gap-x-6">
        {session.status === "authenticated" ? (
          <>
            <Button
              variant="link"
              size="sm"
              type="button"
              disabled={isLoading}
              onClick={handleLogOut}
              className="flex gap-2 items-center justify-center text-green-primary text-base"
            >
              <LogOut className="h-6 w-6" />
              {headerTexts.logoutBtn}
            </Button>

            <Button
              type="button"
              disabled={isLoading}
              onClick={handleDashboardBtn}
              className="bg-green-primary flex gap-2 items-center justify-center text-white text-base px-7 py-2 rounded-lg cursor-pointer transition hover:brightness-90"
            >
              <Image
                src="/assets/icons/user.svg"
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
            <Button variant="outline" disabled={isLoading} asChild>
              <Link href="/cadastro/professor">
                {headerTexts.professorRegister}
              </Link>
            </Button>

            <Button disabled={isLoading} onClick={openLoginModal}>
              {headerTexts.loginBtn}
            </Button>
          </>
        )}
      </div>
    </header>
  );
};

export default Header;

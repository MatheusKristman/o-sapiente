"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { IoIosMenu } from "react-icons/io";
import { useSession, signOut } from "next-auth/react";
import axios from "axios";
import { useRouter, usePathname } from "next/navigation";
import { LogOut } from "lucide-react";

import { navLinks, professorHeaderButton, studentHeaderButton } from "@/constants/header-br";
import Button from "./Button";
import useHeaderStore from "@/stores/useHeaderStore";
import useStudentModalStore from "@/stores/useStudentModalStore";
import useProfessorModalStore from "@/stores/useProfessorModalStore";
import { menuItems } from "@/constants/dashboard/dashboard-nav-br";

const Header = () => {
  const { isMobileMenuOpen, openMobileMenu, accountType, setAccountType, userId, setUserId } =
    useHeaderStore();
  const { openModal: openStudentModal, setToRegister } = useStudentModalStore();
  const { openModal: openProfessorModal } = useProfessorModalStore();

  const session = useSession();
  const router = useRouter();
  const pathname = usePathname();

  console.log(session);

  useEffect(() => {
    if (session) {
      axios
        .get("/api/user/get-user")
        .then((res) => {
          setAccountType(res.data.type);
          setUserId(res.data.id);
          console.log(res);
        })
        .catch((error) => console.error(error));
    }
  }, [session, setAccountType, setUserId]);

  function scrollTo(id: string) {
    if (pathname !== "/") {
      router.push("/");
    }

    setTimeout(() => {
      const element = document.getElementById(id);

      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "center" });
      }
    }, 100);
  }

  function openStudentRegisterModal() {
    openStudentModal();
    setToRegister();
  }

  function openProfessorLoginModal() {
    openProfessorModal();
  }

  function handleDashboardStudentBtn() {
    if (session.status === "authenticated" && userId) {
      router.push(`${menuItems[0].studentHref}${userId}`);
    }
  }

  function handleDashboardProfessorBtn() {
    if (session.status === "authenticated" && userId) {
      router.push(`${menuItems[0].professorHref}${userId}`);
    }
  }

  function handleLogOut() {
    signOut();
  }

  return (
    <header className="lg:container mx-auto py-5 px-6 md:px-16 flex justify-between items-center w-full lg:w-auto">
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

      <button
        type="button"
        onClick={openMobileMenu}
        className={`flex lg:hidden ${
          isMobileMenuOpen && "opacity-0 pointer-events-none"
        } items-center justify-center cursor-pointer`}
      >
        <IoIosMenu size={35} className="text-green-primary" />
      </button>

      <ul className="hidden lg:flex items-center justify-between gap-x-12">
        {navLinks.map((link) => (
          <li
            key={link.href}
            onClick={() => scrollTo(link.href)}
            className="text-gray-primary cursor-pointer text-base xl:text-lg hover:opacity-70 transition duration-200 whitespace-nowrap"
          >
            {link.label}
          </li>
        ))}
      </ul>

      <div className="hidden lg:flex items-center justify-center gap-x-6">
        {session.status === "authenticated" ? (
          accountType === "Student" ? (
            <>
              <button
                type="button"
                onClick={handleLogOut}
                className="flex gap-2 items-center justify-center text-green-primary text-lg"
              >
                <LogOut className="h-6 w-6" />
                Sair
              </button>

              <button
                type="button"
                onClick={handleDashboardStudentBtn}
                className="bg-green-primary flex gap-2 items-center justify-center text-white text-lg px-7 py-2 rounded-lg cursor-pointer transition hover:brightness-90"
              >
                <Image
                  src="/assets/icons/user.svg"
                  alt="Usuário"
                  width={24}
                  height={24}
                  className="object-contain"
                />
                Área do Aluno
              </button>
            </>
          ) : accountType === "Professor" ? (
            <>
              <button
                type="button"
                onClick={handleLogOut}
                className="flex gap-2 items-center justify-center text-green-primary text-lg"
              >
                <LogOut className="h-6 w-6" />
                Sair
              </button>

              <button
                type="button"
                onClick={handleDashboardProfessorBtn}
                className="bg-green-primary flex gap-2 items-center justify-center text-white text-lg px-7 py-2 rounded-lg cursor-pointer transition hover:brightness-90"
              >
                <Image
                  src="/assets/icons/user.svg"
                  alt="Usuário"
                  width={24}
                  height={24}
                  className="object-contain"
                />
                Área do Professor
              </button>
            </>
          ) : null
        ) : (
          <>
            <Button
              secondary
              label={professorHeaderButton.label}
              onClick={openProfessorLoginModal}
            />

            <Button primary label={studentHeaderButton.label} onClick={openStudentRegisterModal} />
          </>
        )}
      </div>
    </header>
  );
};

export default Header;

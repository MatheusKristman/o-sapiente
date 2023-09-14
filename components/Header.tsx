"use client";

import Image from "next/image";
import Link from "next/link";
import { IoIosMenu } from "react-icons/io";

import {
  navLinks,
  professorHeaderButton,
  studentHeaderButton,
} from "@/constants/header-br";
import Button from "./Button";
import useHeaderStore from "@/stores/useHeaderStore";
import useStudentModalStore from "@/stores/useStudentModalStore";

const Header = () => {
  const { isMobileMenuOpen, openMobileMenu } = useHeaderStore();
  const { openModal, setToRegister } = useStudentModalStore();

  function scrollTo(id: string) {
    const element = document.getElementById(id);

    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }

  function openStudentRegisterModal() {
    openModal();
    setToRegister();
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
        <Button
          secondary
          label={professorHeaderButton.label}
          onClick={() => {}}
        />

        <Button
          primary
          label={studentHeaderButton.label}
          onClick={openStudentRegisterModal}
        />
      </div>
    </header>
  );
};

export default Header;

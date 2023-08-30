"use client";

import Image from "next/image";
import { IoIosMenu } from "react-icons/io";

import {
  navLinks,
  professorHeaderButton,
  studentHeaderButton,
} from "@/constants/header-br";
import Button from "./Button";
import useHeaderStore from "@/stores/useHeaderStore";

const Header = () => {
  const { isMobileMenuOpen, openMobileMenu } = useHeaderStore();

  return (
    <header className="lg:container mx-auto py-5 px-6 md:px-16 flex justify-between items-center w-full lg:w-auto">
      <Image
        src="/assets/images/logo-colored.svg"
        alt="O Sapiente"
        width={160}
        height={30}
        priority
        className="object-contain"
      />

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
            className="text-gray-primary cursor-pointer text-base xl:text-lg hover:opacity-70 transition duration-200 whitespace-nowrap"
          >
            <a href={link.href} className="no-underline">
              {link.label}
            </a>
          </li>
        ))}
      </ul>

      <div className="hidden lg:flex items-center justify-center gap-x-6">
        <Button
          secondary
          label={professorHeaderButton.label}
          onClick={() => {}}
        />

        <Button primary label={studentHeaderButton.label} onClick={() => {}} />
      </div>
    </header>
  );
};

export default Header;

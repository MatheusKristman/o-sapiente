"use client";

import { useRouter } from "next/navigation";

import { footerLinks } from "@/constants/footer-br";

const FooterLinks = () => {
  const router = useRouter();

  function scrollTo(id: string) {
    if (id.includes("/")) {
      router.push(id);
      return;
    }

    const element = document.getElementById(id);

    if (element) {
      if (window.innerWidth >= 1024) {
        element.scrollIntoView({ behavior: "smooth", block: "center" });
      } else {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  }

  return (
    <ul className="w-full flex flex-col items-center justify-center gap-5 py-5 px-6 sm:flex-wrap sm:flex-row sm:gap-x-12 sm:gap-y-6 md:px-16 list-none">
      {footerLinks.map((item) => (
        <li
          key={item.label}
          onClick={() => scrollTo(item.href)}
          className="text-lg text-white text-center hover:opacity-70 transition-opacity cursor-pointer">
          {item.label}
        </li>
      ))}
    </ul>
  );
};

export default FooterLinks;

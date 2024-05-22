import Image from "next/image";

import FooterLinks from "./FooterLinks";

const Footer = () => {
  return (
    <footer className="w-full bg-[#37474F]">
      <div className="mx-auto lg:px-16 lg:container">
        <div className="w-full flex items-center justify-center py-4 border-b-2 border-[#5A727D]">
          <Image
            src="/assets/images/logo-white.svg"
            width={145}
            height={30}
            alt="O Sapiente"
            className="object-contain"
          />
        </div>

        <FooterLinks />
      </div>

      <div className="w-full bg-[#26343A]">
        <div className="w-full flex flex-col items-center justify-center gap-5 py-5 px-6 mx-auto sm:flex-row sm:justify-between md:px-16 lg:container">
          <span className="text-white text-base">O Sapiente © 2023</span>

          <a href="https://www.mkdevsolutions.com/" target="_blank" rel="noreferrer noopener">
            <Image src="/assets/images/mkdev.svg" alt="MKDev" width={80} height={30} className="object-contain" />
          </a>

          <a href="#" target="_blank" rel="noreferrer noopener" className="flex w-fit">
            <Image
              src="/assets/images/agencia-dev-logo.png"
              alt="Agencia Dev"
              width={160}
              height={30}
              className="object-contain"
            />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

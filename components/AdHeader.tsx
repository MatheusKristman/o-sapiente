"use client";

import { usePathname, useRouter } from "next/navigation";

import { cn } from "@/libs/utils";

export default function AdHeader() {
  const router = useRouter();
  const pathname = usePathname();

  function scrollTo(id: string) {
    if (pathname !== "/") {
      router.push("/");
    }

    setTimeout(() => {
      const element = document.getElementById(id);

      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }, 100);
  }

  return (
    <section
      className={cn(
        "w-full bg-green-primary/20 py-4",
        pathname !== "/" && "hidden",
      )}
    >
      <div className="w-full px-6 flex items-center justify-center sm:px-16">
        <span className="text-sm text-gray-primary text-center sm:text-base">
          Explore nossos cursos de Direito Constitucional - 2° Fase para OAB!{" "}
          <strong
            onClick={() => scrollTo("cursos")}
            className="font-medium underline cursor-pointer"
          >
            Inscreva-se
          </strong>{" "}
          agora e aprimore seus conhecimentos com especialistas na área.
        </span>
      </div>
    </section>
  );
}

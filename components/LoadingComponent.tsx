import Image from "next/image";

export function LoadingComponent() {
  return (
    <div className="h-[calc(100vh-88px)] w-full flex items-center justify-center">
      <div className="w-full flex flex-col items-center justify-center gap-6">
        <Image
          alt="loading"
          src="/assets/icons/logo-green-icon.svg"
          width={135}
          height={213.25}
          className="object-contain object-center animate-pulse mr-7"
        />

        <span className="font-semibold text-center text-green-primary text-lg">
          Carregando...
        </span>
      </div>
    </div>
  );
}

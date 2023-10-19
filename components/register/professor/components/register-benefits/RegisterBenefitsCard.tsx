import Image from "next/image";

interface RegisterBenefitsCardProps {
  title: string;
  desc: string;
  index: number;
}

const RegisterBenefitsCard = ({ title, desc, index }: RegisterBenefitsCardProps) => {
  return (
    <div className="w-full max-w-[250px] flex flex-col items-center gap-6 md:last:max-w-lg lg:max-w-lg">
      <div className="relative w-14 h-14">
        <Image
          src={`/assets/icons/register-benefits-${index + 1}.svg`}
          alt={title}
          fill
          className="object-contain"
        />
      </div>
      <div className="w-full flex flex-col items-center gap-4">
        <h3 className="text-xl text-gray-primary font-semibold text-center">{title}</h3>
        <p className="text-base text-gray-primary text-center max-w-[250px]">{desc}</p>
      </div>
    </div>
  );
};

export default RegisterBenefitsCard;

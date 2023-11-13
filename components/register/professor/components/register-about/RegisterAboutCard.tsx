import Image from "next/image";

const RegisterAboutCard = ({
  index,
  step,
  title,
  desc,
}: {
  index: number;
  step: string;
  title: string;
  desc: string;
}) => {
  return (
    <div
      className={`w-full flex flex-col gap-6 items-center lg:gap-20 lg:justify-center ${
        index % 2 !== 0 ? "lg:flex-row-reverse" : "lg:flex-row"
      }`}
    >
      <div className="relative w-[250px] h-[250px] min-w-[250px] min-h-[250px] md:w-[350px] md:min-w-[350px] md:h-[350px] md:min-h-[350px]">
        <Image
          src={`/assets/images/register-about-${step}.svg`}
          alt="Faça seu cadastro"
          fill
          className="object-contain"
        />
      </div>
      <div className="w-full flex flex-col items-center gap-4 lg:items-start lg:w-fit">
        <div className="flex items-center justify-center gap-4">
          <span className="hidden w-6 text-2xl text-green-primary text-center font-semibold bg-registerStepShadow bg-no-repeat bg-contain bg-[0%_65%] md:block">
            {step}
          </span>
          <h3 className="text-xl text-gray-primary font-semibold text-center lg:text-left">
            {title}
          </h3>
        </div>
        <p className="text-base text-gray-primary text-center lg:text-left lg:max-w-2xl">{desc}</p>
      </div>
    </div>
  );
};

export default RegisterAboutCard;

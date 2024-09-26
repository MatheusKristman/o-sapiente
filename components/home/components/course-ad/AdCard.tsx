import Link from "next/link";
import Image from "next/image";
import { MoveRight } from "lucide-react";
import { motion } from "framer-motion";

import { courseAdInfo } from "@/constants/courseAd-br";
import { Button } from "@/components/ui/button";
import { cn } from "@/libs/utils";
import { leftCardAnimation, rightCardAnimation } from "@/constants/framer-animations/course-ad";

interface Props {
  title: string;
  price: number;
  themes?: string[];
  benefits: string[];
  isRight?: boolean;
  courseId: string;
}

export function AdCard({ title, price, themes, benefits, isRight, courseId }: Props) {
  return (
    <motion.div
      initial="offscreen"
      whileInView="onscreen"
      viewport={{ once: true, amount: 0.1 }}
      variants={isRight ? rightCardAnimation : leftCardAnimation}
      className={cn("w-full px-9 py-10 bg-white rounded-2xl shadow-lg flex flex-col gap-10", {
        "right-card-animation": isRight,
        "left-card-animation": !isRight,
      })}
    >
      <div className="w-full flex flex-col items-center gap-6">
        <h3 className="text-2xl text-gray-primary font-semibold text-center">{title}</h3>

        <div className="w-full flex flex-col items-center gap-6">
          <div className="w-full flex flex-col items-center">
            <span className="text-base text-gray-primary/60 text-center font-medium !leading-none">
              {courseAdInfo.adCardPriceBox[0]}
            </span>

            <div className="flex gap-1 items-end">
              <span className="text-lg text-green-primary mb-1">{courseAdInfo.adCardPriceBox[1]}</span>

              <span className="text-green-primary text-3xl font-semibold">
                {(price / 100).toString().replace(".", ",")}
              </span>
            </div>

            <span className="text-base text-gray-primary/60 text-center font-medium !leading-none">
              {courseAdInfo.adCardPriceBox[2]}
            </span>
          </div>

          <div className="w-full flex flex-col gap-6 items-center">
            <Button asChild className="w-full">
              <Link href={`/pagamento-do-curso/${courseId}`}>{courseAdInfo.paymentButton}</Link>
            </Button>

            <Button variant="outline" asChild className="w-full flex items-center gap-2">
              <a
                href={`https://wa.me/557996475310?text=Ol%C3%A1,%20gostaria%20de%20tirar%20d%C3%BAvidas%20sobre%20o%20curso%20${encodeURIComponent(
                  title
                )}`}
                rel="noreferrer noopener"
                target="_blank"
              >
                <Image src="/assets/icons/whatsapp.svg" alt="Whatsapp" width={25} height={25} />
                {courseAdInfo.contactButton}
              </a>
            </Button>
          </div>
        </div>
      </div>

      <div className="w-full h-px bg-gray-primary/10" />

      <div className="w-full flex flex-col gap-6 items-center">
        {themes ? (
          <div className="w-full flex flex-col gap-5 items-center">
            <h3 className="text-center text-gray-primary font-semibold text-xl">{courseAdInfo.themesTitle}</h3>

            <div className="w-full grid grid-cols-1 gap-4 lg:grid-cols-2">
              {themes.map((theme, index) => (
                <div key={index} className="flex items-start gap-4">
                  <MoveRight className="text-green-primary w-5 h-5 flex-shrink-0 mt-1" />

                  <span className="text-base text-gray-primary font-medium">{theme}</span>
                </div>
              ))}
            </div>
          </div>
        ) : null}

        <div className="border-2 border-green-primary rounded-2xl bg-transparent p-5 flex flex-col items-center gap-5">
          <h3 className="text-lg font-semibold text-green-primary text-center">{courseAdInfo.benefitsTitle}</h3>

          <div
            className={cn("w-full grid grid-cols-1 gap-2 lg:grid-cols-2", {
              "lg:grid-cols-1": themes === undefined,
            })}
          >
            {benefits.map((benefit, index) => (
              <div key={index} className="flex items-start gap-4">
                <MoveRight className="text-green-primary w-5 h-5 flex-shrink-0 mt-1" />

                <span className="text-base text-gray-primary font-medium">{benefit}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

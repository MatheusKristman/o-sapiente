import clsx, { ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatPrice(
  price: number | string,
  options: {
    currency?: "BRL";
    notation?: Intl.NumberFormatOptions["notation"];
  } = {},
) {
  const { currency = "BRL" } = options;

  const numericPrice =
    Math.floor((typeof price === "string" ? parseFloat(price) : price) * 100) /
    100;

  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency,
    maximumFractionDigits: 2,
  }).format(numericPrice);
}

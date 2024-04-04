import { z } from "zod";

export const offerSchema = z.object({
  lessonDate: z.date(),
  lessonPrice: z.number(),
  details: z
    .string()
    .min(20, { message: "Detalhes precisam ter pelo menos 20 caracteres" }),
});

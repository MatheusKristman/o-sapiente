import { z } from "zod";

export const offerSchema = z.object({
  lessonDate: z.date({
    required_error: "Favor selecionar uma data para aula",
  }),
  lessonPrice: z.number(),
  details: z
    .string()
    .min(20, { message: "Detalhes precisam ter pelo menos 20 caracteres" }),
});

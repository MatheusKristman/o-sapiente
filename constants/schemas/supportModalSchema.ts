import { z } from "zod";

export const supportModalSchema = z.object({
  subject: z.string().min(5, "Assunto precisa ter no mínimo de 5 caracteres"),
  message: z.string().min(20, "Mensagem precisa no mínimo de 20 caracteres"),
});

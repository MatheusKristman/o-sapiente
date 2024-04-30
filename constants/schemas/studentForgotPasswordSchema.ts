import { z } from "zod";

const studentForgotPasswordSchema = z.object({
  email: z
    .string()
    .email("E-mail inválido")
    .min(1, { message: "E-mail é obrigatório" }),
});

export default studentForgotPasswordSchema;

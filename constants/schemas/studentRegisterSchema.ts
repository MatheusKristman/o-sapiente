import { z } from "zod";

const studentRegisterSchema = z
  .object({
    firstName: z.string().min(3, { message: "Nome é obrigatório" }),
    lastName: z.string().min(3, { message: "Sobrenome é obrigatório" }),
    email: z
      .string()
      .email("E-mail inválido, verifique e tente novamente")
      .min(1, { message: "E-mail é obrigatório" }),
    tel: z
      .string()
      .min(1, { message: "Telefone é obrigatório" })
      .refine((val) => val.match(/^\(\d{2}\)\s\d{4,5}-\d{4}$/), {
        message: "Telefone inválido",
      }),
    password: z.string().min(6, { message: "Senha é obrigatória" }),
    passwordConfirm: z
      .string()
      .min(6, { message: "Confirmação da senha é obrigatória" }),
  })
  .superRefine(({ password, passwordConfirm }, ctx) => {
    if (passwordConfirm !== password) {
      ctx.addIssue({
        path: ["passwordConfirm"],
        code: "custom",
        message: "As senhas não se coincidem, verifique e tente novamente",
      });
    }
  });

export default studentRegisterSchema;

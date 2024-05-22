import { z } from "zod";

const professorRegisterSchema = z
  .object({
    firstName: z
      .string({
        required_error: "Nome é obrigatório",
      })
      .min(3, "Nome é obrigatório"),
    lastName: z
      .string({
        required_error: "Sobrenome é obrigatório",
      })
      .min(3, "Sobrenome é obrigatório"),
    email: z
      .string({
        required_error: "E-mail é obrigatório",
      })
      .email({ message: "E-mail inválido, verifique e tente novamente" }),
    tel: z
      .string({
        required_error: "Telefone é obrigatório",
      })
      .refine((val) => val.match(/^\(\d{2}\)\s\d{4,5}-\d{4}$/), {
        message: "Telefone inválido",
      }),
    password: z
      .string({
        required_error: "Senha é obrigatória",
      })
      .min(6, "Senha precisa ter no mínimo 6 caracteres"),
    passwordConfirm: z
      .string({
        required_error: "Confirmação da Senha é obrigatória",
      })
      .min(6, "Confirmação da Senha precisa ter no mínimo 6 caracteres"),
  })
  .superRefine(({ password, passwordConfirm }, ctx) => {
    if (passwordConfirm !== password) {
      ctx.addIssue({
        path: ["passwordConfirm"],
        code: "custom",
        message: "As senhas não coecidem, verifique e tente novamente",
      });
    }
  });

export default professorRegisterSchema;

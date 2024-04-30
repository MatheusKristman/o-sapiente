import { z } from "zod";

export const recoverPasswordSchema = z
  .object({
    newPassword: z
      .string()
      .min(6, { message: "Nova senha precisa ter pelo menos 6 caracteres" }),
    newPasswordConfirm: z.string().min(6, {
      message: "Confirmação da Nova Senha precisa ter pelo menos 6 caracteres",
    }),
  })
  .superRefine(({ newPassword, newPasswordConfirm }, ctx) => {
    if (newPasswordConfirm !== newPassword) {
      ctx.addIssue({
        path: ["newPasswordConfirm"],
        code: "custom",
        message: "As senhas não se coincidem, verifique e tente novamente",
      });
    }
  });

import * as yup from "yup";

export interface studentChangePasswordSchemaType {
  newPassword: string;
  newPasswordConfirm: string;
}

export const studentChangePasswordSchema = yup.object({
  newPassword: yup
    .string()
    .min(6, "Senha precisa ter no mínimo 6 caracteres")
    .required("Senha é obrigatória"),
  newPasswordConfirm: yup
    .string()
    .oneOf([yup.ref("newPassword")], "As senhas não se coincidem, verifique e tente novamente")
    .required("Confirmação da senha é obrigatória"),
});

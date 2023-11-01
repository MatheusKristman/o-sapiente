import * as yup from "yup";

export type professorRegisterSchemaType = {
  firstName: string;
  lastName: string;
  email: string;
  tel: string;
  password: string;
  passwordConfirm: string;
};

const professorRegisterSchema = yup.object({
  firstName: yup
    .string()
    .min(3, "Nome precisa ter no mínimo 3 caracteres")
    .required("Nome é obrigatório"),
  lastName: yup.string().required("Sobrenome é obrigatório"),
  email: yup
    .string()
    .email("E-mail inválido, verifique e tente novamente")
    .required("E-mail é obrigatório"),
  tel: yup
    .string()
    .matches(/^\(\d{2}\)\s\d{4,5}-\d{4}$/, "Telefone inválido")
    .required("Telefone é obrigatório"),
  password: yup
    .string()
    .min(6, "Senha precisa ter no mínimo 6 caracteres")
    .required("Senha é obrigatória"),
  passwordConfirm: yup
    .string()
    .oneOf([yup.ref("password")], "As senhas não se coincidem, verifique e tente novamente")
    .required("Confirmação da senha é obrigatória"),
});

export default professorRegisterSchema;

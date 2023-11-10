import * as yup from "yup";

export type professorLoginType = {
  email: string;
  password: string;
};

const professorLoginSchema = yup.object({
  email: yup.string().email("E-mail inválido").required("E-mail é obrigatório"),
  password: yup.string().required("Senha é obrigatória"),
});

export default professorLoginSchema;

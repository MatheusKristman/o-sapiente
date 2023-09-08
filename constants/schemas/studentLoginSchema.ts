import * as yup from "yup";

export type studentLoginType = {
  email: string;
  password: string;
};

const studentLoginSchema = yup.object({
  email: yup.string().email("E-mail inválido").required("E-mail é obrigatório"),
  password: yup.string().required("Senha é obrigatória"),
});

export default studentLoginSchema;

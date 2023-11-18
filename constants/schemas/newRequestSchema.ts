import * as yup from "yup";

export type newRequestSchemaTypes = {
  subject: string;
  message: string;
};

const newRequestSchema = yup.object({
  subject: yup.string().required("Matéria é obrigatória"),
  message: yup
    .string()
    .min(100, "Descrição precisa ser acima de 100 caracteres")
    .required("Descrição é obrigatória"),
});

export default newRequestSchema;

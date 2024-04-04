import * as yup from "yup";

export type newRequestSchemaTypes = {
  subject: string;
  subjectSpecific?: string | undefined;
  description: string;
};

const newRequestSchema = yup.object({
  subject: yup.string().required("Matéria é obrigatória"),
  subjectSpecific: yup.string(),
  description: yup
    .string()
    .min(20, "Descrição precisa ser acima de 20 caracteres")
    .required("Descrição é obrigatória"),
});

export default newRequestSchema;

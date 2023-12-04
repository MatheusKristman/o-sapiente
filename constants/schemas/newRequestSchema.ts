import * as yup from "yup";

export type newRequestSchemaTypes = {
    subject: string;
    description: string;
};

const newRequestSchema = yup.object({
    subject: yup.string().required("Matéria é obrigatória"),
    description: yup
        .string()
        .min(100, "Descrição precisa ser acima de 100 caracteres")
        .required("Descrição é obrigatória"),
});

export default newRequestSchema;

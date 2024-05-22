import { z } from "zod";

const newRequestSchema = z.object({
  subject: z.string().min(1, { message: "Matéria é obrigatória" }),
  subjectSpecific: z.string(),
  description: z
    .string()
    .min(20, "Descrição precisa ser acima de 20 caracteres"),
});

export default newRequestSchema;

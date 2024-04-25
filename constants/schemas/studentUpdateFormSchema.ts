import { z } from "zod";

const studentUpdateFormSchema = z.object({
    firstName: z.string().min(1, { message: "Nome é obrigatório" }),
    lastName: z.string().min(1, { message: "Sobrenome é obrigatório" }),
    birth: z.optional(z.date()),
    city: z.string(),
    address: z.string(),
    addressNumber: z.string(),
    ddd: z.string().min(2, { message: "DDD inválido" }),
    cel: z.string().min(10, { message: "Celular inválido" }),
    state: z.string(),
    district: z.string(),
    complement: z.string(),
});

export default studentUpdateFormSchema;

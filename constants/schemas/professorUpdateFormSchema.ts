import { z } from "zod";

export const professorUpdateFormSchema = z.object({
    firstName: z.string().min(1, { message: "Nome é obrigatório" }),
    lastName: z.string().min(1, { message: "Sobrenome é obrigatório" }),
    // birth: z
    //     .string()
    //     .refine(
    //         (val) =>
    //             val.length === 0 ||
    //             val.match(/^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/),
    //         { message: "Data inválida" },
    //     ),
    birth: z.optional(z.date()),
    city: z.string(),
    address: z.string(),
    addressNumber: z.string(),
    ddd: z.string().min(2, "DDD inválido"),
    cel: z.string().min(10, "Celular inválido"),
    state: z.string({
        required_error: "Estado é obrigatório",
    }),
    district: z.string(),
    complement: z.string(),
    aboutMe: z.string().min(40, "Sobre precisa ter acima de 40 caracteres"),
});

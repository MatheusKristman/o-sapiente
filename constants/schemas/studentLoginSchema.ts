import { z } from "zod";

const studentLoginSchema = z.object({
    email: z
        .string()
        .email("E-mail inválido")
        .min(1, { message: "E-mail é obrigatório" }),
    password: z.string().min(1, { message: "Senha é obrigatória" }),
});

export default studentLoginSchema;

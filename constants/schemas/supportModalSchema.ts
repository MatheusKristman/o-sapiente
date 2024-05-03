import { z } from "zod";

export const supportModalSchema = z.object({
  requestId: z.string().min(1, "Selecione uma solicitação para ser atendida"),
  message: z.string().min(20, "Mensagem precisa no mínimo de 20 caracteres"),
});

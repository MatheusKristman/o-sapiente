import * as yup from "yup";

export interface IRequestDetailsOfferForm {
  message: string;
}

export const requestDetailsOfferFormSchema = yup.object({
  message: yup
    .string()
    .min(100, "Mensagem precisa ter no mínimo 100 caracteres")
    .required("Mensagem é obrigatória"),
});

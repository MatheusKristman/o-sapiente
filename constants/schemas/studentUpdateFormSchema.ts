import * as yup from "yup";

export type studentUpdateFormSchemaType = {
  firstName: string;
  lastName: string;
  birth?: string | undefined;
  city?: string | undefined;
  address?: string | undefined;
  addressNumber?: string | undefined;
  ddd: string;
  cel: string;
  state?: string | undefined;
  district?: string | undefined;
  complement?: string | undefined;
};

const studentUpdateFormSchema = yup.object({
  firstName: yup.string().required("Nome é obrigatório"),
  lastName: yup.string().required("Sobrenome é obrigatório"),
  birth: yup
    .string()
    .matches(/^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/, "Data inválida"),
  city: yup.string(),
  address: yup.string(),
  addressNumber: yup.string(),
  ddd: yup.string().min(2, "DDD inválido").required("DDD é obrigatório"),
  cel: yup.string().min(10, "Celular inválido").required("Celular é obrigatório"),
  state: yup.string(),
  district: yup.string(),
  complement: yup.string(),
});

export default studentUpdateFormSchema;

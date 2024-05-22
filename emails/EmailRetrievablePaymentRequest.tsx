import { Html, Head, Preview, Body, Container, Img, Text, Hr, Tailwind } from "@react-email/components";

import { formatPrice } from "@/libs/utils";

const imageURL =
  process.env.NODE_ENV === "production"
    ? `${process.env.NEXT_PUBLIC_BASEURL}/assets/images/email-logo.png.png`
    : "/static/email-logo.png";

interface Props {
  pixCode: string;
  paymentRequest: number;
  professorName: string;
  professorEmail: string;
  professorCel: string;
}

export default function EmailRetrievablePaymentRequest({
  pixCode,
  paymentRequest,
  professorName,
  professorEmail,
  professorCel,
}: Props) {
  return (
    <Html>
      <Head />

      <Preview>Solicitação de resgate - O Sapiente</Preview>

      <Tailwind>
        <Body style={main}>
          <Container style={container}>
            <Img src={imageURL} width="145" height="30" alt="O Sapiente" style={image} />

            <Text className="text-base">Ola Administrador,</Text>

            <Text className="text-base">Foi recebido uma nova solicitação de resgate por um professor.</Text>

            <Text className="text-base">Segue a solicitação que foi enviada:</Text>

            <Text className="text-base">Nome: {professorName}</Text>

            <Text className="text-base">Email: {professorEmail}</Text>

            <Text className="text-base">Celular: {professorCel}</Text>

            <Text className="text-base">Pix do professor: {pixCode}</Text>

            <Text className="text-base">Valor Solicitado: {formatPrice(paymentRequest)}</Text>

            <Hr className="border border-solid border-[#eaeaea] my-[35px] mx-0 w-full" />

            <Text className="text-[#666666] text-[12px] leading-[24px]">
              Se você não estava esperando por este mensagem, você pode ignorar este e-mail. Se você estiver preocupado
              com a segurança de sua conta, por favor responda a este e-mail para entrar em contato conosco.
            </Text>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
}

const main = {
  backgroundColor: "#F0F5F8",
  color: "#393F42",
  fontFamily:
    "-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif,'Apple Color Emoji','Segoe UI Emoji'",
};

const container = {
  maxWidth: "480px",
  margin: "0 auto",
  padding: "20px 0 48px",
};

const image = {
  margin: "0 auto",
};

const buttonStyle = {
  backgroundColor: "#03C988",
  color: "white",
  fontWeight: "600",
  padding: "15px 30px",
  borderRadius: "8px",
  display: "flex",
  margin: "0 auto",
  width: "fit-content",
};

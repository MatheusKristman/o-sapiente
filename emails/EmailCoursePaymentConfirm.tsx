import {
  Html,
  Head,
  Preview,
  Body,
  Container,
  Img,
  Text,
  Section,
  Row,
  Hr,
  Tailwind,
} from "@react-email/components";

import { formatPrice } from "@/libs/utils";

const imageURL =
  process.env.NODE_ENV === "production"
    ? `${process.env.NEXT_PUBLIC_BASEURL}/assets/images/email-logo.png`
    : "/static/email-logo.png";

interface Props {
  name: string;
  courseName: string;
  courseAmount: string;
  paymentMethod: string;
  installments: string;
}

export default function EmailCoursePaymentConfirm({
  paymentMethod,
  name,
  courseName,
  courseAmount,
  installments,
}: Props) {
  return (
    <Html>
      <Head />

      <Preview>Pagamento do curso confirmado - O Sapiente</Preview>

      <Tailwind>
        <Body style={main}>
          <Container style={container}>
            <Img
              src={imageURL}
              width="145"
              height="30"
              alt="O Sapiente"
              style={image}
            />

            <Text className="text-base">Ola {name},</Text>

            <Text className="text-base">Espero que esteja tudo bem!</Text>

            <Text className="text-base">
              Gostaria de informar que o pagamento do curso{" "}
              <strong>{courseName}</strong> foi confirmado. Em breve entraremos
              em contato para lhe enviar o acesso do curso.
            </Text>

            <Text className="text-base">
              Abaixo estão os detalhes da compra:
            </Text>

            <Section style={{ marginBottom: "35px" }}>
              <Row>
                <strong>Nome do curso: </strong>
                {courseName}
              </Row>

              <Row>
                <strong>Valor: </strong>
                {formatPrice(courseAmount)}
              </Row>

              <Row className="mb-4">
                <strong>Forma de pagamento: </strong>
                {paymentMethod}
              </Row>

              {paymentMethod === "credit_card" && (
                <Row className="mb-4">
                  <strong>Parcelas: </strong>
                  {installments}
                </Row>
              )}
            </Section>

            <Hr className="border border-solid border-[#eaeaea] my-[35px] mx-0 w-full" />

            <Text className="text-[#666666] text-[12px] leading-[24px]">
              Se você não estava esperando por esta mensagem, você pode ignorar
              este e-mail. Se você estiver preocupado com a segurança de sua
              conta, por favor responda a este e-mail para entrar em contato
              conosco.
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

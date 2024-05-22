import { format } from "date-fns";
import { Html, Head, Preview, Body, Container, Img, Text, Row, Section, Hr, Tailwind } from "@react-email/components";

import { formatPrice } from "@/libs/utils";

const baseURL = process.env.NODE_ENV === "production" ? process.env.NEXT_PUBLIC_BASEURL : "";

interface Props {
  message: string;
  lessonDate: Date | null;
  lessonPrice: number | null;
  certificateRequested: boolean;
  studentName: string;
  studentContact: string;
  professorName: string;
  professorContact: string;
}

export default function EmailRequestSupport({
  message,
  lessonDate,
  lessonPrice,
  certificateRequested,
  studentName,
  studentContact,
  professorName,
  professorContact,
}: Props) {
  return (
    <Html>
      <Head />

      <Preview>Mensagem para suporte - O Sapiente</Preview>

      <Tailwind>
        <Body style={main}>
          <Container style={container}>
            <Img src={`${baseURL}/static/email-logo.png`} width="145" height="30" alt="O Sapiente" style={image} />

            <Text className="text-base">Ola Administrador,</Text>

            <Text className="text-base">Foi recebido uma nova solicitação de suporte.</Text>

            <Text className="text-base">Segue a mensagem que foi enviado:</Text>

            <Text className="text-base">{message}</Text>

            <Section style={{ marginBottom: "35px" }}>
              {lessonDate && (
                <Row>
                  <strong>Data da aula: </strong>
                  {format(new Date(lessonDate), "dd/MM/yyyy")}
                </Row>
              )}

              {lessonPrice && (
                <Row>
                  <strong>Valor: </strong>
                  {formatPrice(lessonPrice)}
                </Row>
              )}

              {lessonDate && lessonPrice && (
                <Row className="mb-4">
                  <strong>Certificado: </strong>
                  {certificateRequested ? "Solicitado" : "Não Solicitado"}
                </Row>
              )}

              <Row>
                <strong>Nome do aluno: </strong>
                {studentName}
              </Row>

              <Row className="mb-4">
                <strong>Contato do aluno: </strong>
                {studentContact}
              </Row>

              <Row>
                <strong>Nome do professor: </strong>
                {professorName}
              </Row>

              <Row>
                <strong>Contato do professor: </strong>
                {professorContact}
              </Row>
            </Section>

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

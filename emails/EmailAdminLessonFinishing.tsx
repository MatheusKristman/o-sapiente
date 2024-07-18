import { format } from "date-fns";
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
  Button,
} from "@react-email/components";

import { formatPrice } from "@/libs/utils";

const imageURL =
  process.env.NODE_ENV === "production"
    ? `${process.env.NEXT_PUBLIC_BASEURL}/assets/images/email-logo.png`
    : "/static/email-logo.png";

interface Props {
  lessonDate: Date;
  finishLessonDate?: Date;
  lessonPrice: number;
  certificateRequested: boolean;
  studentName: string;
  studentContact: string;
  professorName: string;
  professorContact: string;
  status: string;
  userWhoVoted: string;
  baseUrl: string;
}

export default function EmailAdminLessonFinishing({
  lessonDate,
  lessonPrice,
  finishLessonDate,
  certificateRequested,
  studentName,
  studentContact,
  professorName,
  professorContact,
  status,
  userWhoVoted,
  baseUrl,
}: Props) {
  return (
    <Html>
      <Head />

      <Preview>Status da aula atualizado - O Sapiente</Preview>

      <Tailwind>
        <Body style={main}>
          <Container style={container}>
            <Img src={imageURL} width="145" height="30" alt="O Sapiente" style={image} />

            <Text className="text-base">Ola administrador,</Text>

            <Text className="text-base">Espero que esteja tudo bem!</Text>

            <Text className="text-base">
              Gostaria de informar que uma <strong>aula</strong> foi alterado para o status <strong>{status}</strong>.
              Abaixo estão os detalhes:
            </Text>

            <Section style={{ marginBottom: "35px" }}>
              <Row>
                <strong>Data da aula: </strong>
                {format(new Date(lessonDate), "dd/MM/yyyy")}
              </Row>

              {finishLessonDate ? (
                <Row>
                  <strong>Data da finalização da aula: </strong>
                  {format(new Date(finishLessonDate), "dd/MM/yyyy")}
                </Row>
              ) : null}

              <Row>
                <strong>Valor: </strong>
                {formatPrice(lessonPrice)}
              </Row>

              <Row className="mb-4">
                <strong>Certificado: </strong>
                {certificateRequested ? "Solicitado" : "Não solicitado"}
              </Row>

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

              <Row>
                <strong>Status: </strong>
                {status}
              </Row>

              <Row>
                <strong>Quem iniciou: </strong>
                {userWhoVoted}
              </Row>
            </Section>

            <Button href={baseUrl} style={buttonStyle}>
              Painel de controle
            </Button>

            <Hr className="border border-solid border-[#eaeaea] my-[35px] mx-0 w-full" />

            <Text className="text-[#666666] text-[12px] leading-[24px]">
              Se você não estava esperando por esta mensagem, você pode ignorar este e-mail. Se você estiver preocupado
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

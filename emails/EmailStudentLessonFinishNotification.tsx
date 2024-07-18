import { Html, Head, Preview, Body, Container, Img, Text, Hr, Tailwind, Section, Row } from "@react-email/components";
import { format } from "date-fns";

const imageURL =
  process.env.NODE_ENV === "production"
    ? `${process.env.NEXT_PUBLIC_BASEURL}/assets/images/email-logo.png`
    : "/static/email-logo.png";

interface Props {
  name: string;
  subject: string;
  description: string;
  professorName: string;
  beginLessonDate: Date;
  finishLessonDate: Date;
}

export default function EmailStudentLessonFinishNotification({
  name,
  subject,
  description,
  professorName,
  beginLessonDate,
  finishLessonDate,
}: Props) {
  return (
    <Html>
      <Head />

      <Preview>Notificação de finalização da aula - O Sapiente</Preview>

      <Tailwind>
        <Body style={main}>
          <Container style={container}>
            <Img src={imageURL} width="145" height="30" alt="O Sapiente" style={image} />

            <Text className="text-base">Ola {name},</Text>

            <Text className="text-base">Espero que esteja bem!</Text>

            <Text className="text-base">
              Gostaríamos de informar que a aula foi finalizada com sucesso na plataforma <strong>O Sapiente</strong>.
              Detalhes da aula:
            </Text>

            <Section style={{ marginBottom: "35px" }}>
              <Row>
                <strong>Matéria: </strong>
                {subject}
              </Row>

              <Row>
                <strong>Descrição: </strong>
                {description}
              </Row>

              <Row>
                <strong>Nome do professor: </strong>
                {professorName}
              </Row>

              <Row>
                <strong>Data de início: </strong>
                {format(beginLessonDate, "dd/MM/yyyy")}
              </Row>

              <Row>
                <strong>Data de finalização: </strong>
                {format(finishLessonDate, "dd/MM/yyyy")}
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

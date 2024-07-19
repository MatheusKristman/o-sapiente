import { formatPrice } from "@/libs/utils";
import {
  Body,
  Button,
  Container,
  Head,
  Hr,
  Html,
  Img,
  Preview,
  Row,
  Section,
  Tailwind,
  Text,
} from "@react-email/components";
import { format } from "date-fns";

const imageURL =
  process.env.NODE_ENV === "production"
    ? `${process.env.NEXT_PUBLIC_BASEURL}/assets/images/email-logo.png`
    : "/static/email-logo.png";

interface Props {
  userName: string;
  url: string;
  description: string;
  subject: string;
  professorName: string;
  lessonDate: Date;
  lessonPrice: number;
  paymentMethod: string;
  certificateRequested: boolean;
}

export function EmailStudentLessonBeginNotification({
  userName,
  url,
  description,
  subject,
  professorName,
  lessonDate,
  lessonPrice,
  paymentMethod,
  certificateRequested,
}: Props) {
  return (
    <Html>
      <Head />

      <Preview>Notificação sobre a sua solicitação - O Sapiente</Preview>

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

            <Text className="text-base">Ola {userName},</Text>

            <Text className="text-base">Espero que esteja bem!</Text>

            <Text className="text-base">
              Gostariamos de agradecer por aceitar a proposta do professor{" "}
              <strong>{professorName}</strong>, segue mais detalhes da aula:
            </Text>

            <Section style={{ marginBottom: "35px" }}>
              <Row>
                <strong>Descrição da solicitação: </strong>
                {description}
              </Row>

              <Row>
                <strong>Matéria/Assunto: </strong>
                {subject}
              </Row>

              <Row>
                <strong>Nome do professor: </strong>
                {professorName}
              </Row>

              <Row>
                <strong>Data combinada da aula: </strong>
                {format(lessonDate, "dd/MM/yyyy")}
              </Row>

              <Row>
                <strong>Valor combinado da aula: </strong>
                {formatPrice(lessonPrice)}
              </Row>

              <Row>
                <strong>Forma de pagamento: </strong>
                {paymentMethod}
              </Row>

              <Row>
                <strong>Solicitado certificado: </strong>
                {certificateRequested ? "Sim" : "Não"}
              </Row>
            </Section>

            <Text className="text-base">
              O professor irá entrar em contato com você na data confirmada, ou
              mande uma mensagem através do botão abaixo.
            </Text>

            <Button href={url} style={buttonStyle}>
              Enviar mensagem
            </Button>

            <Hr className="border border-solid border-[#eaeaea] my-[35px] mx-0 w-full" />

            <Text className="text-[#666666] text-[12px] leading-[24px]">
              Se você não estava esperando por este mensagem, você pode ignorar
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

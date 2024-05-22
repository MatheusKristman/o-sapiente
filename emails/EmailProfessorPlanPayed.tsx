import {
  Html,
  Button,
  Head,
  Preview,
  Body,
  Container,
  Img,
  Text,
  Row,
  Section,
  Hr,
  Tailwind,
} from "@react-email/components";
import { format } from "date-fns";

interface EmailProps {
  userName: string;
  planActivationDate: Date;
  planValidationDate: Date;
}

export default function EmailProfessorPlanPayed({
  userName,
  planActivationDate,
  planValidationDate,
}: EmailProps) {
  return (
    <Html>
      <Head />

      <Preview>Notificação da sua conta - O Sapiente</Preview>

      <Tailwind>
        <Body style={main}>
          <Container style={container}>
            <Img
              src={`/static/email-logo.png`}
              width="145"
              height="30"
              alt="O Sapiente"
              style={image}
            />

            <Text className="text-base">Ola {userName},</Text>

            <Text className="text-base">
              Temos o prazer de informar que o pagamento do seu plano em{" "}
              <strong>O Sapiente</strong> foi aprovado e sua conta agora está
              <strong>ativa</strong>. Você pode começar a enviar propostas para
              os alunos e compartilhar seu conhecimento.
            </Text>

            <Text className="text-base">Detalhes do Plano:</Text>

            <Section style={{ marginBottom: "35px" }}>
              <Row>
                <strong>Data de Ativação: </strong>
                {format(new Date(planActivationDate), "dd/MM/yyyy")}
              </Row>
              <Row>
                <strong>Validade: </strong>
                {format(new Date(planValidationDate), "dd/MM/yyyy")}
              </Row>
            </Section>

            <Text className="text-base">
              Estamos entusiasmados em tê-lo como parte da nossa comunidade de
              educadores e esperamos que você aproveite ao máximo todas as
              funcionalidades que o seu plano oferece.
            </Text>

            <Text className="text-base">
              Se tiver alguma dúvida ou precisar de assistência, não hesite em
              entrar em contato conosco.
            </Text>

            <Text className="text-base">
              Obrigado por escolher O Sapiente e por contribuir para o sucesso
              dos nossos alunos!
            </Text>

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

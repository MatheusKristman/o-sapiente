import {
  Html,
  Head,
  Preview,
  Body,
  Container,
  Img,
  Text,
  Hr,
  Tailwind,
} from "@react-email/components";

const imageURL =
  process.env.NODE_ENV === "production"
    ? `${process.env.NEXT_PUBLIC_BASEURL}/assets/images/email-logo.png`
    : "/static/email-logo.png";

interface EmailProps {
  userName: string;
}

export default function EmailRequestDeleted({ userName }: EmailProps) {
  return (
    <Html>
      <Head />

      <Preview>Notificação da sua solicitação - O Sapiente</Preview>

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

            <Text className="text-base">
              Esperamos que você esteja bem. Estamos entrando em contato para
              informar que sua solicitação postada em nossa plataforma foi
              <strong>removida</strong> por violar nossos Termos de Uso.
            </Text>

            <Text className="text-base">
              Para garantir a segurança e a integridade de nossa comunidade,
              pedimos que você evite incluir informações pessoais, como números
              de telefone, na descrição de suas solicitações. Além disso, é
              importante não utilizar palavras ou expressões que possam ser
              consideradas inapropriadas ou ofensivas.
            </Text>

            <Text className="text-base">
              Agradecemos sua compreensão e colaboração.
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

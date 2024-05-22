import { Html, Button, Head, Preview, Body, Container, Img, Text, Hr, Tailwind } from "@react-email/components";

const baseURL = process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "";

interface Props {
  name: string;
  otherUserName: string;
}

export default function EmailFinishingLessonNotification({ name, otherUserName }: Props) {
  return (
    <Html>
      <Head />

      <Preview>Notificação de finalização de aula - O Sapiente</Preview>

      <Tailwind>
        <Body style={main}>
          <Container style={container}>
            <Img src={`${baseURL}/static/email-logo.png`} width="145" height="30" alt="O Sapiente" style={image} />

            <Text className="text-base">Ola {name},</Text>

            <Text className="text-base">Espero que esteja bem!</Text>

            <Text className="text-base">
              Gostaríamos de informar que o(a) <strong>{otherUserName}</strong> indicou que deseja{" "}
              <strong>finalizar </strong>a aula que vocês têm juntos em nossa plataforma, <strong>O Sapiente</strong>.
            </Text>

            <Text className="text-base">
              Se você também concorda em finalizá-la, por favor, clique no botão abaixo para confirmar. Se preferir
              continuar a aula, entre me contato com o suporte.
            </Text>

            <Button href="http://localhost:3000" style={buttonStyle}>
              Finalizar Aula
            </Button>

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

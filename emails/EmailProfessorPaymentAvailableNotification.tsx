import { formatPrice } from "@/libs/utils";
import { Html, Button, Head, Preview, Body, Container, Img, Text, Hr, Tailwind } from "@react-email/components";

const imageURL =
  process.env.NODE_ENV === "production"
    ? `${process.env.NEXT_PUBLIC_BASEURL}/assets/images/email-logo.png`
    : "/static/email-logo.png";

interface Props {
  name: string;
  lessonPrice: number;
  baseUrl: string;
}

export default function EmailProfessorPaymentAvailableNotification({ name, lessonPrice, baseUrl }: Props) {
  return (
    <Html>
      <Head />

      <Preview>Notificação de pagamento disponível para resgate - O Sapiente</Preview>

      <Tailwind>
        <Body style={main}>
          <Container style={container}>
            <Img src={imageURL} width="145" height="30" alt="O Sapiente" style={image} />

            <Text className="text-base">Ola {name},</Text>

            <Text className="text-base">Espero que esteja bem!</Text>

            <Text className="text-base">
              Gostaríamos de informar que o valor de {formatPrice(lessonPrice)} da aula finalizada foi adicionado ao seu
              saldo e está disponível para resgate na plataforma <strong>O Sapiente</strong>.
            </Text>

            <Text className="text-base">Caso queira resgatar é só acessar a sua conta através do botão abaixo.</Text>

            <Button href={baseUrl} style={buttonStyle}>
              Painel do professor
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

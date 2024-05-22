import { Html, Button, Head, Preview, Body, Container, Img, Text, Hr, Tailwind } from "@react-email/components";

const imageURL =
  process.env.NODE_ENV === "production"
    ? `${process.env.NEXT_PUBLIC_BASEURL}/assets/images/email-logo.png.png`
    : "/static/email-logo.png";

interface Props {
  userName: string;
  url: string;
}

export default function EmailConfirmAccount({ userName = "Nome do Usuário", url }: Props) {
  return (
    <Html>
      <Head />

      <Preview>Confirme sua conta - O Sapiente</Preview>

      <Tailwind>
        <Body style={main}>
          <Container style={container}>
            <Img src={imageURL} width="145" height="30" alt="O Sapiente" style={image} />

            <Text className="text-base">
              Ola <strong>{userName}</strong>,
            </Text>

            <Text className="text-base">
              Bem-vindo(a) à plataforma <strong>O Sapiente</strong>!
            </Text>

            <Text className="text-base">
              Para concluir o processo de criação da sua conta e começar a aproveitar todos os recursos que oferecemos,
              por favor, confirme seu endereço de email e ative sua conta clicando no botão abaixo:
            </Text>

            <Button href={url} style={buttonStyle}>
              Confirmar minha conta
            </Button>

            <Text className="text-base">
              Se o botão acima não funcionar, copie e cole o link a seguir em seu navegador: {url}
            </Text>

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

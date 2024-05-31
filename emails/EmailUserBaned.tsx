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
import { format } from "date-fns";

const imageURL =
  process.env.NODE_ENV === "production"
    ? `${process.env.NEXT_PUBLIC_BASEURL}/assets/images/email-logo.png`
    : "/static/email-logo.png";

interface EmailProps {
  userName: string;
  banDate: Date;
}

export default function EmailUserBaned({ userName, banDate }: EmailProps) {
  return (
    <Html>
      <Head />

      <Preview>Notificação da sua conta - O Sapiente</Preview>

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
              Após uma revisão cuidadosa de suas atividades em nossa plataforma,
              verificamos que você violou nossas regras de uso. De acordo com
              nossos Termos de Serviço, sua conta foi banida permanentemente a
              partir de {format(new Date(banDate), "dd/MM/yyyy")}.
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

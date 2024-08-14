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

interface Props {
  name: string;
  courseName: string;
}

export default function EmailCoursePaymentFailed({ name, courseName }: Props) {
  return (
    <Html>
      <Head />

      <Preview>Pagamento do curso negado - O Sapiente</Preview>

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

            <Text className="text-base">Ola {name},</Text>

            <Text className="text-base">Espero que esteja tudo bem!</Text>

            <Text className="text-base">
              Estamos entrando em contato para informá-lo de que, infelizmente,
              não conseguimos processar o pagamento do seu curso {courseName}. O
              sistema nos notificou sobre uma falha na tentativa de cobrança.
            </Text>

            <Text className="text-base">
              Recomendamos que você verifique os dados de pagamento fornecidos,
              como número do cartão, validade, e saldo disponível, para garantir
              que estão corretos. Caso o problema persista, sugerimos tentar
              outro método de pagamento ou entrar em contato com a sua
              instituição financeira para mais informações.
            </Text>

            <Text className="text-base">
              Estamos à disposição para ajudar com qualquer dúvida ou problema.
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

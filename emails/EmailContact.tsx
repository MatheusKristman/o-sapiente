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

interface Props {
    name: string;
    message: string;
    email: string;
}

export default function EmailContact({ message, name, email }: Props) {
    return (
        <Html>
            <Head />

            <Preview>Mensagem de contato - O Sapiente</Preview>

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

                        <Text className="text-base">
                            Olá, {name} enviou a seguinte mensagem:
                        </Text>

                        <Text className="text-base">{message}</Text>

                        <Text className="text-base">
                            <strong>Email de contato:</strong> {email}
                        </Text>

                        <Hr className="border border-solid border-[#eaeaea] my-[35px] mx-0 w-full" />

                        <Text className="text-[#666666] text-[12px] leading-[24px]">
                            Se você não estava esperando por este mensagem, você
                            pode ignorar este e-mail. Se você estiver preocupado
                            com a segurança de sua conta, por favor responda a
                            este e-mail para entrar em contato conosco.
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

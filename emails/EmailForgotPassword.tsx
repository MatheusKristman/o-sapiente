import {
    Html,
    Button,
    Head,
    Preview,
    Body,
    Container,
    Img,
    Text,
    Hr,
    Tailwind,
} from "@react-email/components";

export function EmailForgotPassword() {
    return (
        <Html>
            <Head />

            <Preview>Recuperação de senha - O Sapiente</Preview>

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

                        <Text className="text-base">Ola usuário,</Text>

                        <Text className="text-base">
                            Você está recebendo este e-mail porque solicitou a
                            <strong>recuperação da sua senha</strong> em{" "}
                            <strong>O Sapiente</strong>. Por favor, siga as
                            instruções abaixo para redefinir sua senha:
                        </Text>

                        <Text className="text-base">
                            <strong>Passo 1:</strong>
                            <br />
                            Para redefinir sua senha, clique no link abaixo:
                        </Text>

                        <Button
                            href="http://localhost:3000"
                            style={buttonStyle}
                        >
                            Recuperar Senha
                        </Button>

                        <Text className="text-base">
                            <strong>Passo 2:</strong>
                            <br />
                            Após clicar no link, você será redirecionado para
                            uma página onde poderá inserir uma nova senha.
                        </Text>

                        <Text className="text-base">
                            <strong>Importante</strong>
                            <br />
                            Por motivos de segurança, este link é{" "}
                            <strong>válido </strong>apenas por{" "}
                            <strong>[número de horas] horas</strong>. Se você
                            não redefinir sua senha dentro desse período, será
                            necessário solicitar novamente a recuperação de
                            senha.
                        </Text>

                        <Text className="text-base">
                            Se você não solicitou esta recuperação ou acredita
                            que isso possa ser uma atividade suspeita, por
                            favor, entre em contato conosco imediatamente para
                            que possamos ajudar a proteger sua conta.
                        </Text>

                        <Text className="text-base">
                            Se precisar de assistência adicional ou tiver alguma
                            dúvida, não hesite em nos contatar.
                        </Text>

                        <Text className="text-base">
                            <strong>Atenciosamente,</strong>
                            <br />A equipe do O Sapiente
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

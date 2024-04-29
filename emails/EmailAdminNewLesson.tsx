import {
    Html,
    Head,
    Preview,
    Body,
    Container,
    Img,
    Text,
    Section,
    Row,
    Hr,
    Tailwind,
} from "@react-email/components";

export function EmailAdminNewLesson() {
    return (
        <Html>
            <Head />

            <Preview>Nova aula criada - O Sapiente</Preview>

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

                        <Text className="text-base">Ola adminstrador,</Text>

                        <Text className="text-base">
                            Espero que esteja tudo bem!
                        </Text>

                        <Text className="text-base">
                            Gostaría de informar que uma{" "}
                            <strong>nova aula</strong> foi criada em na
                            plataforma, <strong>O Sapiente</strong>. Abaixo
                            estão os detalhes:
                        </Text>

                        <Section style={{ marginBottom: "35px" }}>
                            <Row>
                                <strong>Data da aula: </strong>20/10/2012
                            </Row>

                            <Row>
                                <strong>Valor: </strong>R$ 31,40
                            </Row>

                            <Row className="mb-4">
                                <strong>Certificado: </strong>Não solicitado
                            </Row>

                            <Row>
                                <strong>Nome do aluno: </strong>Nome Teste
                            </Row>

                            <Row className="mb-4">
                                <strong>Contato do aluno: </strong>(11)
                                91234-5678
                            </Row>

                            <Row>
                                <strong>Nome do professor: </strong>Nome Teste
                            </Row>

                            <Row>
                                <strong>Contato do professor: </strong>(11)
                                91234-5678
                            </Row>
                        </Section>

                        <Hr className="border border-solid border-[#eaeaea] my-[35px] mx-0 w-full" />

                        <Text className="text-[#666666] text-[12px] leading-[24px]">
                            Se você não estava esperando por esta mensagem, você
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

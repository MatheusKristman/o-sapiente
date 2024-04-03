import axios from "axios";

export async function POST(req: Request) {
  try {
    const {
      birth,
      ddd,
      cel,
      cep,
      city,
      state,
      address,
      addressNumber,
      district,
      complement,
      creditNumber,
      creditOwner,
      creditExpiry,
      creditCvc,
    } = await req.json();

    if (
      !birth ||
      !ddd ||
      !cel ||
      !creditNumber ||
      !creditOwner ||
      !creditExpiry ||
      !creditCvc
    ) {
      return new Response("Dados inválidos, verifique e tente novamente", {
        status: 404,
      });
    }

    // TODO: adicionar opções para o pagarme e testar
    const options = {
      method: "POST",
      url: "https://api.pagar.me/core/v5/orders",
      headers: {
        accept: "application/json",
        "content-type": "application/json",
        authorization:
          "Basic " +
          Buffer.from(`${process.env.PAGARME_SECRET_KEY!}:`).toString("base64"),
      },
      data: {
        customer: {
          address: {},
        },
      },
    };
  } catch (error) {
    console.log("[ERROR_PLAN_PAYMENT]", error);

    return new Response("Ocorreu um erro ao realizar o pagamento do plano", {
      status: 500,
    });
  }
}

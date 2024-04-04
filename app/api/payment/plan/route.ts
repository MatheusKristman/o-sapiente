import getCurrentUser from "@/app/action/getCurrentUser";
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
      planName,
      planPrice,
      planId,
      paymentMethod,
    } = await req.json();

    if (!birth || !ddd || !cel) {
      return new Response("Dados inválidos, verifique e tente novamente", {
        status: 404,
      });
    }

    if (
      paymentMethod === "credit_card" &&
      (!creditNumber || !creditOwner || !creditExpiry || !creditCvc)
    ) {
      return new Response("Dados inválidos, verifique e tente novamente", {
        status: 404,
      });
    }

    const currentUser = await getCurrentUser();

    if (!currentUser?.id || !currentUser?.email) {
      return new Response("Usuário não encontrado", { status: 404 });
    }

    let line_1: string = "";
    let line_2: string = "";
    let paymentOptions = {};
    const number = creditNumber ? creditNumber.split(" ").join("") : "";
    const exp_month = creditExpiry ? creditExpiry.split("/")[0] : "";
    const exp_year = creditExpiry ? creditExpiry.split("/")[1] : "";

    if (addressNumber) {
      line_1 += addressNumber;
    } else if (address) {
      line_1 += `, ${address}`;
    } else if (district) {
      line_1 += `, ${district}`;
    }

    if (complement) {
      line_2 += complement;
    }

    if (paymentMethod === "credit_card") {
      paymentOptions = {
        payment_method: "credit_card",
        credit_card: {
          statement_descriptor: "O SAPIENTE",
          card: {
            number,
            holder_name: creditOwner,
            exp_month,
            exp_year,
            cvv: creditCvc,
            billing_address: {
              line_1,
              line_2,
              zip_code: cep,
              city,
              state,
              // TODO: por enquanto, depois alterar de forma dinâmica
              country: "BR",
            },
          },
        },
      };
    } else if (paymentMethod === "pix") {
      paymentOptions = {
        payment_method: "pix",
        Pix: {
          expires_in: 1800,
        },
      };
    } else if (paymentMethod === "boleto") {
      paymentOptions = {
        payment_method: "boleto",
        boleto: {
          type: "BDP",
        },
      };
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
          name: `${currentUser.firstName} ${currentUser.lastName}`,
          email: currentUser.email,
          code: currentUser.id,
          address: {
            // TODO: Alterar país depois que ele for inserir outros idiomas
            country: "BR",
            state,
            city,
            zip_code: cep,
            line_1,
            line_2,
          },
          phones: {
            mobile_phone: {
              // TODO: Alterar código depois que ele for inserir outros idiomas
              country_code: "55",
              area_code: ddd,
              number: cel.split("-").join(""),
            },
          },
          birthdate: birth,
        },
        items: [
          {
            amount: planPrice,
            description: planName,
            quantity: 1,
            code: planId,
          },
        ],
        payments: [paymentOptions],
      },
    };

    const response = await axios.request(options);

    console.log(response);

    return Response.json({ message: "teste" }, { status: 200 });
  } catch (error: any) {
    console.log("[ERROR_PLAN_PAYMENT]", { error: error.response.data });

    return Response.json(
      {
        message: "Ocorreu um erro ao realizar o pagamento do plano",
        error,
      },
      {
        status: 500,
      }
    );
  }
}

import axios from "axios";
import { addDays } from "date-fns";
import { AccountRole } from "@prisma/client";

import getCurrentUser from "@/app/action/getCurrentUser";

export async function POST(req: Request) {
  try {
    const {
      name,
      email,
      cpf,
      birth,
      cel,
      country,
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
      lessonPrice,
      offerId,
      paymentMethod,
      certificateRequested,
    } = await req.json();
    // const pagarMeSecretKey =
    //   process.env.NODE_ENV === "development"
    //     ? process.env.PAGARME_SECRET_KEY_DEV!
    //     : process.env.PAGARME_SECRET_KEY!;
    const pagarMeSecretKey = process.env.PAGARME_SECRET_KEY_DEV!;

    if (
      !birth ||
      !cel ||
      !name ||
      !email ||
      !cpf ||
      !country ||
      !cep ||
      !city ||
      !state ||
      !address ||
      !addressNumber ||
      !district
    ) {
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

    let userType;

    if (currentUser.accountType === AccountRole.STUDENT) {
      userType = "Student";
    }

    if (currentUser.accountType === AccountRole.PROFESSOR) {
      userType = "Professor";
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
          installments: 1,
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
              state: state.toUpperCase(),
              country: country.toUpperCase(),
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
          instructions:
            "Sr.Caixa, favor não aceitar o pagamento após o vencimento",
          due_at: addDays(new Date(), 3),
        },
      };
    }

    const finalLessonPrice: number = certificateRequested
      ? lessonPrice + 20
      : lessonPrice;

    const options = {
      method: "POST",
      url: "https://api.pagar.me/core/v5/orders",
      headers: {
        accept: "application/json",
        "content-type": "application/json",
        authorization:
          "Basic " + Buffer.from(`${pagarMeSecretKey}:`).toString("base64"),
      },
      data: {
        customer: {
          type: "individual",
          name,
          email,
          document: cpf.replace(/[^0-9]/g, ""),
          code: currentUser.id,
          address: {
            country: country.toUpperCase(),
            state: state.toUpperCase(),
            city,
            zip_code: cep,
            line_1,
            line_2,
          },
          phones: {
            home_phone: {
              country_code: cel.substring(1, 3),
              area_code: cel.substring(3, 5),
              number: cel.substring(5),
            },
            mobile_phone: {
              country_code: cel.substring(1, 3),
              area_code: cel.substring(3, 5),
              number: cel.substring(5),
            },
          },
          birthdate: birth,
          metadata: {
            certificateRequested,
          },
        },
        items: [
          {
            amount: Number(finalLessonPrice) * 100,
            description: "Pagamento da aula",
            quantity: 1,
            code: offerId,
          },
        ],
        payments: [paymentOptions],
      },
    };

    const response = await axios.request(options);

    return Response.json({ ...response.data, userType }, { status: 200 });
  } catch (error: any) {
    console.log("[ERROR_PLAN_PAYMENT]", {
      error: error.response.data.errors,
    });

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

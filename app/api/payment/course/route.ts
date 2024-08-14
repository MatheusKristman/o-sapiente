import axios from "axios";
import { addDays } from "date-fns";

//test

export async function POST(req: Request) {
  try {
    const {
      name,
      email,
      cpf,
      birthDate,
      tel,
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
      courseName,
      coursePrice,
      courseId,
      paymentMethod,
      installments,
    } = await req.json();
    const pagarMeSecretKey =
      process.env.NODE_ENV === "development"
        ? process.env.PAGARME_SECRET_KEY_DEV!
        : process.env.PAGARME_SECRET_KEY!;

    if (
      !birthDate ||
      !tel ||
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
      (!creditNumber ||
        !creditOwner ||
        !creditExpiry ||
        !creditCvc ||
        !installments)
    ) {
      return new Response("Dados inválidos, verifique e tente novamente", {
        status: 404,
      });
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
          installments: Number(installments),
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
              country_code: tel.substring(1, 3),
              area_code: tel.substring(3, 5),
              number: tel.substring(5),
            },
            mobile_phone: {
              country_code: tel.substring(1, 3),
              area_code: tel.substring(3, 5),
              number: tel.substring(5),
            },
          },
          birthdate: birthDate,
        },
        items: [
          {
            amount: coursePrice,
            description: courseName,
            quantity: 1,
            code: courseId,
          },
        ],
        payments: [paymentOptions],
      },
    };

    const response = await axios.request(options);

    return Response.json({ ...response.data }, { status: 200 });
  } catch (error: any) {
    console.log("[ERROR_COURSE_PAYMENT]", {
      error: error.response.data.errors,
    });

    return Response.json(
      {
        message: "Ocorreu um erro ao realizar o pagamento do curso",
        error,
      },
      {
        status: 500,
      },
    );
  }
}

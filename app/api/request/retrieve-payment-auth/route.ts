import getCurrentUser from "@/app/action/getCurrentUser";
import bcrypt from "bcrypt";

export async function POST(req: Request) {
  try {
    const { password } = await req.json();

    if (!password) {
      return new Response("Dados inválidos, verifique e tente novamente", {
        status: 401,
      });
    }

    const currentUser = await getCurrentUser();

    if (!currentUser) {
      return new Response("Usuário não autorizado", { status: 401 });
    }

    const isPasswordCorrect = await bcrypt.compare(
      password,
      currentUser.password
    );

    if (!isPasswordCorrect) {
      return new Response("Usuário não autorizado", { status: 401 });
    }

    return new Response("Usuário autorizado", { status: 200 });
  } catch (error) {
    console.log("[ERROR_RETRIEVE_PAYMENT_AUTH]", error);

    return new Response(
      "Ocorreu um erro ao solicitar autorização para troca do código Pix",
      { status: 500 }
    );
  }
}

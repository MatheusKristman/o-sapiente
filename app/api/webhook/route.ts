export async function POST(req: Request) {
  try {
    const body = await req.json();

    console.log("webhook: ", body);

    return Response.json({ request: body }, { status: 200 });
  } catch (error) {
    console.log("[ERROR_ON_WEBHOOK]", error);

    return new Response("Ocorreu um erro no webhook", { status: 500 });
  }
}

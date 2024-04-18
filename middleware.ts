import { withAuth } from "next-auth/middleware";

export const config = {
    matcher: ["/painel-de-controle/:path*"],
};

export default withAuth({
    pages: {
        signOut: "/",
    },
});

import { NextResponse, NextRequest } from "next/server";
import { decodeJwt } from "jose";
import { UserJWT } from "./common/interfaces/user-jwt.interface";

export async function middleware(req: NextRequest) {
    const inside = req.cookies.get(`${process.env.TOKEN_CREADO}`)?.value as string;

    if (!inside) {
        return NextResponse.redirect(new URL("/", req.url));
    }

    try {
        const token: UserJWT = decodeJwt(inside);

        if (token.is_active === false) {
            req.cookies.delete(`${process.env.TOKEN_CREADO}`);
            return NextResponse.redirect(new URL("/", req.url));
        }

        if (token.role.includes("admin")) {
            return NextResponse.next();
        }

        if (token.role.includes("employee")) {

            const allowedRoutes = [
                '/api/auth/recursos/creacion/',
            ]

            if (allowedRoutes.some(route => req.nextUrl.pathname.startsWith(route))) {
                return NextResponse.redirect(new URL("/api/auth/recursos/tipo", req.url));
            }

            return NextResponse.next();
        }

        return NextResponse.redirect(new URL("/", req.url));
    } catch (error) {
        console.log(error)
        return NextResponse.redirect(new URL("/", req.url));
    }
}

export const config = {
    matcher: ["/api/auth/recursos/:path*"],
};

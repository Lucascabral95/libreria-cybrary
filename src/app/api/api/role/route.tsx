import { NextResponse, NextRequest } from "next/server";
import { decodeJwt } from "jose";
import { UserJWT } from "@/common/interfaces/user-jwt.interface";

export async function GET( req: NextRequest ) {
    const token = req.cookies.get(`${process.env.TOKEN_CREADO}`)?.value as string;

    if (!token) {
        return NextResponse.json({ message: "No hay nada en la cookie", status: 400 });
    }

    const decodedToken: UserJWT = decodeJwt(token)
    
    return NextResponse.json({ message: decodedToken, status: 200 })
}
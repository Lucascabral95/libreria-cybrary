import { NextRequest, NextResponse } from "next/server";
import { decodeJwt } from "jose";
import { UserJWT } from "@/common/interfaces/user-jwt.interface";

export async function GET( req: NextRequest ) {
     const datosSession = req.cookies.get(`${process.env.TOKEN_CREADO}`)?.value as string;
     
    if (!datosSession) {
        return NextResponse.json({ message: "No hay nada en la cookie", status: 400 });
    }

    const decodificacion: UserJWT = decodeJwt(datosSession);


    return NextResponse.json({ message: decodificacion });
}
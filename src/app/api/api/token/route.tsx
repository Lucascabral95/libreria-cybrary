import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    try {
        const token = req.cookies.get(process.env.TOKEN_CREADO || '')?.value;

        if (!token) {
            return NextResponse.json(
                { message: 'Token no encontrado', status: 401 },
                { status: 401 }
            );
        }

        return NextResponse.json({ message: token, status: 200 });

    } catch (error) {
        console.error('Error al obtener el token:', error);
        return NextResponse.json(
            { message: 'Error interno del servidor', status: 500 },
            { status: 500 }
        );
    }
}

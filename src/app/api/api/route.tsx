import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function GET() {
    try {
        cookies().delete(process.env.TOKEN_CREADO as string);

        return NextResponse.json({ message: "Cookie eliminada", status: 200 });
    } catch (error) {
        console.error("Error al eliminar la cookie:", error);
        return NextResponse.json({ message: "Error al eliminar la cookie", status: 500 });
    }
}

import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function GET() {
    try {
        //const eliminarCookie = cookies().delete(`${process.env.TOKEN_CREADO}`)
        cookies().delete(`${process.env.TOKEN_CREADO}`)

        return NextResponse.json({ message: "Cookie eliminada", status: 200 })

    } catch (error) {
        console.log(error)
    }
}
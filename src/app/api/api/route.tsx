// import { NextResponse } from "next/server";
// import { cookies } from "next/headers";

// export async function GET() {
//     try {
//         cookies().delete(`${process.env.TOKEN_CREADO}`)

//         return NextResponse.json({ message: "Cookie eliminada", status: 200 })

//     } catch (error) {
//         console.log(error)
//     }
// }
import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function GET() {
    try {
        // Eliminar la cookie
        cookies().delete(process.env.TOKEN_CREADO as string);

        // Retornar respuesta exitosa
        return NextResponse.json({ message: "Cookie eliminada", status: 200 });
    } catch (error) {
        // Manejo de errores
        console.error("Error al eliminar la cookie:", error);
        return NextResponse.json({ message: "Error al eliminar la cookie", status: 500 });
    }
}

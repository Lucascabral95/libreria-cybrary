import { NextRequest, NextResponse } from "next/server";

export async function GET( req: NextRequest ) {
    const token = req.cookies.get(`${process.env.TOKEN_CREADO}`)?.value as string;
    
    return NextResponse.json({ message: token, status: 200 })
}
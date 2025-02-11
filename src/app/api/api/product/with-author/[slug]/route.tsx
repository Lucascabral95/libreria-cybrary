import axios, { isAxiosError } from "axios";
import { NextRequest, NextResponse } from "next/server";

export async function GET( req: NextRequest, { params }: { params: { slug: string } } ) {
      const PATH = process.env.PATH_EXTERNAL
      const token = req.cookies.get( process.env.TOKEN_CREADO || "" )?.value

    try {
        const { slug } = params

        const response = await axios.get(`${PATH}/api/v1/product/with-author/${slug}`, {
            withCredentials: true,
            headers: {
                Authorization: `Bearer ${token}`,
            }
        })

        if (response.status === 200) {
            return NextResponse.json(response.data)
        }

    } catch (error) {
        if (error instanceof Error) {
            if ( isAxiosError(error)) {
                console.log(error.response?.data)
            }
        }
    }
}
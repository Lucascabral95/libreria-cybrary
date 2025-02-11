import axios, { isAxiosError } from "axios";
import { NextResponse } from "next/server";

export async function GET() {
      const PATH = process.env.NEXT_PUBLIC_PATH

      const obtenerToken = async () => {
        try {
            const response = await axios.get(`/api/api/token`, { withCredentials: true })
    
            return response.data.message
    
        } catch (error) {
            console.log('Error obteniendo el token:', error)
            return null
        }
    }

    try {
       const token = await obtenerToken()

        const response = await axios.get(`${PATH}/api/v1/product/with-author`, {
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
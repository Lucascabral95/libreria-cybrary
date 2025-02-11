import axios, { isAxiosError } from "axios";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        // const response = await axios.get(`https://nest-app-6t3h.onrender.com/api/v1/product`)
        const response = await axios.get(`https://nest-app-6t3h.onrender.com/api/v1/product/with-product`)

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
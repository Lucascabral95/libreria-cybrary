import { AuthLogin, AuthRegister } from "@/common/interfaces/auth.interface"
import { z } from "zod"
import { catchError } from "@/app/components/Recursos/utils/obtencionDetallesRecursos.funciones"
import { Errors } from "@/common/interfaces/errors.interface"
import axiosConToken from "@/app/components/Axios.create"

export const registro = async (
    formData: AuthRegister,
    setErroresZod: (errores: z.ZodIssue[]) => void,
    setError: (error: Errors) => void
) => {
    try {
        const response = await axiosConToken.post(`${process.env.NEXT_PUBLIC_PATH}/api/v1/auth`,
            formData
        )

        console.log(response)

        if (response.status === 201) {
            console.log(response.data)
            window.location.href = '/api/auth/login'
            setErroresZod([])
        }

    } catch (error) {
        catchError(error, setError)
    }
}

export const logueo = async (
    formData: AuthLogin,
    setErroresZod: (errores: z.ZodIssue[]) => void,
    setError: (error: Errors) => void,
    setLoading: (loading: boolean) => void
) => {
    try {
        const response = await axiosConToken.post(`${process.env.NEXT_PUBLIC_PATH}/api/v1/auth/login`,
            formData, {
            withCredentials: true
        }
        )

        if (response.status === 200 || response.status === 201) {
            console.log(response.data)
            window.location.href = '/api/auth/recursos/tipo'
            setErroresZod([])
            setLoading(true)
        }

    } catch (error) {
        catchError(error, setError)
    }
}
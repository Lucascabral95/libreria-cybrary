import axiosConToken from "@/app/components/Axios.create"
import { Categorias } from "@/common/interfaces/categorias-recomendadas.interface"
import { Errors } from "@/common/interfaces/errors.interface"
import { isAxiosError } from "axios"

export const obtenerCategoria = async (slug: string | string[], setDataCategoria: (categoria: Categorias) => void, setError: (error: Errors) => void, setLoading: (loading: boolean) => void) => {
    try {
        // const response = await axiosConToken.get(`${process.env.NEXT_PUBLIC_PATH}/api/v1/category/${slug}`)
        const response = await axiosConToken.get(`/api/v1/category/${slug}`)
        if (response.status === 200) {
            setDataCategoria(response.data[0])
            setLoading(false)
            setError({ message: '', code: 200 })
        }

    } catch (error) {
        if (error instanceof Error) {
            if (isAxiosError(error)) {
                console.log({ message: error.response?.data.message, code: error.response?.status || 500 })
                setError({ message: error.response?.data.message, code: error.response?.status || 500 })
            } else {
                setError({ message: error.message, code: 500 })
            }
        }
    } finally {
        setLoading(false)
    }
}

export const obtenerTodasLasCategorias = async ( setCategorias: (categorias: Categorias[]) => void ) => {
  try {
    const response = await axiosConToken.get(`/api/v1/category?limit=100`)

    if (response.status === 200) {
        console.log(response.data)
        setCategorias(response.data)
    }

  } catch (error) {
    if (error instanceof Error) {
        if (isAxiosError(error)) {
            console.log({ message: error.response?.data.message, code: error.response?.status || 500 })
        } else {
            console.log(error)
        }
    }
  }
}
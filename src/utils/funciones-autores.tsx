import { Errors } from "@/common/interfaces/errors.interface"
import { ProductWithAuthor } from "@/common/interfaces/products-with-author-interface"
import { Autor } from "@/common/interfaces/autor-interface"
import { isAxiosError } from "axios"
import axiosConToken from "@/app/components/Axios.create"

export const obtenerLibrosDelAutor = async (slug: string | string[], librosDelAutor: (autor: ProductWithAuthor[]) => void,
    setError: (error: Errors) => void, loading: (loading: boolean) => void) => {
    try {
        const response = await axiosConToken.get(`/api/v1/product/with-author`)

        if (response.status === 200) {
            const autorFiltrado = response.data.filter((a: ProductWithAuthor) => a.slug_author === slug)

            if (autorFiltrado.length === 0) {
                setError({ message: 'No books by the author were found.', code: 404 })
                return
            }

            librosDelAutor(autorFiltrado)
            loading(false)
        }

    } catch (error) {
        if (error instanceof Error) {
            if (isAxiosError(error)) {
                console.log(error.response?.data)
                setError({ message: error.response?.data.message, code: error.response?.status || 500 })
            } else {
                setError({ message: error.message, code: 500 })
            }
        }
    } finally {
        loading(false)
    }
}

export const obtenerAutorPorSlug = async  ( slug: string, datosDelAutor: (autor: Autor) => void, setError: (error: Errors) => void, loading: (loading: boolean) => void ) => {
    try {
        const response = await axiosConToken.get(`/api/v1/author/${slug}`)
    
        if(response.status === 200) {
            console.log(response.data[0])
            datosDelAutor(response.data[0])
            loading(false)
            setError({ message: '', code: 200 })
        }

    } catch (error) {
        if (error instanceof Error) {
            if (isAxiosError(error)) {
                console.log(error.response?.data)
                setError({ message: error.response?.data.message, code: error.response?.status || 500 })
            } else {
                setError({ message: error.message, code: 500 })
            }
        }
    } finally {
        loading(false)
    }
}
import { isAxiosError } from 'axios'
import { Errors } from '@/common/interfaces/errors.interface'
import { ProductWithAuthor } from '@/common/interfaces/products-with-author-interface'
import { Categorias } from '@/common/interfaces/categorias-recomendadas.interface'
import { Proveedores } from '@/common/interfaces/proveedores.interface'
import { Autor } from '@/common/interfaces/autor-interface'
import { Empleado } from '@/common/interfaces/empleado.interface'
import { StockMovimientosWithUsuarioYProducto } from '@/common/interfaces/stock-movimientos.interface'
import axiosConToken from '../../Axios.create'

const PUBLIC_PATH = process.env.NEXT_PUBLIC_PATH;

export const obtenerDetalleDelLibro = async (slug: string, storage: (libro: ProductWithAuthor) => void, setError: (error: Errors) => void, loading: (loading: boolean) => void) => {
    try {
        const response = await axiosConToken.get(`${PUBLIC_PATH}/api/v1/product/with-author/${slug}`)

        if (response.status === 200) {
            storage(response.data[0])
            loading(false)
        }

    } catch (error) {
        catchError(error, setError)
    } finally {
        loading(false)
    }
}

export const obtenerDetalleDeLaCategoria = async (slug: string, storage: (categoria: Categorias) => void, setError: (error: Errors) => void, loading: (loading: boolean) => void) => {
    try {
        const response = await axiosConToken.get(`${PUBLIC_PATH}/api/v1/category/${slug}`)

        if (response.status === 200) {
            storage(response.data[0])
            loading(false)
        }

    } catch (error) {
        catchError(error, setError)
    } finally {
        loading(false)
    }
}

export const obtenerDetalleDelAutor = async (slug: string, storage: (autor: Autor) => void, setError: (error: Errors) => void, loading: (loading: boolean) => void) => {
    try {
        const response = await axiosConToken.get(`${PUBLIC_PATH}/api/v1/author/${slug}`)

        if (response.status === 200) {
            storage(response.data[0])
            loading(false)
        }

    } catch (error) {
        catchError(error, setError)
    } finally {
        loading(false)
    }
}

export const obtenerDetalleDelProveedor = async (id: number, storage: (proveedor: Proveedores) => void, setError: (error: Errors) => void, loading: (loading: boolean) => void) => {
    try {
        const response = await axiosConToken.get(`${PUBLIC_PATH}/api/v1/supplier/${Number(id)}`)

        if (response.status === 200) {
            storage(response.data[0])
            loading(false)
        }

    } catch (error) {
        catchError(error, setError)
    } finally {
        loading(false)
    }
}

export const obtenerDetalleDelEmpleado = async (id: number, storage: (empleado: Empleado) => void, setError: (error: Errors) => void, loading: (loading: boolean) => void) => {
    try {
        const response = await axiosConToken.get(`${PUBLIC_PATH}/api/v1/auth/${Number(id)}`)

        if (response.status === 200) {
            storage(response.data[0])
            loading(false)
        }

    } catch (error) {
        catchError(error, setError)
    } finally {
        loading(false)
    }
}

export const obtenerDetalleDelMovimiento = async (id: number, storage: (empleado: StockMovimientosWithUsuarioYProducto) => void, setError: (error: Errors) => void, loading: (loading: boolean) => void) => {
    try {
        const response = await axiosConToken.get(`${PUBLIC_PATH}/api/v1/stock-movement/with/user/product/${Number(id)}`)

        if (response.status === 200) {
            storage(response.data[0])
            loading(false)
        }

    } catch (error) {
        catchError(error, setError)
    } finally {
        loading(false)
    }
}

export const catchError = (
    error: unknown,
    setError: (error: Errors) => void
) => {
    if (error instanceof Error) {
        if (isAxiosError(error)) {
            console.log(error.response?.data)
            setError({ message: error.response?.data.message, code: error.response?.status || 500 })
        } else {
            setError({ message: error.message, code: 500 })
        }
    }
}

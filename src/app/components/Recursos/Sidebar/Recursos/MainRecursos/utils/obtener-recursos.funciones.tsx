import { isAxiosError } from 'axios'
import { Product } from '@/common/interfaces/products.interface'
import { Categorias } from '@/common/interfaces/categorias-recomendadas.interface'
import { Autor } from '@/common/interfaces/autor-interface'
import { Proveedores } from '@/common/interfaces/proveedores.interface'
import { Empleado } from '@/common/interfaces/empleado.interface'
import { StockMovimientosWithUsuarioYProducto } from '@/common/interfaces/stock-movimientos.interface'
import axiosConToken from '@/app/components/Axios.create'
import { catchError } from '@/app/components/Recursos/utils/obtencionDetallesRecursos.funciones'
import { Errors } from '@/common/interfaces/errors.interface'

export const obtenerProductos = async (
    storage: (productos: Product[]) => void,
    limit: number,
    numeroPagina: number,
    setCantidadPaginas: React.Dispatch<React.SetStateAction<number>>,
    setError: (error: Errors) => void,
    setLoading: (loading: boolean) => void,
) => {
    try {
        const response = await axiosConToken.get(`/api/v1/product?limit=${limit}&offset=${numeroPagina}`)
        const response2 = await axiosConToken.get(`/api/v1/product/count`)

        if (response.status === 200) {
            storage(response.data)
            setCantidadPaginas(Math.ceil(response2.data / limit))
            setLoading(false)
        }

    } catch (error) {
        catchError(error, setError)
    } finally {
        setLoading(false)
    }
}

export const obtenerCategorias = async (
    storage: (categorias: Categorias[]) => void,
    limit: number,
    numeroPagina: number,
    setCantidadPaginas: React.Dispatch<React.SetStateAction<number>>,
    setLoading: (loading: boolean) => void,
    setError: (error: Errors) => void
) => {
    try {
        const response = await axiosConToken.get(`/api/v1/category?limit=${limit}&offset=${numeroPagina}`)
        const response2 = await axiosConToken.get(`/api/v1/category/count`)

        if (response.status === 200) {
            storage(response.data)
            setCantidadPaginas(Math.ceil(response2.data / limit))
            setLoading(false)
        }

    } catch (error) {
        catchError(error, setError)
    } finally {
        setLoading(false)
    }
}

export const obtenerAutores = async (
    storage: (autores: Autor[]) => void,
    limit: number,
    numeroPagina: number,
    setCantidadPaginas: React.Dispatch<React.SetStateAction<number>>,
    setError: (error: Errors) => void,
    setLoading: (loading: boolean) => void,
) => {
    try {
        const response = await axiosConToken.get(`/api/v1/author?limit=${limit}&offset=${numeroPagina}`)
        const response2 = await axiosConToken.get(`/api/v1/author/count`)

        if (response.status === 200) {
            storage(response.data)
            setCantidadPaginas(Math.ceil(response2.data / limit))
            setLoading(false)
        }

    } catch (error) {
        catchError(error, setError)
    } finally {
        setLoading(false)
    }
}

export const obtenerProveedores = async (
    storage: (proveedores: Proveedores[]) => void,
    limit: number,
    numeroPagina: number,
    setCantidadPaginas: React.Dispatch<React.SetStateAction<number>>,
    setLoading: (loading: boolean) => void,
    setError: (error: Errors) => void,
) => {
    try {
        const response = await axiosConToken.get(`/api/v1/supplier?limit=${limit}&offset=${numeroPagina}`)
        const response2 = await axiosConToken.get(`/api/v1/supplier/count`)

        if (response.status === 200) {
            storage(response.data)
            setCantidadPaginas(Math.ceil(response2.data / limit))
            setLoading(false)
        }

    } catch (error) {
        catchError(error, setError)
    } finally {
        setLoading(false)
    }
}

export const obtenerEmpleados = async (
    storage: (empleado: Empleado[]) => void,
) => {
    try {
        const response = await axiosConToken.get(`/api/v1/auth`)

        if (response.status === 200) {
            storage(response.data)
        }

    } catch (error) {
        if (error instanceof Error) {
            if (isAxiosError(error)) {
                console.log(error.response?.data)
            } else {
                console.log(error)
            }
        }
    }
}

export const obtenerMovimientosConProductos = async (
    storage: (movimientos: StockMovimientosWithUsuarioYProducto[]) => void,
    setError: (error: Errors) => void,
    setLoading: (loading: boolean) => void
) => {
    try {
        const response = await axiosConToken.get(`/api/v1/stock-movement/with/user/product`)

        if (response.status === 200) {
            storage(response.data)
            setLoading(false)
        }

    } catch (error) {
        catchError(error, setError)
    } finally {
        setLoading(false)
    }
}

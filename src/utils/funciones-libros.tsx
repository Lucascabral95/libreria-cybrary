import axiosConToken from "@/app/components/Axios.create"
import { catchError } from "@/app/components/Recursos/utils/obtencionDetallesRecursos.funciones"
import { Errors } from "@/common/interfaces/errors.interface"
import { ProductWithAuthor } from "@/common/interfaces/products-with-author-interface"
import { Product } from "@/common/interfaces/products.interface"
import { isAxiosError } from "axios"

export const obtenerLibro = async (slug: string | string[], setDataLibro: (libro: ProductWithAuthor[]) => void, setError: (error: Errors) => void) => {
    try {
        const response = await axiosConToken.get(`${process.env.NEXT_PUBLIC_PATH}/api/v1/product/with-author/${slug}`)

        if (response.status === 200) {
            setDataLibro(response.data)
        }

    } catch (error) {
        if (isAxiosError(error)) {
            console.log(error.response?.data)
            setError({ message: error.response?.data.message, code: error.response?.status || 500 })
        }
    }
}

export const obtenerLibrosPorCategoria = async (slug: string, setLibrosCategoria: (libros: ProductWithAuthor[]) => void,
    setError: (error: Errors) => void, setLoading: (loading: boolean) => void) => {
    try {
        const response = await axiosConToken.get(`${process.env.NEXT_PUBLIC_PATH}/api/v1/product/with-author`)

        const librosFiltrados = response.data.filter((a: ProductWithAuthor) => a.slug_category === slug)

        if (response.status === 200) {
            setLibrosCategoria(librosFiltrados)
            setLoading(false)
        }

    } catch (error) {
        if (error instanceof Error) {
            if (isAxiosError(error)) {
                setError({ message: error.response?.data.message, code: error.response?.status || 500 })
            } else {
                setError({ message: error.message, code: 500 })
            }
        }
    } finally {
        setLoading(false)
    }
}

export const obtenerLibrosPorInclude = async (busqueda: string, storage: (libros: ProductWithAuthor[]) => void, limit: number) => {
    try {
        const response = await axiosConToken.get(`${process.env.NEXT_PUBLIC_PATH}/api/v1/product/with-author`)

        if (response.status === 200) {

            const librosFiltrados = response.data.filter((a: ProductWithAuthor) => a.name.includes(busqueda)).slice(0, limit)
            storage(librosFiltrados)
        }

    } catch (error) {
        if (isAxiosError(error)) {
            console.log(error)
        } else {
            console.log(error);
        }
    }
}

export const obtenerLibrosPorUnAutor = async (autor: string, storage: (libros: ProductWithAuthor[]) => void, limit: number) => {
    try {
        const response = await axiosConToken.get(`${process.env.NEXT_PUBLIC_PATH}/api/v1/product/with-author`)

        if (response.status === 200) {
            const librosFiltrados = response.data.filter((a: ProductWithAuthor) => a.name_author === autor).slice(0, limit)
            storage(librosFiltrados)
        }

    } catch (error) {
        if (isAxiosError(error)) {
            console.log(error)
        } else {
            console.log(error)
        }
    }
}

export const obtenerLibrosPorVariosAutores = async (
    autor: string,
    storage: (libros: ProductWithAuthor[]) => void,
    limit: number,
    storage2?: (libros: ProductWithAuthor[]) => void,
    autor2?: string,
    storage3?: (libros: ProductWithAuthor[]) => void,
    autor3?: string,
) => {
    try {
        // const response = await axiosConToken.get(`${process.env.NEXT_PUBLIC_PATH}/api/v1/product/with-author`);
        const response = await axiosConToken.get(`${process.env.NEXT_PUBLIC_PATH}/api/v1/product/with-author`);

        if (response.status === 200) {
            const librosFiltrados = response.data
                .filter((a: ProductWithAuthor) => a.name_author === autor)
                .slice(0, limit);
            storage(librosFiltrados);

            if (autor2 && storage2) {
                const librosFiltradosDos = response.data
                    .filter((a: ProductWithAuthor) => a.name_author === autor2)
                    .slice(0, 8);
                storage2(librosFiltradosDos);
            }

            if (autor3 && storage3) {
                const librosFiltradosDos = response.data
                    .filter((a: ProductWithAuthor) => a.name_author === autor3)
                    .slice(0, 8);
                storage3(librosFiltradosDos);
            }
        }
    } catch (error) {
        if (isAxiosError(error)) {
            console.log(error);
        }
    }
};

export const obtenerLibrosPorBuscador = async (busqueda: string) => {
    try {
        const response = await axiosConToken.get(`${process.env.NEXT_PUBLIC_PATH}/api/v1/product/with-author`)

        if (response.status === 200) {
            const filtroLibros = response.data.filter((a: ProductWithAuthor) => a.name.includes(busqueda) || a.name_author.includes(busqueda) || a.slug_category.includes(busqueda) || a.publication_date.includes(busqueda))
            console.log(filtroLibros)
        }

    } catch (error) {
        if (isAxiosError(error)) {
            console.log(error)
        } else {
            console.log(error)
        }
    }
}

export const obtenerLibrosPorSlugCategory = async (slug: string,
    storage: (libros: ProductWithAuthor[]) => void, limit: number, setError: (error: Errors) => void) => {
    try {
        const response = await axiosConToken.get(`${process.env.NEXT_PUBLIC_PATH}/api/v1/product/with-author/category/${slug}`)

        if (response.status === 200) {
            console.log(response.data)
            storage(response.data.slice(0, limit))
            setError({ message: 'Category is loaded', code: 200 })
        }

    } catch (error) {
        if (error instanceof Error) {
            if (isAxiosError(error)) {
                console.log(error)
                setError({ message: error.response?.data.message, code: error.response?.status || 500 })
            } else {
                console.log(error)
                setError({ message: error.message, code: 500 })
            }
        }
    }
}

export const obtenerTodosLosLibros = async (
    input: string, 
    storage: (libros: Product[] ) => void,
    setLoading?: (loading: boolean) => void 
) => {
    try {
        const response = await axiosConToken.get(`${process.env.NEXT_PUBLIC_PATH}/api/v1/product?limit=100`)

        if (response.status === 200) {
            const librosFiltrados = response.data.filter((item: Product) => item.name.toLowerCase().includes(input) || item.author.toLowerCase().includes(input))
            storage(librosFiltrados)
            // setLoading && setLoading(false)
            setLoading?.(false);
        }

    } catch (error) {
        if (error instanceof Error) {
            if (isAxiosError(error)) {
                console.log(error)
            } else {
                console.log(error)
            }
        }
    } finally {
        // setLoading && setLoading(false)
        setLoading?.(false);
    }
}

export const obtenerLosMejoresLibrosHasta100 = async (
    storage: (libros: Product[]) => void,
    setError: (error: Errors) => void,
    setLoading: (loading: boolean) => void,
) => {
    try {
        const response = await axiosConToken.get(`${process.env.NEXT_PUBLIC_PATH}/api/v1/product?limit=100`)

        if (response.status === 200) {
            const librosFiltrados = response.data.slice(0, 100)
            storage(librosFiltrados)
            setLoading(false)
        }

    } catch (error) {
        catchError(error, setError)
    } finally {
        setLoading(false)
    }
}
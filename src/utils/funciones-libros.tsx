import axiosConToken from "@/app/components/Axios.create"
import { catchError } from "@/app/components/Recursos/utils/obtencionDetallesRecursos.funciones"
import { Errors } from "@/common/interfaces/errors.interface"
import { ProductWithAuthor } from "@/common/interfaces/products-with-author-interface"
import { Product } from "@/common/interfaces/products.interface"
import axios, { isAxiosError } from "axios"

export const obtenerLibro = async (slug: string | string[], setDataLibro: (libro: ProductWithAuthor[]) => void, setError: (error: Errors) => void) => {
    try {
        const response = await axiosConToken.get(`/api/v1/product/with-author/${slug}`)

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
        const response = await axiosConToken.get(`/api/v1/product/with-author`)

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
        const response = await axiosConToken.get(`/api/v1/product/with-author`)

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
        const response = await axiosConToken.get(`/api/v1/product/with-author`)

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
    setLoading?: (loading: boolean) => void,
   setError?: (error: Errors) => void,
   setPrendiendoMV?: (prendiendoMV: string) => void
) => {
    let intentos = 0;
    const maxIntentos = 4;
    const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

    setLoading?.(true);

    while (intentos < maxIntentos) {
        try {
            const response = await axiosConToken.get(`/api/v1/product/with-author`);

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
                    const librosFiltradosTres = response.data
                        .filter((a: ProductWithAuthor) => a.name_author === autor3)
                        .slice(0, 8);
                    storage3(librosFiltradosTres);
                }

                break; 
            }
        } catch (error) {
            console.log(`Intento ${intentos + 1} fallido:`, error);
            if (intentos < maxIntentos - 1) {
                await delay(5000); 
                setPrendiendoMV?.('Prendiendo MV...');
            } else {
                setError?.({ message: 'Error de conexión con la máquina virtual', code: 500 })
            }
        } finally {
            intentos++;
        }
    }

    setLoading?.(false);
};

export const obtenerLibrosPorBuscador = async (busqueda: string) => {
    try {
        const response = await axios.get(`https://nest-app-6t3h.onrender.com/api/v1/product/with-author`)

        if (!busqueda.trim()) return [];

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
        const response = await axiosConToken.get(`/api/v1/product/with-author/category/${slug}`)

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
    storage: (libros: Product[]) => void,
    setLoading?: (loading: boolean) => void
) => {
    try {
        // const response = await axiosConToken.get(`/api/v1/product?limit=100`)
        const response = await axios.get(`https://nest-app-6t3h.onrender.com/api/v1/product?limit=100`)

        if (response.status === 200) {
            const inputLower = input.toLowerCase();
            storage(
                response.data.filter(({ name, author }: Product) => 
                    name.toLowerCase().includes(inputLower) || author.toLowerCase().includes(inputLower)
                )
            );
            setLoading?.(false);
        }
        
        // if (response.status === 200) {
        //     const librosFiltrados = response.data.filter((item: Product) => item.name.toLowerCase().includes(input) || item.author.toLowerCase().includes(input))
        //     storage(librosFiltrados)
        //     setLoading?.(false);
        // }

    } catch (error) {
        if (error instanceof Error) {
            if (isAxiosError(error)) {
                console.log(error)
            } else {
                console.log(error)
            }
        }
    } finally {
        setLoading?.(false);
    }
}

export const obtenerLosMejoresLibrosHasta100 = async (
    storage: (libros: Product[]) => void,
    setError: (error: Errors) => void,
    setLoading: (loading: boolean) => void,
) => {
    try {
        const response = await axiosConToken.get(`/api/v1/product?limit=100`)

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
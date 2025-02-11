import { Autor } from "@/common/interfaces/autor-interface";
import { Categorias } from "@/common/interfaces/categorias-recomendadas.interface";
import { Proveedores } from "@/common/interfaces/proveedores.interface";
import { Empleado } from "@/common/interfaces/empleado.interface";
import { StockMovimientos } from "@/common/interfaces/stock-movimientos.interface";
import { Product } from "@/common/interfaces/products.interface";
import { catchError } from "@/app/components/Recursos/utils/obtencionDetallesRecursos.funciones";
import { Errors } from "@/common/interfaces/errors.interface";
import { toast } from "react-hot-toast";
import axiosConToken from "@/app/components/Axios.create";

export const actualizarAutor = async (
    id: number,
    setError: (error: Errors) => void,
    storage: Partial<Autor>
) => {
    try {
        const response = await axiosConToken.patch(`/api/v1/author/${id}`, {
            name: storage.name,
            birth_date: storage.birth_date,
            nacionality: storage.nacionality,
            biography: storage.biography
        })

        if (response.status === 200) {
            toast.success("El autor ha sido actualizado",
                { duration: 2500, position: "top-right" }
            )
        }

    } catch (error) {
        catchError(error, setError)
    }
}

export const actualizarCategoria = async (
    id: number,
    setError: (error: Errors) => void,
    storage: Partial<Categorias>
) => {
    try {
        const response = await axiosConToken.patch(`/api/v1/category/${id}`, {
            name: storage.name,
            description: storage.description
        })

        if (response.status === 200) {
            toast.success("La categoria ha sido actualizada",
                { duration: 2500, position: "top-right" }
            )
        }

    } catch (error) {
        catchError(error, setError)
    }
}

export const actualizarProveedor = async (
    id: number,
    setError: (error: Errors) => void,
    storage: Partial<Proveedores>,
) => {
    try {
        const response = await axiosConToken.patch(`/api/v1/supplier/${id}`, {
            name: storage.name,
            contact_email: storage.contact_email,
            contact_phone: storage.contact_phone,
            address: storage.address,
            sector: storage.sector,
            website: storage.website,
        })

        if (response.status === 200) {
            toast.success("El proveedor ha sido actualizado",
                { duration: 2500, position: "top-right" }
            )
        }

    } catch (error) {
        catchError(error, setError)
    }
}

export const actualizarEmpleado = async (
    id: number,
    setError: (error: Errors) => void,
    storage: Partial<Empleado>,
) => {
    try {
        const response = await axiosConToken.patch(`/api/v1/auth/${id}`, {
            full_name: storage.full_name,
            email: storage.email,
            is_active: storage.is_active,
            role: storage.role
        })

        if (response.status === 200) {
            toast.success("El empleado ha sido actualizado",
                { duration: 2500, position: "top-right" }
            )
            console.log('El usuario ha sido actualizado')
        }

    } catch (error) {
        catchError(error, setError)
    }
}

export const actualizarMovimiento = async (
    id: number,
    setError: (error: Errors) => void,
    storage: Partial<StockMovimientos>,
) => {
    try {
        const response = await axiosConToken.patch(`/api/v1/stock-movement/${id}`, {
            product_id: storage.product_id,
            user_id: storage.user_id,
            movement_type: storage.movement_type,
            quantity: storage.quantity
        })

        if (response.status === 200) {
            toast.success("El movimiento ha sido actualizado",
                { duration: 2500, position: "top-right" }
            )
            console.log(`El movimiento ha sido actualizado`)
        }

    } catch (error) {
        catchError(error, setError)
    }
}

export const obtenerSoloMovimiento = async (
    id: number,
    setError: (error: Errors) => void,
    storage: (movimiento: StockMovimientos[]) => void,
) => {
    try {
        const response = await axiosConToken.get(`/api/v1/stock-movement/${id}`)

        if (response.status === 200) {
            console.log("Solo movimiento: " + response.data[0].id)
            storage(response.data[0])
        }
    } catch (error) {
        catchError(error, setError)
    }
}

export const getDeMovimiento = async (storage: (producto: Product[]) => void, storage2: (empleado: Empleado[]) => void, setError: (error: Errors) => void,) => {
    try {
        const response = await axiosConToken.get(`/api/v1/product?limit=100`)
        const response2 = await axiosConToken.get(`/api/v1/auth`)

        if (response.status === 200) {
            storage(response.data)
        }

        if (response2.status === 200) {
            storage2(response2.data)
        }

    } catch (error) {
        catchError(error, setError)
    }
}

export const actualizarProducto = async (
    id: number,
    setError: (error: Errors) => void,
    storage: Partial<Product>
) => {
    try {
        const response = await axiosConToken.patch(`/api/v1/product/${id}`, {
            name: storage.name,
            sku: storage.sku,
            slug: storage.slug,
            author: storage.author,
            publication_date: storage.publication_date,
            language: storage.language,
            synopsis: storage.synopsis,
            quantity_pages: storage.quantity_pages,
            price: storage.price,
            stock: storage.stock,
            category_id: storage.category_id,
            supplier_id: storage.supplier_id,
        })

        if (response.status === 200) {
            toast.success("El producto ha sido actualizado",
                { duration: 2500, position: "top-right" }
            )
            console.log('se ha actualizaod el producto')
        }

        if (response.status === 404 || response.status === 400) {
            toast.error("El producto no ha sido actualizado",
                { duration: 2500, position: "top-right" }
            )
        }

    } catch (error) {
        catchError(error, setError)
    }
}

export const obtenerProductoPorSlug = async (
    id: number,
    storage: (autor: Product) => void,
    setError: (error: Errors) => void,
) => {
    try {
        const response = await axiosConToken.get(`/api/v1/product/${id}`)

        if (response.status === 200) {
            storage(response.data[0])
        }
    } catch (error) {
        catchError(error, setError)
    }
}

export const recursosDeProductos = async (
    storage: (proveedor: Proveedores[]) => void,
    storage2: (categorias: Categorias[]) => void,
    storage3: (autor: Autor[]) => void,
    setError: (error: Errors) => void
) => {
    try {
        const response = await axiosConToken.get(`/api/v1/supplier?limit=100`)
        const response2 = await axiosConToken.get(`/api/v1/category?limit=100`)
        const response3 = await axiosConToken.get(`/api/v1/author?limit=100`)

        if (response.status === 200) {
            storage(response.data)
        }

        if (response2.status === 200) {
            storage2(response2.data)
        }

        if (response2.status === 200) {
            storage3(response3.data)
        }

    } catch (error) {
        catchError(error, setError)
    }
}


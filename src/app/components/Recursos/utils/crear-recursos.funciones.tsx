import { catchError } from "./obtencionDetallesRecursos.funciones"
import { Errors } from "@/common/interfaces/errors.interface"
import { CreacionAutor } from "@/common/interfaces/creacion/Autor-creacion.interface"
import { CreacionCategoria } from "@/common/interfaces/creacion/Categoria-creacion.interface"
import { CreacionMovimientoDeStock } from "@/common/interfaces/creacion/MovimientoStock-creacion.interface"
import { CreacionProveedor } from "@/common/interfaces/creacion/Proveedor-creacion.interface"
import toast from "react-hot-toast"
import axiosConToken from "../../Axios.create"
import { CreacionProducto } from "@/common/interfaces/creacion/Producto-creacion.interface"

const PATH_PUBLIC = process.env.NEXT_PUBLIC_PATH

export const crearStockMovimiento = async (
    setError: (error: Errors) => void,
    data: CreacionMovimientoDeStock,
    setData: React.Dispatch<React.SetStateAction<CreacionMovimientoDeStock>>
) => {
    try {
        const response = await axiosConToken.post(`${PATH_PUBLIC}/api/v1/stock-movement`, {
            product_id: data.product_id,
            user_id: data.user_id,
            movement_type: data.movement_type,
            quantity: data.quantity
        });

        if (response.status === 201) {
            toast.success("El movimiento ha sido creado", {
                duration: 2500,
                position: "top-right"
            })
            setData({} as CreacionMovimientoDeStock);
            setError({ message: '', code: 200 })
        }

    } catch (error) {
        catchError(error, setError);
    }
}

export const crearProducto = async (
    setError: (error: Errors) => void,
    formData: FormData,
    setFormData: React.Dispatch<React.SetStateAction<CreacionProducto>>,
    setImage: React.Dispatch<React.SetStateAction<File | null>>,
    setPreview: React.Dispatch<React.SetStateAction<string | null>>
) => {
    try {
        const response = await axiosConToken.post(`${PATH_PUBLIC}/api/v1/product`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });

        console.log(response.data);
        setImage(null);
        setPreview(null);
        toast.success("Autor creado exitosamente", {
            duration: 2500,
            position: "top-right"
        })
        setFormData({} as CreacionProducto);
        return response.data;
    } catch (error) {
        catchError(error, setError);
    }
};

export const crearCategoria = async (
    setError: (error: Errors) => void,
    data: CreacionCategoria,
    setData: React.Dispatch<React.SetStateAction<CreacionCategoria>>
) => {
    try {
        const response = await axiosConToken.post(`${PATH_PUBLIC}/api/v1/category`, {
            name: data.name,
            description: data.description
        });

        if (response.status === 201) {
            console.log(response.data);
            toast.success("Categoria creada exitosamente", {
                duration: 2500,
                position: "top-right"
            })
            setData({} as CreacionCategoria);
            setError({ message: '', code: 200 })
        }

    } catch (error) {
        catchError(error, setError);
    }
}

export const crearProveedor = async (
    setError: (error: Errors) => void,
    data: CreacionProveedor,
    setData: React.Dispatch<React.SetStateAction<CreacionProveedor>>
) => {
    try {
        const response = await axiosConToken.post(`${PATH_PUBLIC}/api/v1/supplier`, {
            name: data.name,
            sector: data.sector,
            contact_email: data.contact_email,
            contact_phone: data.contact_phone,
            address: data.address,
            website: data.website
        });

        if (response.status === 201) {
            console.log(response.data);
            toast.success("Proveedor creado exitosamente", {
                duration: 2500,
                position: "top-right"
            })
            setData({} as CreacionProveedor);
            setError({ message: '', code: 200 })
        }

    } catch (error) {
        catchError(error, setError);
    }
}

export const crearAutor = async (
    setError: (error: Errors) => void,
    formData: FormData,
    setFormData: React.Dispatch<React.SetStateAction<CreacionAutor>>,
    setImage: React.Dispatch<React.SetStateAction<File | null>>,
    setPreview: React.Dispatch<React.SetStateAction<string | null>>
) => {
    try {
        const response = await axiosConToken.post(`${PATH_PUBLIC}/api/v1/author`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });

        console.log(response.data);
        setImage( null );
        setPreview(null);
        toast.success("Autor creado exitosamente", {
            duration: 2500,
            position: "top-right"
        })
        setFormData({} as CreacionAutor);
        return response.data;
    } catch (error) {
        catchError(error, setError);
    }
};

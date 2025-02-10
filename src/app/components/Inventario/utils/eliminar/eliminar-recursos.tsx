import axiosConToken from "@/app/components/Axios.create";
import { isAxiosError } from "axios"
import { toast } from "react-hot-toast";

const PUBLIC_PATH = process.env.NEXT_PUBLIC_PATH;

export const eliminarCategoria = async (id: number) => {
    try {
        const response = await axiosConToken.delete(`${PUBLIC_PATH}/api/v1/category/${id}`)

        if (response.status === 200) {
            toast.success('Categoria eliminada', {
                duration: 2500,
                position: "top-right"
            })
            setTimeout(() => {
                window.location.href = '/api/auth/recursos/tipo/categorias';
            }, 400);
        }

    } catch (error) {
        if (error instanceof Error) {
            if (isAxiosError(error)) {
                console.log(error.response?.data)
                toast.error(error.response?.data.message, {
                    duration: 5000,
                    position: 'top-right'
                })
            } else {
                console.log(error.message)
            }
        }
    }
}

export const eliminarProducto = async (id: number) => {
    try {
        const response = await axiosConToken.delete(`${PUBLIC_PATH}/api/v1/product/${id}`)

        if (response.status === 200) {
            toast.success('Producto eliminado', {
                duration: 2500,
                position: "top-right"
            })
            setTimeout(() => {
                window.location.href = '/api/auth/recursos/tipo/productos';
            }, 400);
        }

    } catch (error) {
        if (error instanceof Error) {
            if (isAxiosError(error)) {
                console.log(error.response?.data)
                toast.error(error.response?.data.message, {
                    duration: 5000,
                    position: 'top-right'
                })
            } else {
                console.log(error.message)
            }
        }
    }
}

export const eliminarProveedor = async (id: number) => {
    try {
        const response = await axiosConToken.delete(`${PUBLIC_PATH}/api/v1/supplier/${id}`)

        if (response.status === 200) {
            toast.success('Proveedor eliminado', {
                duration: 2500,
                position: "top-right"
            })
            setTimeout(() => {
               window.location.href = '/api/auth/recursos/tipo/proveedores'; 
            }, 400);
        }

    } catch (error) {
        if (error instanceof Error) {
            if (isAxiosError(error)) {
                console.log(error.response?.data)
                toast.error(error.response?.data.message, {
                    duration: 5000,
                    position: 'top-right'
                })
            } else {
                console.log(error.message)
            }
        }
    }
}

export const eliminarAutor = async (id: number) => {
    try {
        const response = await axiosConToken.delete(`${PUBLIC_PATH}/api/v1/author/${id}`)

        if (response.status === 200) {
            toast.success('Autor eliminado', {
                duration: 2500,
                position: "top-right"
            })
            setTimeout(() => {
                window.location.href = '/api/auth/recursos/tipo/autores';
            }, 400);
        }

    } catch (error) {
        if (error instanceof Error) {
            if (isAxiosError(error)) {
                console.log(error.response?.data)
                toast.error(error.response?.data.message, {
                    duration: 5000,
                    position: 'top-right'
                })
            } else {
                console.log(error.message)
            }
        }
    }
}

export const eliminarMovimiento = async (id: number) => {
    try {
        const response = await axiosConToken.delete(`${PUBLIC_PATH}/api/v1/stock-movement/${id}`)

        if (response.status === 200) {
            toast.success('Movimiento eliminado', {
                duration: 2500,
                position: "top-right"
            })
            setTimeout(() => {
                window.location.href = '/api/auth/recursos/tipo/movimientos';
            }, 400);
        }

    } catch (error) {
        if (error instanceof Error) {
            if (isAxiosError(error)) {
                console.log(error.response?.data)
                toast.error(error.response?.data.message, {
                    duration: 5000,
                    position: 'top-right'
                })
            } else {
                console.log(error.message)
            }
        }
    }
}

export const eliminarEmpleado = async (id: number) => {
    try {
        const response = await axiosConToken.delete(`${PUBLIC_PATH}/api/v1/auth/${id}`)

        if (response.status === 200) {
            toast.success('Empleado eliminado', {
                duration: 2500,
                position: "top-right"
            })
            setTimeout(() => {
                window.location.href = '/api/auth/recursos/tipo/empleados';
            }, 400);
        }

    } catch (error) {
        if (error instanceof Error) {
            if (isAxiosError(error)) {
                console.log(error.response?.data)
                toast.error(error.response?.data.message, {
                    duration: 5000,
                    position: 'top-right'
                })
            } else {
                console.log(error.message)
            }
        }
    }
}
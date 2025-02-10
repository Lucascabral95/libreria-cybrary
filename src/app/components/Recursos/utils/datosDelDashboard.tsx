const PUBLIC_PATH = process.env.NEXT_PUBLIC_PATH;
import { DatosDelDashboard } from "@/common/interfaces/datos-dashboard.interface";
import { Errors } from "@/common/interfaces/errors.interface";
import { catchError } from "./obtencionDetallesRecursos.funciones";
import axiosConToken from "../../Axios.create";

export const obtenerDatosDelDashboard = async (
    storage: (datosDelDashboard: DatosDelDashboard) => void,
    setLoading: (loading: boolean) => void,
    setError: (error: Errors) => void
) => {
    try {
        const response = await axiosConToken.get(`${PUBLIC_PATH}/api/v1/stock-movement/inventory/resources`)

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
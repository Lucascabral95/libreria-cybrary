import { create } from "zustand";
import { SeccionActual } from "./common/interfaces/seccion-actual.type";
import axios from "axios";
import { UserJWT } from "./common/interfaces/user-jwt.interface";
import { DatosDelDashboard } from "./common/interfaces/datos-dashboard.interface";
import axiosConToken from "./app/components/Axios.create";
import { Errors } from "./common/interfaces/errors.interface";
import { catchError } from "./app/components/Recursos/utils/obtencionDetallesRecursos.funciones";

const MYPATH = process.env.NEXT_PUBLIC_MY_PATH

interface ZustandState {
  seccionActual: SeccionActual,
  setSeccionActual: (seccion: SeccionActual) => void,
  tokenData: UserJWT,
  setTokenData: () => void,
  datosDashbord: DatosDelDashboard,
  loadingDatosDashboard: boolean,
  errorDatosDashboard: Errors,
  setDatosDelDashboard: () => void,
  inputBusquedaAdmin: string,
  setInputBusquedaAdmin: (input: string) => void,
}

const useStoreZustand = create<ZustandState>((set) => ({
  seccionActual: 'inicio',
  setSeccionActual: (seccion) => set({ seccionActual: seccion }),
  tokenData: {} as UserJWT,
  setTokenData: async () => {
    try {
      const response = await axios.get(`${MYPATH}/api/api/role`,
        { withCredentials: true }
      )

      if (response.status === 200) {
        set({ tokenData: response.data.message })
      }

    } catch (error) {
      console.log(error)
    }
  },
  datosDashbord: {} as DatosDelDashboard,
  loadingDatosDashboard: true,
  errorDatosDashboard: {} as Errors,
  setDatosDelDashboard: async () => {
    try {
      const response = await axiosConToken.get(`/api/v1/stock-movement/inventory/resources`)
      if (response.status === 200) {
        set({ datosDashbord: response.data })
        set({ loadingDatosDashboard: false })
      }
    } catch (error) {
      catchError(error, (error) => set({ errorDatosDashboard: error }))
    } finally {
      set({ loadingDatosDashboard: false })
    }
  },
  inputBusquedaAdmin: '',
  setInputBusquedaAdmin: (input) => set({ inputBusquedaAdmin: input }),
}))

export default useStoreZustand;
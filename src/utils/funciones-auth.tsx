import { isAxiosError } from "axios"
import { UserJWT } from "@/common/interfaces/user-jwt.interface"
import axiosConToken from "@/app/components/Axios.create"

export const obtenerDatosDeSesion = async (datosDeSesion: (user: UserJWT) => void, setLoading: (loading: boolean) => void) => {
    try {
        const response = await axiosConToken.get(`/api/auth/session`)

        if (response.status === 200) {
            datosDeSesion(response.data.message as UserJWT)
            setLoading(false)
        }

    } catch (error) {
        if (error instanceof Error) {
            if (isAxiosError(error)) {
                console.log(error.response?.data)
            } else {
                console.log(error)
            }
        }
    } finally {
        setLoading(false)
    }
}
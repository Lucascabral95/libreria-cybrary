import axios, {isAxiosError} from "axios";

export const cerrarSesion = async () => {
    try {
      const response = await axios.get(`/api/api`)

      if (response.status === 200) {
          window.location.href = '/api/auth/login'
      }

    } catch (error) {
        if (error instanceof Error) {
            if (isAxiosError(error)) {
                console.log(error.response?.data)
            } else {
                console.log(error.message)
            }
        }
    }
}
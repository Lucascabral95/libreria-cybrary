import axios from 'axios'

const MYPATH = process.env.NEXT_PUBLIC_MY_PATH

const axiosConToken = axios.create({
    baseURL: "/proxy/",
    withCredentials: true,
})

const obtenerToken = async () => {
    try {
        const response = await axios.get(`${MYPATH}/api/api/token`,
            { withCredentials: true }
        )
        return response.data.message
    } catch (error) {
        console.log('Error obteniendo el token:', error)
        return null
    }
}

axiosConToken.interceptors.request.use(
    async (config) => {
        const token = await obtenerToken()

        if (token) {
            config.headers.Authorization = `Bearer ${token}`
        } else {
            console.log('No se encontró token. Continuando sin Authorization header.')
        }

        return config
    },
    (error) => {
        return Promise.reject(error)
    }
)

export default axiosConToken

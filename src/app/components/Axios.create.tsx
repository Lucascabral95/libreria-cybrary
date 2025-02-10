// import axios from 'axios'

// const PATH = process.env.NEXT_PUBLIC_PATH
// const MYPATH = process.env.NEXT_PUBLIC_MY_PATH

// const axiosConToken = axios.create({
//     baseURL: PATH,
//     withCredentials: true,
// })

// const obtenerToken = async () => {
//     try {
//         const response = await axios.get(`${MYPATH}/api/api/token`, { withCredentials: true })

//         return response.data.message

//     } catch (error) {
//         console.log('Error obteniendo el token:', error)
//         return null
//     }
// }

// axiosConToken.interceptors.request.use(async (config) => {
//     const token = await obtenerToken()

//     if (token) {
//         config.headers.Authorization = `Bearer ${token}`
//     }

//     return config
// }, (error) => {
//     return Promise.reject(error)
// })

// export default axiosConToken


import axios from 'axios'

const PATH = process.env.NEXT_PUBLIC_PATH
const MYPATH = process.env.NEXT_PUBLIC_MY_PATH

const axiosConToken = axios.create({
    baseURL: PATH,
    withCredentials: true,
})

const obtenerToken = async () => {
    try {
        const response = await axios.get(`${MYPATH}/api/api/token`, { withCredentials: true })
        return response.data.message
    } catch (error) {
        console.log('Error obteniendo el token:', error)
        return null
    }
}

axiosConToken.interceptors.request.use(
    async (config) => {
        const token = await obtenerToken()

        // Solo agregar el token si existe
        if (token) {
            config.headers.Authorization = `Bearer ${token}`
        } else {
            // Si no hay token, no modificamos los headers
            console.log('No se encontró token. Continuando sin Authorization header.')
        }

        return config
    },
    (error) => {
        return Promise.reject(error)
    }
)

export default axiosConToken

"use client"
import LogueoRegister from '@/app/components/LogueoRegister/LogueoRegister'
import React, { useState } from 'react'
import { z } from 'zod'
import { logueo } from '@/utils/funciones-autenticacion'
import { Errors } from '@/common/interfaces/errors.interface'
import Link from 'next/link'

const logueoSchema = z.object({
    email: z.string().email({ message: "Email inválido" }),
    password: z.string().regex(/^(?=.*[A-Z])(?=.*\d)(?=.*[a-z])(?=.*[\W_]).{8,}$/, { message: "La contraseña debe tener al menos 8 caracteres, incluyendo una mayúscula, un número, una letra y un carácter especial" }),
})

const Login = () => {
    const [erroresZod, setErroresZod] = useState<z.ZodIssue[]>([])
    const [error, setError] = useState<Errors>({ message: '', code: 0 })
    const [loading, setLoading] = useState<boolean>(false)

    const loguearme = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        const formData = new FormData(e.currentTarget)

        const validation = logueoSchema.safeParse({
            email: formData.get('email'),
            password: formData.get('password'),
        })

        if (!validation.success) {
            console.error(validation.error.issues)
            setErroresZod(validation.error.issues)
            return
        }

        const data = {
            email: formData.get('email') as string,
            password: formData.get('password') as string
        }

        logueo(data, setErroresZod, setError, setLoading)
        e.currentTarget.reset()
    }

    const obtenerError = (path: string) => {
        const errorZod = erroresZod.filter(error => error.path[0] === path)
        return errorZod
    }

    return (
        <LogueoRegister>

            <div className="detalle">
                <p> Ingresá tu email y tu contraseña para continuar </p>
            </div>

            <form className="formulario" onSubmit={(e) => loguearme(e)}>
                <div className="contenedor-input">
                    <label className='label' htmlFor="email"> Tu dirección de email </label>
                    <input
                        className='input'
                        type="email"
                        name='email'
                        placeholder='Ingresá tu dirección de email'
                        required
                        style={{ backgroundColor: error.code ? '#f8d7da' : '', border: error.code === 500 ? '1.2px solid red' : '1.2px solid #F2F2F2' }}
                    />
                    {obtenerError('email').length > 0 && (
                        <div className="error-zod">
                            <p> {obtenerError('email')[0].message} </p>
                        </div>
                    )}
                </div>
                <div className="contenedor-input">
                    <label className='label' htmlFor="password"> Tu contraseña </label>
                    <input
                        className='input'
                        type="password"
                        name='password'
                        placeholder='Ingresá tu contraseña'
                        required
                        style={{ backgroundColor: error.code ? '#f8d7da' : '', border: error.code === 500 ? '1.2px solid red' : '1.2px solid #F2F2F2' }}
                    />
                    {obtenerError('password').length > 0 && (
                        <div className="error-zod">
                            <p> {obtenerError('password')[0].message} </p>
                        </div>
                    )}
                </div>

                <div className="contenedor-input">
                    <p className='label'> ¿Aún no tenés una cuenta? <Link className='link' href="/api/auth/register"> Registrate acá </Link> </p>
                </div>

                <div className="error-de-inicio-de-sesion">
                    {error.message && <p className='error-inicio-sesion-mensaje'> {error.message} </p>}
                </div>

                <div className="contenedor-boton">
                    <button type='submit'>
                        {loading ? 'Cargando...' : 'Iniciar sesión'}
                    </button>
                </div>
            </form>

        </LogueoRegister>
    )
}

export default Login
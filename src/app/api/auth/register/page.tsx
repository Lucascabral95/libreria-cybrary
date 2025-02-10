"use client"
import LogueoRegister from '@/app/components/LogueoRegister/LogueoRegister'
import { registro } from '@/utils/funciones-autenticacion'
import React, { useState } from 'react'
import { z } from 'zod'
import { AuthRegister } from '@/common/interfaces/auth.interface'
import { Errors } from '@/common/interfaces/errors.interface'
import Link from 'next/link'

const registerSchema = z.object({
    email: z.string().email({ message: "Email inválido" }),
    password: z.string().regex(/^(?=.*[A-Z])(?=.*\d)(?=.*[a-z])(?=.*[\W_]).{8,}$/, { message: "La contraseña debe tener al menos 8 caracteres, incluyendo una mayúscula, un número, una letra y un carácter especial" }),
    full_name: z.string().regex(/^\S+\s+\S{2,}$/, { message: "El nombre completo debe contener al menos un nombre y un apellido" }),
    role: z.enum(['admin', 'employee'], { message: "Not a valid role" }),
})

const Register = () => {
    const [erroresZod, setErroresZod] = useState<z.ZodIssue[]>([])
    const [error, setError] = useState<Errors>({ message: '', code: 0 })

    const registrarme = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const formData = new FormData(e.currentTarget)

        const validation = registerSchema.safeParse({
            email: formData.get('email'),
            password: formData.get('password'),
            full_name: formData.get('full_name'),
            role: formData.get('role'),
        })

        if (!validation.success) {
            console.error(validation.error.issues)
            setErroresZod(validation.error.issues)
            return
        }

        console.log({
            email: formData.get('email'),
            password: formData.get('password'),
            full_name: formData.get('full_name'),
            role: formData.get('role'),
        })

        const data = {
            email: formData.get('email') as string,
            password: formData.get('password') as string,
            full_name: formData.get('full_name') as string,
            role: formData.get('role'),
        }

        setErroresZod([])
        registro(data as AuthRegister, setErroresZod, setError)
        e.currentTarget.reset()
    }


    const obtenerError = (ruta: string) => {
        const erroresDeZod = erroresZod.filter(error => error.path[0] === ruta)

        return erroresDeZod
    }

    return (
        <LogueoRegister>

            <div className="detalle">
                <p> Ingresá un email, un nombre completo, un rol y una contraseña para continuar </p>
            </div>

            <form className="formulario" onSubmit={(e) => registrarme(e)}>
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
                    />
                    {obtenerError('password').length > 0 && (
                        <div className="error-zod">
                            <p> {obtenerError('password')[0].message} </p>
                        </div>
                    )}
                </div>
                <div className="contenedor-input">
                    <label className='label' htmlFor="full_name"> Tu nombre tu nombre completa </label>
                    <input
                        className='input'
                        type="text"
                        name='full_name'
                        placeholder='Ingresá tu nombre completo'
                        required
                    />
                    {obtenerError('full_name').length > 0 && (
                        <div className="error-zod">
                            <p> {obtenerError('full_name')[0].message} </p>
                        </div>
                    )}
                </div>
                <div className="contenedor-input">
                    <label className='label' htmlFor="role"> Tu rol en el software </label>
                    <select className='input' name="role" required>
                        <option value="employee"> Employee </option>
                        <option value="admin"> Admin </option>
                    </select>
                    {obtenerError('role').length > 0 && (
                        <div className="error-zod">
                            <p> {obtenerError('role')[0].message} </p>
                        </div>
                    )}
                </div>

                <div className="contenedor-input">
                    <p className='label'> ¿Ya tenés una cuenta? <Link className='link' href="/api/auth/login"> Iniciá sesión acá </Link> </p>
                </div>

                <div className="error-de-inicio-de-sesion">
                    {error.message && <p className='error-inicio-sesion-mensaje'> {error.message} </p>}
                </div>

                <div className="contenedor-boton">
                    <button type='submit'> Registrarme </button>
                </div>
            </form>

        </LogueoRegister>
    )
}

export default Register
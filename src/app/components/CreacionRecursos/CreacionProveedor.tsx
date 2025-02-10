'use client'
import React, { useState } from 'react'
import "@/app/api/auth/recursos/creacion/CreacionDeRecurso.scss"
import { CreacionProveedor } from '@/common/interfaces/creacion/Proveedor-creacion.interface'
import { Errors } from '@/common/interfaces/errors.interface'
import { crearProveedor } from '../Recursos/utils/crear-recursos.funciones'
import { Toaster } from 'react-hot-toast'

const CreacionDeProveedor = () => {
  const [formData, setFormData] = useState<CreacionProveedor>({} as CreacionProveedor)
  const [error, setError] = useState<Errors>({} as Errors)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }

  const creacion = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    crearProveedor(setError, formData, setFormData)
  }

  return (
    <div className='contenedor-creacion-de-recursos'>

      <div className="titulo-de-crecion-recurso">
        <h2> Creá un nuevo proveedor </h2>
      </div>

      <form onSubmit={(e) => creacion(e)} className="formulario-de-creacion-de-recurso">
        <div className="grupo-par">
          <div className="grupo-de-input">
            <label className='label-creacion' htmlFor="name"> Nombre </label>
            <input type="text" className="input-creacion" value={formData.name || ''} name='name' onChange={handleChange} placeholder='Nombre del proveedor' required />
          </div>
          <div className="grupo-de-input">
            <label className='label-creacion' htmlFor="sector"> Sector </label>
            <input type="text" className="input-creacion" name='sector' onChange={handleChange} value={formData.sector || ''} placeholder='Sector del proveedor' required />
          </div>
        </div>
        <div className="grupo-par">
          <div className="grupo-de-input">
            <label className='label-creacion' htmlFor="contact_email"> Email </label>
            <input type="email" className="input-creacion" onChange={handleChange} name='contact_email' value={formData.contact_email || ''} placeholder='Email del proveedor' required />
          </div>
          <div className="grupo-de-input">
            <label className='label-creacion' htmlFor="contact_phone"> Numero de telefono </label>
            <input type="text" onChange={handleChange} className="input-creacion" name='contact_phone' value={formData.contact_phone || ''} placeholder='Numero de telefono del proveedor' required />
          </div>
        </div>
        <div className="grupo-par">
          <div className="grupo-de-input">
            <label className='label-creacion' htmlFor="address"> Dirección </label>
            <input type="text" className="input-creacion" name='address' value={formData.address || ''} onChange={handleChange} placeholder='Dirección del proveedor' required />
          </div>
          <div className="grupo-de-input">
            <label className='label-creacion' htmlFor="website"> Sitio Web </label>
            <input type="text" className="input-creacion" name='website' value={formData.website || ''} onChange={handleChange} placeholder='Sitio Web del proveedor' required />
          </div>
        </div>
        <div className="boton-de-creacion-de-recurso">
          <button type='submit'> Crear proveedor </button>
        </div>
      </form>

      {error.message && <p style={{ color: 'red' }}> Error {error.code}: {error.message} </p>}

      <Toaster />

    </div>
  )
}

export default CreacionDeProveedor;
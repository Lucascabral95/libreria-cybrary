'use client'
import React, { useState } from 'react'
import "@/app/api/auth/recursos/creacion/CreacionDeRecurso.scss"
import { CreacionCategoria } from '@/common/interfaces/creacion/Categoria-creacion.interface'
import { crearCategoria } from '../Recursos/utils/crear-recursos.funciones'
import { Errors } from '@/common/interfaces/errors.interface'
import { Toaster } from 'react-hot-toast'

const CreacionDeCategoria = () => {
    const [formData, setFormData] = useState<CreacionCategoria>({} as CreacionCategoria)
   const [error, setError] = useState<Errors>({} as Errors)

    const handleChange = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement> | React.ChangeEvent<HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    }

  const creacion = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    
    crearCategoria( setError, formData, setFormData )
  }

  return (
    <div className='contenedor-creacion-de-recursos'>

      <div className="titulo-de-crecion-recurso">
        <h2> Creá un nueva categoría </h2>
      </div>

      <form onSubmit={(e) => creacion(e)} className="formulario-de-creacion-de-recurso">
        <div className="grupo-par">
          <div className="grupo-de-input">
            <label className='label-creacion' htmlFor="name"> Nombre  </label>
            <input type="text" className="input-creacion" name='name' value={formData.name || ''} placeholder='Nombre de la categoría' onChange={handleChange} required />
          </div>
          <div className="grupo-de-input">
            <label className='label-creacion' htmlFor="description"> Descripción  </label>
            <input type="text" className="input-creacion" name='description' value={formData.description || ''} placeholder='Descripcion de la categoria' onChange={handleChange} required />
          </div>
        </div>
        <div className="boton-de-creacion-de-recurso">
          <button type='submit'> Crear categoría </button>
        </div>
      </form>

      {error.message && <p style={{ color: 'red' }}> {error.message} </p>}

      <Toaster />

    </div>
  )
}

export default CreacionDeCategoria;
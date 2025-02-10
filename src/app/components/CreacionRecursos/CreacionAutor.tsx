'use client'
import React, { useState } from 'react';
import { CreacionAutor } from '@/common/interfaces/creacion/Autor-creacion.interface';
import "@/app/api/auth/recursos/creacion/CreacionDeRecurso.scss";
import { Errors } from '@/common/interfaces/errors.interface';
import { crearAutor } from '../Recursos/utils/crear-recursos.funciones';
import { Toaster } from 'react-hot-toast';
import Image from 'next/image';

const CreacionDeAutor = () => {
  const [formData, setFormData] = useState<CreacionAutor>({} as CreacionAutor);
  const [error, setError] = useState<Errors>({} as Errors);
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);

      setPreview(URL.createObjectURL(e.target.files[0]));
    }
  };

  const creacion = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formDataToSend = new FormData();
    formDataToSend.append('name', formData.name);
    formDataToSend.append('birth_date', formData.birth_date);
    formDataToSend.append('biography', formData.biography);
    formDataToSend.append('nacionality', formData.nacionality);
    if (file) {
      formDataToSend.append('image', file);
    }

    await crearAutor(setError, formDataToSend, setFormData, setFile, setPreview);
  };

  return (
    <div className='contenedor-creacion-de-recursos'>
      <div className="titulo-de-crecion-recurso">
        <h2> Creá un nuevo autor </h2>
      </div>

      <form onSubmit={creacion} className="formulario-de-creacion-de-recurso">
        <div className="grupo-par">
          <div className="grupo-de-input">
            <label className='label-creacion' htmlFor="name"> Nombre completo </label>
            <input type="text" className="input-creacion" value={formData.name || ''} onChange={handleChange} name='name' placeholder='Nombre del autor' required />
          </div>
          <div className="grupo-de-input">
            <label className='label-creacion' htmlFor="birth_date"> Fecha de nacimiento </label>
            <input type="text" className="input-creacion" name='birth_date' value={formData.birth_date || ''} onChange={handleChange} placeholder='Fecha de nacimiento del autor' required />
          </div>
        </div>
        <div className="grupo-par">
          <div className="grupo-de-input">
            <label className='label-creacion' htmlFor="biography"> Biografia </label>
            <textarea className="input-creacion" name='biography' value={formData.biography || ''} onChange={handleChange} placeholder='Biografia del autor' required />
          </div>
          <div className="grupo-de-input">
            <label className='label-creacion' htmlFor="nacionality"> Nacionalidad </label>
            <input type="text" className="input-creacion" name='nacionality' value={formData.nacionality || ''} onChange={handleChange} placeholder='Nacionalidad del autor' required />
          </div>
        </div>
        {preview ? (
          <div className="previsulizacion">
            <div className="preview-foto">
              <Image src={preview} alt="Preview" width={200} height={200} className='img' />
            </div>
            <div className="cierre-previsulizacion" onClick={() => setPreview(null)}>
              <button> Cancelar imagen </button>
            </div>
          </div>
        ) : (
          <div className="grupo-par">
            <div className="grupo-de-input">
              <label className='label-creacion' htmlFor="image"> Fotografia </label>
              <input type="file" className="input-creacion" name='image' onChange={handleFileChange} placeholder='Fotografia del autor' accept="image/*" />
            </div>
          </div>
        )}
        <div className="boton-de-creacion-de-recurso">
          <button type='submit'> Crear autor </button>
        </div>
      </form>

      {error.message && <p style={{ color: 'red' }}> Error {error.code}: {error.message} </p>}

      <Toaster />
    </div>
  );
};

export default CreacionDeAutor;
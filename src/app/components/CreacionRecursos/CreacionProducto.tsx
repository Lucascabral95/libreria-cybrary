'use client'
import React, { useEffect, useState } from 'react'
import "@/app/api/auth/recursos/creacion/CreacionDeRecurso.scss"
import { CreacionProducto } from '@/common/interfaces/creacion/Producto-creacion.interface'
import { recursosDeProductos } from '../Inventario/utils/actualizar/actualizar-recursos'
import { Errors } from '@/common/interfaces/errors.interface'
import { Proveedores } from '@/common/interfaces/proveedores.interface'
import { Categorias } from '@/common/interfaces/categorias-recomendadas.interface'
import { crearProducto } from '../Recursos/utils/crear-recursos.funciones'
import { Toaster } from 'react-hot-toast'
import { Autor } from '@/common/interfaces/autor-interface'
import Image from 'next/image'

const CreacionDeProducto = () => {
  const [formData, setFormData] = useState<CreacionProducto>({} as CreacionProducto)
  const [error, setError] = useState<Errors>({} as Errors)
  const [proveedores, setProveedores] = useState<Proveedores[]>([])
  const [categorias, setCategorias] = useState<Categorias[]>([])
  const [autor, setAutor] = useState<Autor[]>([])
  const [preview, setPreview] = useState<string | null>(null);
  const [image, setImage] = useState<File | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement> | React.ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    const newValue = name === 'quantity_pages' || name === 'price' || name === 'stock' || name === 'category_id' || name === 'supplier_id' ? Number(value) : value

    setFormData((prev) => ({ ...prev, [name]: newValue }));
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0]);

      setPreview(URL.createObjectURL(e.target.files[0]));
    }
  };

  useEffect(() => {
    recursosDeProductos(setProveedores, setCategorias, setAutor, setError)
  }, [])

  const creacion = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const formDataToSend = new FormData();
    formDataToSend.append('name', formData.name);
    formDataToSend.append('author', formData.author);
    formDataToSend.append('publication_date', formData.publication_date);
    formDataToSend.append('synopsis', formData.synopsis);
    formDataToSend.append('language', formData.language);
    formDataToSend.append("quantity_pages", formData.quantity_pages.toString());
    formDataToSend.append("price", formData.price.toString());
    formDataToSend.append("stock", formData.stock.toString());
    formDataToSend.append("category_id", formData.category_id.toString());
    formDataToSend.append("supplier_id", formData.supplier_id.toString());
    if (image) {
      formDataToSend.append('image', image);
    }

    await crearProducto(setError, formDataToSend, setFormData, setImage, setPreview);
  }

  return (
    <div className='contenedor-creacion-de-recursos'>

      <div className="titulo-de-crecion-recurso">
        <h2> Creá un nuevo libro </h2>
      </div>

      <form onSubmit={(e) => creacion(e)} className="formulario-de-creacion-de-recurso">
        <div className="grupo-par">
          <div className="grupo-de-input">
            <label className='label-creacion' htmlFor="name"> Nombre </label>
            <input type="text" className="input-creacion" name='name' value={formData.name || ''} placeholder='Nombre del libro' onChange={handleChange} required />
          </div>
          <div className="grupo-de-input">
            <label className='label-creacion' htmlFor="author"> Autor </label>
            <select name="author" id="author" className="input-creacion" value={formData.author || ''} onChange={handleChange} required>
              <option value={""} disabled selected> Seleccioná un autor </option>
              {autor.map((autor) => (
                <option key={autor.id} value={autor.name}> {autor.name} </option>
              ))}
            </select>
          </div>
        </div>
        <div className="grupo-par">
          <div className="grupo-de-input">
            <label className='label-creacion' htmlFor="publication_date"> Fecha de publicación </label>
            <input type="text" className="input-creacion" value={formData.publication_date || ''} name='publication_date' placeholder='Email del libro' onChange={handleChange} required />
          </div>
          <div className="grupo-de-input">
            <label className='label-creacion' htmlFor="synopsis"> Sinopsis </label>
            <textarea name="synopsis" id="synopsis" maxLength={690} value={formData.synopsis || ''} className="input-creacion" placeholder='Sinopsis del libro' onChange={handleChange} required />
          </div>
        </div>
        <div className="grupo-par">
          <div className="grupo-de-input">
            <label className='label-creacion' htmlFor="quantity_pages"> Cantidad de páginas </label>
            <input type="number" className="input-creacion" value={formData.quantity_pages || ''} name='quantity_pages' placeholder='Cantidad de paginas del libro' onChange={handleChange} required />
          </div>
          <div className="grupo-de-input">
            <label className='label-creacion' htmlFor="language"> Idioma </label>
            <select name="language" id="language" value={formData.language || ''} className="input-creacion" onChange={handleChange} required>
              <option value={""} disabled selected> Seleccioná un idioma </option>
              <option value={"Español"}> Español </option>
              <option value={"Ingles"}> Inglés </option>
            </select>
          </div>
        </div>
        <div className="grupo-par">
          <div className="grupo-de-input">
            <label className='label-creacion' htmlFor="category_id"> Categoria </label>
            <select name="category_id" id="language" className="input-creacion" value={formData.category_id || ''} onChange={handleChange} required>
              <option value={""} disabled selected> Seleccioná una categoría </option>
              {categorias.map((categoria) => (
                <option key={categoria.id} value={categoria.id}>{categoria.name}</option>
              ))}
            </select>
          </div>
          <div className="grupo-de-input">
            <label className='label-creacion' htmlFor="supplier_id"> Proveedor </label>
            <select name="supplier_id" id="supplier_id" className="input-creacion" value={formData.supplier_id || ''} onChange={handleChange} required >
              <option value={""} disabled selected> Seleccioná un proveedor  </option>
              {proveedores.map((proveedor) => (
                <option key={proveedor.id} value={proveedor.id}> {proveedor.name} </option>
              ))}
            </select>
          </div>
        </div>
        <div className="grupo-par">
          <div className="grupo-de-input">
            <label className='label-creacion' htmlFor="price"> Precio </label>
            <input type="number" className="input-creacion" name='price' value={formData.price || ''} placeholder='Precio del libro' onChange={handleChange} required />
          </div>
          <div className="grupo-de-input">
            <label className='label-creacion' htmlFor="stock"> Stock </label>
            <input type="number" className="input-creacion" name='stock' value={formData.stock || ''} placeholder='Stock del libro' onChange={handleChange} required />
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
          <button type='submit'> Crear libro </button>
        </div>
      </form>

      {error.message && <p className='error'> Error {error.code}: {error.message} </p>}

      <Toaster />

    </div>
  )
}

export default CreacionDeProducto;
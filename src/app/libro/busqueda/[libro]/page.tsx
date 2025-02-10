'use client'
import React, { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import MainPrincipal from '@/app/components/MainPrincipal/MainPrincipal'
import { Errors } from '@/common/interfaces/errors.interface'
import Loading from '@/app/components/Loading/Loading'
import MapeoLibros from '@/app/components/MapeoLibros/MapeoLibros'
import { Product } from '@/common/interfaces/products.interface'
import ErrorRequest from '@/app/components/ErrorRequest/ErrorRequest'
import { obtenerTodosLosLibros } from '@/utils/funciones-libros'
import '../../imprescindibles/LibrosImprescindibles.scss'

const LibrosBuscados = () => {
  const { libro } = useParams() as { libro: string }
  const [loading, setLoading] = useState<boolean>(true)
  const [error, ] = useState<Errors>({ message: '', code: 200 })
  const [libros, setLibros] = useState<Product[]>([])

  useEffect(() => {
    if (libro) {
      obtenerTodosLosLibros(libro, setLibros, setLoading)
    }
  }, [libro])

  return (
    <MainPrincipal excedente={true} fichaAutor={false}>

      {loading ? (
        <Loading />
      ) : error.code === 500 ? (
        <ErrorRequest code={error.code} message={'Internal Server Error'} />
      ) : libros.length === 0 ? (
        <ErrorRequest code={404} message={'Books not found'} detalle={`No books found for '${libro}'`} />
      ) : (
        <div>
          <MapeoLibros
            titulo={
              <div className='libros-imprescindibles'>
                <div className="titulo">
                  <h2> Libros buscados </h2>
                </div>
                <div className="descripcion-seccion">
                  <p> Estos son los libros que coinciden con tu búsqueda </p>
                </div>
              </div>
            }
            libros={libros} />
        </div>
      )}

    </MainPrincipal>
  )
}

export default LibrosBuscados
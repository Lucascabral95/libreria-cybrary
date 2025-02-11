import React, { useEffect, useState } from 'react'
import MainRecurosSeccion from './MainRecursos/MainRecursos'
import { Autor } from '@/common/interfaces/autor-interface'
import { obtenerAutores } from './MainRecursos/utils/obtener-recursos.funciones'
import Image from 'next/image'
import Paginacion from './Paginacion/Paginacion'
import { Errors } from '@/common/interfaces/errors.interface'
import ErrorLoad from '@/common/ErrorLoad/ErrorLoad'

const Autores = () => {
  const [autores, setAutores] = useState<Autor[]>([])
  const [autoresAMostrar, ] = useState<number>(10)
  const [numeroPagina, setNumeroPagina] = useState<number>(0)
  const [cantidadPaginas, setCantidadPaginas] = useState<number>(0)
  const [error, setError] = useState<Errors>({ message: '', code: 0 })
  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    obtenerAutores(setAutores, autoresAMostrar, numeroPagina, setCantidadPaginas, setError, setLoading)
  }, [numeroPagina])

  return (
    <MainRecurosSeccion
      crear={true}
      recurso='autor'
      activo='Autores'
      filas={
        loading ? (
          <p> Cargando... </p>
        ) : error.code === 500 ? (
          <ErrorLoad message={error.message} code={error.code} />
        ) : (
          <tr>
            <th> Imagen </th>
            <th> Nombre </th>
            <th> Nacionalidad </th>
            <th> Nacimiento </th>
          </tr>
        )
      }
      columnas={
        loading ? (
          <p> Cargando... </p>
        ) : error.code === 500 ? (
          null
        ) :
          autores?.map((item, index) =>
          (
            <tr onClick={() => window.location.href = `/api/auth/recursos/inventario/autor/${item.slug}`} key={index}>
              <td style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Image className='imagen-del-autor-table' width={32} height={32} alt={item.name} src={`${process.env.NEXT_PUBLIC_PATH_EXTERNAL}/api/v1/author/image/author/${item.image}`} />
              </td>
              <td> {item.name} </td>
              <td> {item.nacionality} </td>
              <td> {item.birth_date} </td>
            </tr>
          )
          )}
      paginacion={
        error.code === 5 ?
          null
          :
          autores.length > 0 &&
          <Paginacion offset={numeroPagina} setOffset={setNumeroPagina} cantidadPaginas={cantidadPaginas} />
      }
    />
  )
}

export default Autores
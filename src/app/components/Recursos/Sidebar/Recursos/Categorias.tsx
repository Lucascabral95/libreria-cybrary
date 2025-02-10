import React, { useEffect, useState } from 'react'
import MainRecurosSeccion from './MainRecursos/MainRecursos'
import { obtenerCategorias } from './MainRecursos/utils/obtener-recursos.funciones'
import { Categorias } from '@/common/interfaces/categorias-recomendadas.interface'
import Paginacion from './Paginacion/Paginacion'
import { Errors } from '@/common/interfaces/errors.interface'
import ErrorLoad from '@/common/ErrorLoad/ErrorLoad'

const CategoriasSeccion = () => {
  const [categorias, setCategorias] = useState<Categorias[]>([])
  const [categoriasAMostrar, ] = useState<number>(10)
  const [numeroPagina, setNumeroPagina] = useState<number>(0)
  const [cantidadPaginas, setCantidadPaginas] = useState<number>(0)
  const [error, setError] = useState<Errors>({ message: '', code: 0 })
  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    obtenerCategorias(setCategorias, categoriasAMostrar, numeroPagina, setCantidadPaginas, setLoading, setError)
  }, [numeroPagina])

  return (
    <MainRecurosSeccion
      crear={true}
      recurso='categoria'
      activo='Categorías'

      filas={
        loading ? (
          <p> Cargando... </p>
        ) : error.code === 500 ? (
          <ErrorLoad message={error.message} code={error.code} />
        ) : (
          <tr>
            <th> Nombre </th>
            <th> Slug </th>
            <th> Fecha de creación </th>
          </tr>
        )
      }
      columnas={
        loading ? (
          <p> Cargando... </p>
        ) : error.code === 500 ? (
          null
        ) : (
          categorias?.map((item, index) => (
            <tr onClick={() => window.location.href = `/api/auth/recursos/inventario/categoria/${item.slug}`} key={index}>
              <td> {item.name} </td>
              <td> {item.slug} </td>
              <td> {item.created_at} </td>
            </tr>
          ))
        )
      }
      paginacion={
        error.code === 500 ?
          null :
          categorias.length > 0 &&
          <Paginacion offset={numeroPagina} setOffset={setNumeroPagina} cantidadPaginas={cantidadPaginas} />
      }

    />
  )
}

export default CategoriasSeccion
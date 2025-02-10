import React, { useEffect, useState } from 'react'
import MainRecurosSeccion from './MainRecursos/MainRecursos'
import { obtenerProveedores } from './MainRecursos/utils/obtener-recursos.funciones'
import { Proveedores } from '@/common/interfaces/proveedores.interface';
import Paginacion from './Paginacion/Paginacion';
import { Errors } from '@/common/interfaces/errors.interface';
import ErrorLoad from '@/common/ErrorLoad/ErrorLoad';

const ProveedoresSeccion = () => {
  const [proveedores, setProveedores] = useState<Proveedores[]>([]);
  const [proveedoresAMostrar, ] = useState<number>(10)
  const [numeroPagina, setNumeroPagina] = useState<number>(0)
  const [cantidadPaginas, setCantidadPaginas] = useState<number>(0)
  const [error, setError] = useState<Errors>({ message: '', code: 0 })
  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    obtenerProveedores(setProveedores, proveedoresAMostrar, numeroPagina, setCantidadPaginas, setLoading, setError)
  }, [numeroPagina])

  return (
    <MainRecurosSeccion
      crear={true}
      recurso='proveedor'
      activo='Proveedores'
      filas={
        loading ? (
          <p> Cargando... </p>
        ) : error.code === 500 ? (
          <ErrorLoad message={error.message} code={error.code} />
        ) : (
          <tr>
            <th> Nombre </th>
            <th> Email </th>
            <th> N° de celular </th>
            <th> Dirección </th>
            <th> Sector </th>
          </tr>
        )
      }
      columnas={
        loading ? (
          <p> Cargando... </p>
        ) : error.code === 500 ? (
          null
        ) : (
          proveedores?.map((item, index) => (
            <tr onClick={() => window.location.href = `/api/auth/recursos/inventario/proveedor/${item.id}`} key={index}>
              <td> {item.name} </td>
              <td> {item.contact_email} </td>
              <td> {item.contact_phone} </td>
              <td> {item.address} </td>
              <td> {item.sector} </td>
            </tr>
          )
          ))
      }
      paginacion={
        error.code === 500 ?
          null
          :
          proveedores.length > 0 &&
          <Paginacion offset={numeroPagina} setOffset={setNumeroPagina} cantidadPaginas={cantidadPaginas} />
      }
    />
  )
}

export default ProveedoresSeccion;
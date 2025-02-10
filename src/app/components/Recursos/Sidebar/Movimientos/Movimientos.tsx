import React, { useEffect, useState } from 'react'
import MainRecurosSeccion from '../Recursos/MainRecursos/MainRecursos'
import { obtenerMovimientosConProductos } from '../Recursos/MainRecursos/utils/obtener-recursos.funciones'
import { StockMovimientosWithUsuarioYProducto } from '@/common/interfaces/stock-movimientos.interface'
import { formatNumeroPorMilesYMillones } from '@/common/functions/FormatearMilesYMillones'
import { Errors } from '@/common/interfaces/errors.interface'
import ErrorLoad from '@/common/ErrorLoad/ErrorLoad'

const Autores = () => {
  const [movimientos, setMovimientos] = useState<StockMovimientosWithUsuarioYProducto[]>([])
  const [error, setError] = useState<Errors>({ message: '', code: 0 })
  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    obtenerMovimientosConProductos(setMovimientos, setError, setLoading)
  }, [])

  return (
    <MainRecurosSeccion
      crear={true}
      recurso='movimiento'
      activo='Movimientos'

      filas={
        loading ? (
          <p> Cargando... </p>
        ) : error.code === 500 ? (
          <ErrorLoad message={error.message} code={error.code} />
        ) : (
          <tr>
            <th> Empleado que realizó el movimiento </th>
            <th> Tipo de movimiento </th>
            <th> Producto del movimiento </th>
            <th> Cantidad </th>
            <th> Monto total </th>
          </tr>
        )
      }

      columnas={
        loading ? (
          <p> Cargando... </p>
        ) : (
          movimientos?.map((item, index) => (
            <tr onClick={() => window.location.href = `/api/auth/recursos/inventario/movimiento/${item.id}`} key={index}>
              <td> {item.users_full_name} </td>
              <td> {item.movement_type === 'in' ? 'Compra' : 'Venta'} </td>
              <td> {item.product_name} </td>
              <td> {item.quantity} </td>
              <td> $ {formatNumeroPorMilesYMillones(item.quantity * item.product_price)} </td>
            </tr>
          ))
        )}

    />
  )
}

export default Autores
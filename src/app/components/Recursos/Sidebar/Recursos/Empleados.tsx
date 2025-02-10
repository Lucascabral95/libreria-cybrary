import React, { useEffect, useState } from 'react'
import MainRecurosSeccion from './MainRecursos/MainRecursos'
import { obtenerEmpleados } from './MainRecursos/utils/obtener-recursos.funciones'
import { Empleado } from '@/common/interfaces/empleado.interface'

const Empleados = () => {
    const [empleados, setEmpleados] = useState<Empleado[]>([])

    useEffect(() => {
        obtenerEmpleados(setEmpleados)
    }, [])

    return (
        <MainRecurosSeccion
            crear={false}
            recurso='empleado'
            activo='Empleados'
            filas={
                <tr>
                    <th> Nombre Completo </th>
                    <th> Email </th>
                    <th> Estado </th>
                    <th> Rol </th>
                </tr>
            }
            columnas={
                empleados?.map((item, index) =>
                (
                    <tr onClick={() => window.location.href = `/api/auth/recursos/inventario/empleado/${item.id}`} key={index}>
                        <td> {item.full_name} </td>
                        <td> {item.email} </td>
                        <td style={{ color: item.is_active ? 'green' : 'red' }} > {item.is_active ? 'Activo' : 'Inactivo'} </td>
                        <td style={{ textTransform: 'capitalize', color: item.role === 'admin' ? 'var(--color-fondo-boton)' : 'black', fontWeight: item.role === 'admin' ? 'bold' : 'normal' }}> {item.role} </td>
                    </tr>
                )
                )}
        />
    )
}

export default Empleados
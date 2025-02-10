"use client"
import React from 'react'
import "../CreacionDeRecurso.scss"
import { useParams } from 'next/navigation'
import MainRecursos from '@/app/components/Recursos/MainRecursos/MainRecursos'
import { DetallesRecursosSinEmpleado, recursosValidadosSinEmpleado } from '@/common/interfaces/seccion-actual.type'
import ErrorRecursos from '@/app/components/Recursos/ErrorRecursos/ErrorRecursos'
import CreacionDeAutor from '@/app/components/CreacionRecursos/CreacionAutor'
import CreacionDeCategoria from '@/app/components/CreacionRecursos/CreacionCategoria'
import CreacionDeStockMovimiento from '@/app/components/CreacionRecursos/CreacionMovimientoStock'
import CreacionDeProveedor from '@/app/components/CreacionRecursos/CreacionProveedor'
import CreacionDeProducto from '@/app/components/CreacionRecursos/CreacionProducto'

const CreacionDeRecurso = () => {
    const { slug } = useParams() as { slug: DetallesRecursosSinEmpleado };

    if (!recursosValidadosSinEmpleado.includes(slug as DetallesRecursosSinEmpleado)) {
        return (
            <ErrorRecursos message="La sección solicitada no existe" />
        )
    }

    return (
        <MainRecursos>

            <div className='creacion-de-recursos'>

                {slug === 'movimiento' ? (
                    <CreacionDeStockMovimiento />
                ) : slug === 'producto' ? (
                    <CreacionDeProducto />
                ) : slug === "categoria" ? (
                    <CreacionDeCategoria />
                ) : slug === 'proveedor' ? (
                    <CreacionDeProveedor />
                ) : slug === 'autor' ? (
                    <CreacionDeAutor />
                ) : null}

            </div>

        </MainRecursos>
    )
}

export default CreacionDeRecurso
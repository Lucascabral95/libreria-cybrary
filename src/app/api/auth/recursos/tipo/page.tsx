"use client"
import React from 'react'
import "../Recursos.scss"
import MainRecursos from '@/app/components/Recursos/MainRecursos/MainRecursos'
import Inicio from '@/app/components/Recursos/Sidebar/Inicio/Inicio'
import useStoreZustand from '@/zustand'
import Movimientos from '@/app/components/Recursos/Sidebar/Movimientos/Movimientos'
import Productos from '@/app/components/Recursos/Sidebar/Recursos/Productos'
import Autores from '@/app/components/Recursos/Sidebar/Recursos/Autores'
import CategoriasSeccion from '@/app/components/Recursos/Sidebar/Recursos/Categorias'
import ProveedoresSeccion from '@/app/components/Recursos/Sidebar/Recursos/Proveedores'

const Recursos = () => {
    const { seccionActual } = useStoreZustand();

    return (
        <MainRecursos>
            {seccionActual === 'inicio' ?
                <Inicio />
                : seccionActual === 'movimientos' ?
                    <Movimientos />
                    : seccionActual === 'categorias' ?
                        <CategoriasSeccion />
                        : seccionActual === 'proveedores' ?
                            <ProveedoresSeccion />
                            : seccionActual === 'autores' ?
                                <Autores />
                                : <Productos />
            }
        </MainRecursos>
    )
}

export default Recursos;
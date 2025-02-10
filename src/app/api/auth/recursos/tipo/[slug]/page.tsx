"use client"
import React, { useEffect, useState } from 'react'
import "../../Recursos.scss"
import MainRecursos from '@/app/components/Recursos/MainRecursos/MainRecursos'
import { obtenerDatosDeSesion } from '@/utils/funciones-auth'
import { UserJWT } from '@/common/interfaces/user-jwt.interface'
import Inicio from '@/app/components/Recursos/Sidebar/Inicio/Inicio'
import useStoreZustand from '@/zustand'
import Movimientos from '@/app/components/Recursos/Sidebar/Movimientos/Movimientos'
import Autores from '@/app/components/Recursos/Sidebar/Recursos/Autores'
import CategoriasSeccion from '@/app/components/Recursos/Sidebar/Recursos/Categorias'
import ProveedoresSeccion from '@/app/components/Recursos/Sidebar/Recursos/Proveedores'
import { useParams } from 'next/navigation'
import { SeccionActual, seccionesValidadas } from '@/common/interfaces/seccion-actual.type'
import ErrorRecursos from '@/app/components/Recursos/ErrorRecursos/ErrorRecursos'
import Empleados from '@/app/components/Recursos/Sidebar/Recursos/Empleados'
import Productos from '@/app/components/Recursos/Sidebar/Recursos/Productos'

const Recursos = () => {
  const [ , setDatosDeSesion] = useState<Partial<UserJWT>>({});
  const [loading, setLoading] = useState<boolean>(true);
  const { seccionActual, setSeccionActual } = useStoreZustand();
  const [error, setError] = useState<string | null>(null);
  const { slug } = useParams() as { slug: string };

  useEffect(() => {
    if (slug && seccionesValidadas.includes(slug as SeccionActual)) {
      setSeccionActual(slug as SeccionActual);
      obtenerDatosDeSesion(setDatosDeSesion, setLoading)
      setLoading(false);
    } else {
      setError('La sección solicitada no existe');
    }
  }, [slug, seccionActual])

  if (error) {
    return (
      <ErrorRecursos message={error} />
    )
  }

  return (
    <MainRecursos>
      {loading ? (
        <p> Cargando... </p>
      ) : (
        <>
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
                    : seccionActual === 'empleados' ?
                      <Empleados />
                      : <Productos />
          }

        </>
      )}
    </MainRecursos>
  )
}

export default Recursos;    
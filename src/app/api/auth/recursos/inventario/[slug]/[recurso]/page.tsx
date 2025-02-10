"use client"
import React from 'react'
import "../../DetalleRecurso.scss"
import { useParams } from 'next/navigation'
import { DetallesRecursos } from '@/common/interfaces/seccion-actual.type'
import RecursosSlug from '@/app/components/Recursos/Slug/RecursosSlug'

const RecursoDetalle = () => {
  const { slug, recurso  } = useParams() as { slug: DetallesRecursos, recurso: string | number };

  return (
     <div>
       <RecursosSlug params={ { slug, recurso }} />
     </div>
  )
}

export default RecursoDetalle
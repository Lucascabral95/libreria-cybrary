"use client"
import React, { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import MainRecurosSeccion from '@/app/components/Recursos/Sidebar/Recursos/MainRecursos/MainRecursos'
import { Errors } from '@/common/interfaces/errors.interface'
import ErrorLoad from '@/common/ErrorLoad/ErrorLoad'
import { Product } from '@/common/interfaces/products.interface'
import Image from 'next/image'
import { obtenerTodosLosLibros } from '@/utils/funciones-libros'

const LibrosBuscados = () => {
    const { libros } = useParams() as { libros: string }
    const [loading, setLoading] = useState<boolean>(true)
    const [error] = useState<Errors>({ message: '', code: 200 })
    const [librosFiltrados, setLibrosFiltrados] = useState<Product[]>([])

    useEffect(() => {
    
        obtenerTodosLosLibros(libros, setLibrosFiltrados, setLoading)
        
    }, [libros])

    return (
        <MainRecurosSeccion
            crear={false}
            recurso='Productos'
            activo='Productos'
            filas={
                loading ? (
                    <p> Cargando... </p>
                ) : error.code === 500 ? (
                    <ErrorLoad message={error.message} code={error.code} />
                ) : (
                    <tr>
                        <th className='imagen-table-titulo'> Imagen </th>
                        <th className='name-table-titulo'> Nombre </th>
                        <th className='sku-table-titulo'> Sku </th>
                        <th className='stock-table-titulo'> Stock </th>
                        <th className='price-table-titulo'> Precio </th>
                    </tr>
                )
            }
            columnas={
                loading ? (
                    <p> Cargando... </p>
                ) : error.code === 500 ? (
                    null
                ) :
                    librosFiltrados?.map((item, index) =>
                    (
                        <tr key={index}>
                            <td style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <Image className='imagen-del-autor-table' width={32} height={32} alt={item.name} src={`${process.env.NEXT_PUBLIC_PATH}/api/v1/product/image/product/${item.image}`} />
                            </td>
                            <td className='name-table'>{item.name}</td>
                            <td className='sku-table' >{item.sku}</td>
                            <td className='stock-table'>{item.stock}</td>
                            <td className='price-table'>$ {item.price}</td>
                        </tr>
                    )
                    )}
        />
    )
}

export default LibrosBuscados
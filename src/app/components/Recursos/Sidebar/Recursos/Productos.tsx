import React, { useEffect, useState, useMemo } from 'react'
import MainRecurosSeccion from './MainRecursos/MainRecursos'
import { obtenerProductos } from './MainRecursos/utils/obtener-recursos.funciones'
import { Product } from '@/common/interfaces/products.interface'
import Image from 'next/image'
import Paginacion from './Paginacion/Paginacion'
import { Errors } from '@/common/interfaces/errors.interface'
import ErrorLoad from '@/common/ErrorLoad/ErrorLoad'

const Productos = () => {
    const [productos, setProductos] = useState<Product[]>([])
    const [productosAMostrar, ] = useState<number>(10)
    const [numeroPagina, setNumeroPagina] = useState<number>(0)
    const [cantidadPaginas, setCantidadPaginas] = useState<number>(0)
    const [error, setError] = useState<Errors>({ message: '', code: 200 })
    const [loading, setLoading] = useState<boolean>(true)

    useEffect(() => {
        obtenerProductos(setProductos, productosAMostrar, numeroPagina, setCantidadPaginas, setError, setLoading)
    }, [numeroPagina])

    const filas = useMemo(() => (
        <tr>
            <th className='imagen-table-titulo'> Imagen </th>
            <th className='name-table-titulo'> Nombre </th>
            <th className='sku-table-titulo'> Sku </th>
            <th className='stock-table-titulo'> Stock </th>
            <th className='price-table-titulo'> Precio </th>
        </tr>
    ), [])

    const columnas = useMemo(() => (
        productos.map((item, index) => (
            <tr onClick={() => window.location.href = `/api/auth/recursos/inventario/producto/${item.slug}`} key={index} >
                <td style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Image
                        className='imagen-del-producto-table'
                        width={32}
                        height={32}
                        alt={item.name}
                        src={`${process.env.NEXT_PUBLIC_PATH}/api/v1/product/image/product/${item.image}`}
                    />
                </td>
                <td className='name-table'>{item.name}</td>
                <td className='sku-table' >{item.sku}</td>
                <td className='stock-table'>{item.stock}</td>
                <td className='price-table'>$ {item.price}</td>
            </tr>
        ))
    ), [productos])

    return (
        <MainRecurosSeccion
            crear={true}
            recurso='producto'
            activo='Productos'
            filas={
                loading ? (
                    <p> Cargando... </p>
                ) : error.code === 500 ? (
                    <ErrorLoad message={error.message} code={error.code} />
                ) : (
                    filas
                )
            }
            columnas={
                loading ? (
                    <p> Cargando... </p>
                ) : error.code === 500 ? (
                    null
                ) : (
                    columnas
                )
            }
            paginacion={
                error.code === 500 ?
                    null
                    :
                    productos.length > 0 &&
                    <Paginacion offset={numeroPagina} setOffset={setNumeroPagina} cantidadPaginas={cantidadPaginas} />
            }
        />
    )
}

export default Productos

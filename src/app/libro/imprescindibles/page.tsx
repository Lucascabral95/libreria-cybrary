'use client'
import MainPrincipal from '@/app/components/MainPrincipal/MainPrincipal';
import React, { useEffect, useState } from 'react'
import { obtenerLosMejoresLibrosHasta100 } from '@/utils/funciones-libros';
import { Errors } from '@/common/interfaces/errors.interface';
import { Product } from '@/common/interfaces/products.interface';
import Loading from '@/app/components/Loading/Loading';
import MapeoLibros from '@/app/components/MapeoLibros/MapeoLibros';
import "./LibrosImprescindibles.scss"
import ErrorRequest from '@/app/components/ErrorRequest/ErrorRequest';

const LibrosImprescindibles = () => {
    const [error, setError] = useState<Errors>({ message: '', code: 200 })
    const [loading, setLoading] = useState<boolean>(true)
    const [libros, setLibros] = useState<Product[]>([])

    useEffect(() => {
        obtenerLosMejoresLibrosHasta100( setLibros, setError, setLoading )
    }, [])

    return (
        <MainPrincipal excedente={true} fichaAutor={false}>

            {loading ? (
                <Loading />
            ) : error.code === 500 ? (
                <ErrorRequest code={error.code} message={'Internal Server Error'} />
            ) : (
                <div>
                    <MapeoLibros
                        libros={libros}
                        titulo={
                            <div className='libros-imprescindibles'>
                                <div className="titulo">
                                    <h2> Libros imprescindibles </h2>
                                </div>
                                <div className="descripcion-seccion">
                                    <p> Títulos esenciales para todo amante de la lectura </p>
                                </div>
                            </div>
                        }
                    />
                </div>
            )}

        </MainPrincipal>
    )
}

export default LibrosImprescindibles;
"use client"
import React, { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import MainPrincipal from '@/app/components/MainPrincipal/MainPrincipal'
import "./Categoria.scss"
import { Categorias } from '@/common/interfaces/categorias-recomendadas.interface'
import { Product } from '@/common/interfaces/products.interface'
import { Errors } from '@/common/interfaces/errors.interface'
import { obtenerLibrosPorCategoria } from '@/utils/funciones-libros'
import MapeoLibros from '@/app/components/MapeoLibros/MapeoLibros'
import { obtenerCategoria } from '@/utils/funciones-categorias'
import ErrorRequest from '@/app/components/ErrorRequest/ErrorRequest'
import Loading from '@/app/components/Loading/Loading'

const CategoriaLibro: React.FC = () => {
    const { slug } = useParams()
    const [dataCategoria, setDataCategoria] = useState<Partial<Categorias>>({})
    const [librosCategoria, setLibrosCategoria] = useState<Product[]>([])
    const [ , setError] = useState<Partial<Errors>>({})
    const [errorCategoria, setErrorCategoria] = useState<Partial<Errors>>({})
    const [loading, setLoading] = useState<boolean>(true)
    const [loadingLibros, setLoadingLibros] = useState<boolean>(true)

    useEffect(() => {
        if (slug) {
            obtenerCategoria(slug, setDataCategoria, setErrorCategoria, setLoading)
        }
    }, [slug])

    useEffect(() => {
        if (slug) {
            obtenerLibrosPorCategoria(slug as string, setLibrosCategoria, setError, setLoadingLibros)
        }
    }, [slug])

    return (
        <MainPrincipal excedente={true} fichaAutor={false}>

            {loading ?

                <Loading />

                :

                <section className="categoria-libro">
                    {errorCategoria.code !== 200
                        ?
                        <ErrorRequest code={errorCategoria.code as number} message={errorCategoria.message as string} detalle='No books available in this category.' />
                        :
                        <div className="contenedor-categoria-libro">
                            <div className="titulo-de-categoria">
                                <h2> {dataCategoria?.name} </h2>
                            </div>

                            <div className="descripcion-de-categoria">
                                <p> {dataCategoria?.description} </p>
                            </div>

                            {loadingLibros ?
                                null
                                :
                                librosCategoria.length > 0 ?
                                    <MapeoLibros libros={librosCategoria} />
                                    :
                                    <ErrorRequest code={404} message="No books in this category" detalle='No books available in this category.' />
                            }

                        </div>
                    }
                </section>

            }

        </MainPrincipal>
    )
}

export default CategoriaLibro
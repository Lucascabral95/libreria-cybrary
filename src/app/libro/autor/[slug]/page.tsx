"use client"
import React, { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import "./Autor.scss"
import MainPrincipal from '@/app/components/MainPrincipal/MainPrincipal'
import { obtenerLibrosDelAutor, obtenerAutorPorSlug } from '@/utils/funciones-autores'
import { Errors } from '@/common/interfaces/errors.interface'
import { ProductWithAuthor } from '@/common/interfaces/products-with-author-interface'
import Image from 'next/image'
import { FaHome } from "react-icons/fa";
import Loading from '@/app/components/Loading/Loading'
import MapeoLibros from '@/app/components/MapeoLibros/MapeoLibros'
import { Autor } from '@/common/interfaces/autor-interface'

const LibrosPorAutor: React.FC = () => {
    const { slug } = useParams()
    const [librosDelAutor, setLibrosDelAutor] = useState<ProductWithAuthor[]>([])
    const [datosDelAutor, setDatosDelAutor] = useState<Partial<Autor>>({})
    const [error, setError] = useState<Partial<Errors>>({})
    const [errorAutor, setErrorAutor] = useState<Partial<Errors>>({})
    const [loading, setLoading] = useState<boolean>(true)

    useEffect(() => {
        obtenerLibrosDelAutor(slug as string, setLibrosDelAutor, setError, setLoading)
        obtenerAutorPorSlug(slug as string, setDatosDelAutor, setErrorAutor, setLoading)
    }, [slug])

    return (
        <MainPrincipal excedente={true} >

            {loading ?
                <Loading />
                :
                <section className='libros-por-autor'>
                    <section className='contenedor-libros-por-autor'>

                        {errorAutor?.code === 200 &&
                            <>
                                <div className="seccion-categoria">
                                    <div className="categoria-categoria">
                                        <FaHome className='icon' />
                                    </div>
                                    <div className="categoria-categoria">
                                        <p> Autor </p>
                                    </div>
                                    <div className="categoria-categoria">
                                        <div className='link-categoria'> {datosDelAutor?.name} </div>
                                    </div>
                                </div>

                                <div className='contenedor-de-autor'>
                                    <div className="imagen-de-autor">
                                         <Image src={`${process.env.NEXT_PUBLIC_PATH}/api/v1/author/image/author/${datosDelAutor?.image}`} alt={`${datosDelAutor?.name}`} width={220} height={220} className='img' />
                                    </div>
                                    <div className="contenido-autor">
                                        <div className="titulo">
                                            <h2> Autor: {datosDelAutor?.name} </h2>
                                        </div>
                                        <div className="biografia">
                                            <p> {datosDelAutor?.biography} </p>
                                        </div>
                                    </div>
                                </div>
                            </>
                        }

                        {librosDelAutor.length > 0 &&
                            <MapeoLibros
                                libros={librosDelAutor}
                                titulo={
                                    <div className='libros-del-autor'>
                                        <div className="titulo">
                                            <p> Libros de {datosDelAutor?.name} </p>
                                        </div>
                                    </div>
                                }
                            />
                        }

                        {error.message && <p> {error.code}: {error.message} </p>}

                    </section>
                </section>
            }

        </MainPrincipal>
    )
}

export default LibrosPorAutor
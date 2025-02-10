"use client"
import React, { useEffect, useState } from 'react'
import "./SlugLibro.scss"
import MainPrincipal from '@/app/components/MainPrincipal/MainPrincipal'
import { useParams } from 'next/navigation'
import { ProductWithAuthor } from '@/common/interfaces/products-with-author-interface'
import { Errors } from '@/common/interfaces/errors.interface'
import { FaHome } from "react-icons/fa";
import Link from 'next/link'
import { CiDeliveryTruck } from "react-icons/ci";
import Image from 'next/image'
import { IoMdSend } from "react-icons/io";
import toast, { Toaster } from 'react-hot-toast'
import FichaAutor from '@/app/components/FichaAutor/FichaAutor'
import { obtenerLibro, obtenerLibrosPorSlugCategory } from '@/utils/funciones-libros'
import CategoriaSeccion from '@/app/components/CategoriaSeccion/CategoriaSeccion'
import ErrorRequest from '@/app/components/ErrorRequest/ErrorRequest'

const SlugLibro: React.FC = () => {
    const { slug } = useParams()
    const [dataLibro, setDataLibro] = useState<ProductWithAuthor[]>([])
    const [error, setError] = useState<Errors>({ message: "", code: 0 })
    const [errorLibros, setErrorLibros] = useState<Errors>({ message: "", code: 0 })
    const [librosRelacionados, setLibrosRelacionados] = useState<ProductWithAuthor[]>([])

    useEffect(() => {
        obtenerLibro(slug, setDataLibro, setError)
    }, [])

    useEffect(() => {
        if (dataLibro.length > 0) {
            obtenerLibrosPorSlugCategory(dataLibro[0].slug_category, setLibrosRelacionados, 8, setErrorLibros)
        }
    }, [dataLibro])

    const copiarLink = () => {
        navigator.clipboard.writeText(window.location.href)
        toast.success("Link copiado al portapapeles", {
            duration: 3000,
            position: "top-right"
        })
    }

    return (
        <MainPrincipal
            excedente={true}
            fichaAutor={
                dataLibro.length > 0 && (
                    <FichaAutor autor={dataLibro[0].author} biografia={dataLibro[0].biography_author} imagen={dataLibro[0].image_author} />
                )
            }
            librosRelacionados={
                errorLibros.code === 200 &&
                <CategoriaSeccion categoria={`${dataLibro[0]?.category_product}`} products={librosRelacionados} verMas={`${dataLibro[0]?.slug_category}`} />
            }
        >

            <section className="slug-libro">
                <div className="contenedor-libro-detalle">
                    {dataLibro.map((item, index) => (
                        <div className='libro-detalle' key={index}>
                            <div className="seccion-categoria">
                                <div className="categoria-categoria">
                                    <FaHome className='icon' />
                                </div>
                                <div className="categoria-categoria">
                                    <p> Libro </p>
                                </div>
                                <div className="categoria-categoria">
                                    <Link className='link-categoria' href={`/libro/categoria/${item.slug_category}`} > {item.category_product} </Link>
                                </div>
                            </div>

                            <div className="imagen-descripcion-precio">
                                <div className="contenedor-imagen">
                                    <div className="titulo-mobile">
                                        <h2> {item.name} </h2>
                                    </div>
                                    <div className="imagen-de-portada">
                                        <div className="img-portada">
                                            <Image src={`${process.env.NEXT_PUBLIC_PATH}/api/v1/product/image/product/${item.image}`} alt={item.name} width={250} height={330} className='imagen' />
                                        </div>
                                    </div>
                                    <div className="cantidad-paginas">
                                        <div className="contenedor-paginas">
                                            <p> Número de páginas: {item.quantity_pages} </p>
                                        </div>
                                    </div>
                                </div>
                                <div className="descripcion">
                                    <div className="titulo">
                                        <h2> {item.name} </h2>
                                    </div>
                                    <div className="autor">
                                        <Link href={`/libro/autor/${item.slug_author}`} className="nombre-autor"> {item.author} </Link>
                                    </div>
                                    <div className="codigo-del-libro">
                                        <p className="sku"> {item.sku} </p>
                                    </div>
                                    <div className="categoria-del-libro-seleccionado">
                                        <div className="contenedor">
                                            <p> {item.category_product} </p>
                                        </div>
                                    </div>
                                    <div className="sinopsis">
                                        <p> {item.synopsis} </p>
                                    </div>
                                </div>
                                <div className="precio">
                                    <div className="precio-del-libro">
                                        <p className="p-libro">
                                            <p> $ {item.price} </p>
                                        </p>
                                        <div className="e-gratis">
                                            <p> Envio gratis </p>
                                        </div>
                                    </div>
                                    <div className="tipo-de-tapa">
                                        <div className="contenedor">
                                            <div className="tap">
                                                <p className="tapa"> Tapa blanda </p>
                                            </div>
                                            <div className="pre">
                                                <p className="pre-precio"> $ {item.price} </p>
                                            </div>
                                        </div>
                                        <div className="contenedor">
                                            <div className="tap">
                                                <p className="tapa"> Tapa dura </p>
                                            </div>
                                            <div className="pre">
                                                <p className="pre-precio"> Sin stock </p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="entrega">
                                        <div className="icono">
                                            <CiDeliveryTruck className='icon' />
                                        </div>
                                        <p> <strong> Podés pasar a retirarlo gratis </strong> en nuestras tiendas a partir de mañana </p>
                                    </div>
                                    <div className="stock">
                                        <div className="contenedor-stock">
                                            <p> Stock: {item.stock} </p>
                                        </div>
                                    </div>
                                    <div className="boton-para-compartir">
                                        <div className="contenedor-boton-para-compartir" onClick={copiarLink}>
                                            <button> <IoMdSend className='icon' /> COMPARTIR </button>
                                        </div>
                                    </div>
                                </div>
                                <div className="sinopsis-mobile">
                                    <div className="categoria-del-libro-seleccionado">
                                        <div className="contenedor">
                                            <p> {item.category_product} </p>
                                        </div>
                                    </div>
                                    <div className="sinopsis">
                                        <p> {item.synopsis} </p>
                                    </div>
                                </div>
                            </div>

                        </div>
                    ))}

                    <Toaster />

                    {error.code !== 200 && error.code !== 0 &&
                        <ErrorRequest code={error.code} message={error.message} detalle="'Oops, we couldnt' retrieve your requested resource." />
                    }

                </div>

            </section>

        </MainPrincipal>
    )
}

export default SlugLibro
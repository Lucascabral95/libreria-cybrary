import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Product } from '@/common/interfaces/products.interface'
import { CiDeliveryTruck } from 'react-icons/ci'
import "./MapeoLibros.scss"

interface MepeoLibrosProps {
    libros: Product[];
    titulo?: React.ReactNode
}

const MapeoLibros: React.FC<MepeoLibrosProps> = ({ libros, titulo }) => {
    return (
        <div className="mapeo-de-libros">
            <div className="contenedor-mapeo-de-libros">
                {titulo && <> {titulo} </>}

                <div className="libros">
                    {libros?.map((item, index) => (
                        <div className="libro" key={index}>
                            <div className="parte-superior">
                                <Link href={`/libro/${item.slug}`} className="portada">
                                    <Image src={`${process.env.NEXT_PUBLIC_PATH_EXTERNAL}/api/v1/product/image/product/${item.image}`} alt={item.name} width={164.86} height={251.33} className='imagen' />
                                </Link>
                                <div className="tapa">
                                    <p> Tapa blanda </p>
                                </div>
                                <Link href={`/libro/${item.slug}`} className="nombre">
                                    <p> {item.name} </p>
                                </Link>
                                <div className="autor">
                                    <p> {item.author} </p>
                                </div>
                                <div className="precio">
                                    <p> $ {item.price} </p>
                                </div>
                            </div>
                            <div className="parte-inferior">
                                <div className="retiro">
                                    <p> ¡RETIRO GRATIS! </p>  <CiDeliveryTruck className='icon-retiro' />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

            </div>
        </div>
    )
}

export default MapeoLibros
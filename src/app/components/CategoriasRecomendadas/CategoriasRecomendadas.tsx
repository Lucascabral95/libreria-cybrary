import React from 'react'
import "./CategoriasRecomendadas.scss"
import Image from 'next/image'
import MejoresCategorias from '../../../JSON/MejoresCategorias.json'
import Link from 'next/link'

const Categorias = () => {
    return (
        <section className='categorias-recomendadas'>
            <div className='contenedor-categorias-recomendadas'>

                <div className="titulo">
                    <h2> Categorías recomendadas </h2>
                </div>

                <div className="categorias">
                    {MejoresCategorias?.map((item, index) => (
                        <div className="categoria" key={index}>
                            <Link href={`/libro/categoria/${item.slug}`} className="imagen-de-categoria">
                                <Image className="imagen-categoria" src={item.image} alt={item.name} width={150} height={150} />
                            </Link>
                            <Link href={`/libro/categoria/${item.slug}`} className="titulo-categoria">
                                <p> {item.name} </p>
                            </Link>
                        </div>
                    ))}
                </div>

            </div>
        </section>
    )
}

export default Categorias
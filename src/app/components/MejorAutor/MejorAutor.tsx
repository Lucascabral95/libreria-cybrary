import React from 'react'
import "./MejorAutor.scss"
import Image from 'next/image'
import Link from 'next/link'

interface MejorAutorProps {
  autor: string;
  descripcion: string;
  imagen: string;
  slug: string;
}

const MejorAutor: React.FC<MejorAutorProps> = ({ autor, descripcion, imagen, slug }) => {
  return (
    <section className='mejor-autor'>
      <div className='contenedor-mejor-autor'>

        <div className="descripcion">
          <div className="titulo">
            <h4> {autor}, nuestro mejor autor </h4>
          </div>
          <div className="imagen-de-mobile">
            <Image className="imagen-autor" src={imagen} alt="Mejor autor" width={250} height={181.5} />
          </div>
          <div className="texto">
            <p> {descripcion} </p>
          </div>
          <div className="boton">
            <Link className="link-autor" href={`/libro/autor/${slug}`} > Ver más </Link>
          </div>
        </div>

        <div className="imagen">
          <Image className="imagen-autor" src={imagen} alt="Mejor autor" width={250} height={181.5} />
        </div>

      </div>
    </section>
  )
}

export default MejorAutor;
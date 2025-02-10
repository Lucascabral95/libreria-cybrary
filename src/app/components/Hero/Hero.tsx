import React from 'react'
import "./Hero.scss"
import Image from 'next/image'
import Link from 'next/link'

const Hero = () => {
  return (
    <section className='hero'>
     <div className="contenedor-hero">

        <div className="imagen-de-hero">
            <Image src="/img/portada-casa-libro.webp" alt="Productos" width={1200} height={430} className='imagen' />
        </div>
        
        <div className="libros-imprecindibles">
            <div className="imprecindible">
                 <h3> Libros imprecindibles </h3>
                 <p> Los libros que no quisieras perderte </p>
            </div>
            <div className="boton">
                <Link href="/libro/imprescindibles" className='link-libros-imprescincibles'> VER IMPRESCINDIBLES </Link>
            </div>
        </div>

     </div>
    </section>
  )
}

export default Hero
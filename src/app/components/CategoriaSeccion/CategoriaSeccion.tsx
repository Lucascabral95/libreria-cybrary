"use client"
import React, { useEffect, useState } from 'react'
import "./CategoriaSeccion.scss"
import Link from 'next/link';
import Image from 'next/image';
import { CiDeliveryTruck } from "react-icons/ci";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";
import { ProductWithAuthor } from '@/common/interfaces/products-with-author-interface';

interface CategoryProps {
  categoria: string;
  verMas: string;
  products: ProductWithAuthor[];
}

const CategoriaSeccion: React.FC<CategoryProps> = ({ categoria, verMas, products }) => {
  const [elementosAMostrar, setElementosAMostrar] = useState<number>(0);
  const [elementoActual, setElementoActual] = useState<number>(0);
  const [paginaActual, setPaginaActual] = useState<number>(1);
  const [cantidadPaginas, setCantidadPaginas] = useState<number>(0);

  useEffect(() => {
    const resizeHandler = () => {
      if (window.innerWidth > 768) {
        setElementosAMostrar(4);
      } else if (window.innerWidth < 768 && window.innerWidth > 480) {
        setElementosAMostrar(3);
      } else {
        setElementosAMostrar(2);
      }
  
      setCantidadPaginas(products.length - elementosAMostrar + 1);
      setPaginaActual(1); 
      setElementoActual(0); 
    };

    resizeHandler(); 

    window.addEventListener("resize", resizeHandler);

    return () => {
      window.removeEventListener("resize", resizeHandler);
    };
  }, [elementosAMostrar, products]); 

  const anterior = () => {
    if (paginaActual > 1) {
      setPaginaActual(paginaActual - 1);
      setElementoActual(elementoActual - 1);
    }
  }

  const siguiente = () => {
    if (paginaActual < cantidadPaginas) {
      setPaginaActual(paginaActual + 1);
      setElementoActual(elementoActual + 1);
    }
  }

  return (
    <div className='seccion-categoria'>
      <div className='contenedor-seccion-categoria'>
        <div className="categoria">
          <div className="contenedor-de-categoria">
            <h2> {categoria} </h2> 
            <Link href={`/libro/categoria/${verMas}`} className='vermas'> Ver más </Link>
          </div>

          <div className="lista-de-libros">
            {products?.slice(elementoActual, elementoActual + elementosAMostrar).map((item, index) => (
              <div className="libro" key={index}>
                <div className="parte-superior">
                  <Link href={`/libro/${item.slug}`} className="portada">
                    {/* <Image src={`${process.env.NEXT_PUBLIC_PATH}/api/v1/product/image/product/${item.image}`} alt={item.name} width={164.86} height={251.33} className='imagen' /> */}
                    <Image src={`http:localhost:4000/api/v1/product/image/product/${item.image}`} alt={item.name} width={164.86} height={251.33} className='imagen' />
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

          <div className="botones-siguiente-anterior">
            <div className="contenedor-botones">
              <div 
                className="boton-izquierdo" 
                onClick={anterior} 
                style={{ cursor: paginaActual === 1 ? "not-allowed" : "pointer" }}
              >
                <MdKeyboardArrowLeft className='icono' style={{ color: paginaActual === 1 ? "rgba(0, 77, 67, 0.2)" : "var(--color-circulo)" }} />
              </div>
              <div 
                className="boton-derecho" 
                onClick={siguiente} 
                style={{ display: paginaActual === cantidadPaginas ? "none" : "flex", cursor: paginaActual === cantidadPaginas ? "not-allowed" : "pointer" }}
              >
                <MdKeyboardArrowRight className='icono' style={{ color: paginaActual === cantidadPaginas ? "rgba(0, 77, 67, 0.2)" : "var(--color-circulo)" }} />
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}

export default CategoriaSeccion;
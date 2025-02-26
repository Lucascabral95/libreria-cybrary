"use client"
import React, { useEffect, useState } from 'react'
import "./Header.scss"
import Image from 'next/image'
import { FaSearch } from "react-icons/fa";
import Link from 'next/link';
import { obtenerLibrosPorBuscador } from '@/utils/funciones-libros';
import { IoMenuSharp } from "react-icons/io5";
import { IoMdClose } from "react-icons/io";
import MenuHamburguesa from './MenuHamburguesa';
import Buscador from './Buscador/Buscador';
import useStoreZustand from '@/zustand';
import CategoriasDelHeader from "@/JSON/CategoriasDelHeader.json";

const Header: React.FC = () => {
  const [busqueda, ] = useState<string>("");
  const [isOpenMenu, setIsOpenMenu] = useState<boolean>(false);
  const { inputBusquedaAdmin, setInputBusquedaAdmin } = useStoreZustand()
  const [slice, setSlice] = useState<number>(6);

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (busqueda) obtenerLibrosPorBuscador(busqueda)
    }, 600);
    return () => clearTimeout(delayDebounceFn);
  }, [busqueda])

  const buscar = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const busqueda = e.currentTarget.busqueda.value

    if (busqueda !== '') {
      window.location.href = `/libro/busqueda/${busqueda}`
    }
  }

  return (
    <div className='header'>
      <div className='contenedor-header'>

        <div className="barra-inicial">
          <div className="texto">
            <h2> Librería Cybrary </h2>
          </div>
        </div>

        <div className="logo-busqueda-categorias">
          <div className="contenedor">

            <div className="logo-busqueda">

              <div className="menu-hamburguesa" onClick={() => setIsOpenMenu(!isOpenMenu)}>
                <div className="icono">
                  {isOpenMenu ? <IoMdClose className='icon' /> : <IoMenuSharp className='icon' />}
                </div>
              </div>

              {isOpenMenu &&
                <MenuHamburguesa setIsOpenMenu={setIsOpenMenu} />
              }

              <Link href="/" className="logo">
                <Image src="https://imagessl.casadellibro.com/t1e/i/CDL-LogoSecundario-RGB.svg" alt="Logo" width={164} height={33} className='imagen' />
              </Link>

              <div className="busqueda">
                <div className="formulario-de-header">
                  <form onSubmit={(e) => buscar(e)} className="input-texto">
                    <input placeholder='Buscá por autor, título, género o año' type="text" name='busqueda' value={inputBusquedaAdmin} onChange={(e) => setInputBusquedaAdmin(e.target.value)} />
                  </form>
                  <div className="lupa">
                    <FaSearch className='icon' />
                  </div>
                </div>
                {inputBusquedaAdmin &&
                  <div className="buscador-en-pagina">
                    <Buscador
                      link='/libro/'
                      linkAll='/libro/busqueda/'
                      sliceProducts={slice}
                      setSliceProducts={setSlice}
                    />
                  </div>
                }
              </div>

            </div>

            <div className="contenedor-categorias">
              {CategoriasDelHeader.map((item, index) => (
                <Link href={`/libro/categoria/${item.slug}`} className="categoria" key={index}>
                  <p className="nombre-categoria" style={{ color: item.name === "Ver todo" ? "var(--color-seccion)" : "var(--color-circulo)" }} > {item.name} </p>
                </Link>
              ))}

              <div className="busqueda">
                <div className="formulario-de-header">
                  <div className="input-texto">
                    <input placeholder='Buscá por autor, título, género o año' type="text" value={inputBusquedaAdmin} onChange={(e) => setInputBusquedaAdmin(e.target.value)} />
                  </div>
                  <div className="lupa">
                    <FaSearch className='icon' />
                  </div>
                </div>
                {inputBusquedaAdmin &&
                  <div className="buscador-en-pagina">
                    <Buscador
                      link='/libro/'
                      linkAll='/libro/busqueda/'
                      sliceProducts={slice}
                      setSliceProducts={setSlice}
                    />
                  </div>
                }
              </div>
            </div>

          </div>
        </div>

      </div>
    </div>
  )
}

export default Header
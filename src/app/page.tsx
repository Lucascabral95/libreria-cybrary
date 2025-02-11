"use client"
import React, { useEffect, useState } from 'react'
import "./app.scss"
import MainPrincipal from './components/MainPrincipal/MainPrincipal'
import Hero from './components/Hero/Hero'
import CategoriaSeccion from './components/CategoriaSeccion/CategoriaSeccion'
import MejorAutor from './components/MejorAutor/MejorAutor'
import CategoriasRecomendadas from './components/CategoriasRecomendadas/CategoriasRecomendadas'
import { obtenerLibrosPorVariosAutores } from '@/utils/funciones-libros'
import { ProductWithAuthor } from '@/common/interfaces/products-with-author-interface'
import Footer from './components/Footer/Footer'
import Header from './components/Header/Header'
import axios from 'axios'

const Home: React.FC = () => {
  const [librosDeHarry, setLibrosDeHarry] = useState<ProductWithAuthor[]>([])
  const [librosDeJuegosDeTronos, setLibrosDeJuegosDeTronos] = useState<ProductWithAuthor[]>([])
  const [librosDeStephenKing, setLibrosDeStephenKing] = useState<ProductWithAuthor[]>([])

  useEffect(() => {
    obtenerLibrosPorVariosAutores("George R.R. Martin", setLibrosDeJuegosDeTronos, Number(6), setLibrosDeStephenKing, "Stephen King", setLibrosDeHarry, "J.K. Rowling")
  }, [])



  const [prods, setProds] = useState<ProductWithAuthor[]>([])

  useEffect(() => {
    const obtenerProps = async () => {
      try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_PATH_EXTERNAL}/api/v1/product/with-author`, {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          }
        })

        if (response.status === 200) {
          setProds(response.data)
          console.log(response.data)
        }

      } catch (error) {
        console.log(error)
      }
    }

    obtenerProps()
  }, [])

  return (
    <>

      <Header />

    <h1> Productos de peticion desde el frontend </h1>
      {prods.map((item, index) => (
        <div key={index}>
          <p> Libro: {item.name} </p>
          <p> Nombre del autor: {item.name_author} </p>
        </div>
      ))}

      <MainPrincipal excedente={true} fichaAutor={false} >

        <Hero />

        <CategoriaSeccion categoria="Terror" verMas="terror" products={librosDeStephenKing} />

        <MejorAutor
          autor='Stephen King'
          descripcion='Stephen King es un escritor estadounidense conocido principalmente por sus obras de terror, suspense y fantasía. Nació el 21 de septiembre de 1947 en Portland, Maine. A lo largo de su carrera, ha escrito más de 60 novelas y varios relatos cortos, muchos de los cuales se han convertido en bestsellers. Entre sus libros más famosos se encuentran Carrie, It, El Resplandor y Misery.'
          imagen='/img/sthephen-king-author.jpg'
          slug='stephen_king'
        />

        <CategoriaSeccion categoria="Harry Potter" verMas="fantasia" products={librosDeHarry} />

        <CategoriasRecomendadas />

        <CategoriaSeccion categoria="Juego de Tronos" verMas="fantasia" products={librosDeJuegosDeTronos} />

      </MainPrincipal>

      <Footer />

    </>
  )
}

export default Home
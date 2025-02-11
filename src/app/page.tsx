"use client"
import React, { useEffect, useState } from 'react'
import "./app.scss"
import MainPrincipal from './components/MainPrincipal/MainPrincipal'
import Hero from './components/Hero/Hero'
import CategoriaSeccion from './components/CategoriaSeccion/CategoriaSeccion'
import MejorAutor from './components/MejorAutor/MejorAutor'
import CategoriasRecomendadas from './components/CategoriasRecomendadas/CategoriasRecomendadas'
// import { obtenerLibrosPorVariosAutores } from '@/utils/funciones-libros'
import { ProductWithAuthor } from '@/common/interfaces/products-with-author-interface'
import Footer from './components/Footer/Footer'
import Header from './components/Header/Header'
import axios from 'axios'
import { Product } from '@/common/interfaces/products.interface'
import Image from 'next/image'

const Home: React.FC = () => {
  const [librosDeHarry, setLibrosDeHarry] = useState<ProductWithAuthor[]>([])
  // const [librosDeJuegosDeTronos, setLibrosDeJuegosDeTronos] = useState<ProductWithAuthor[]>([])
  // const [librosDeStephenKing, setLibrosDeStephenKing] = useState<ProductWithAuthor[]>([])

  const [productos, setProductos] = useState<Product[]>([])

  // useEffect(() => {
  //   const fetchData = async () => {
  //    await obtenerLibrosPorVariosAutores("George R.R. Martin", setLibrosDeJuegosDeTronos, Number(6), setLibrosDeStephenKing, "Stephen King", setLibrosDeHarry, "J.K. Rowling")
  //   }
  //   fetchData()
  // }, [])

     useEffect(() => {
        const obtenreDatos = async () => {
          try {
             const response = await axios.get('/api/v1/product/with-author?limit=100')

             if (response.status === 200) {
              setLibrosDeHarry(response.data.filter((a: ProductWithAuthor) => a.name_author === "J.K. Rowling"))
              console.log(response.data)
             }

          } catch (error) {
            console.log(error)
          }
        } 

        obtenreDatos()
}, [])


  useEffect(() => {
    const obtenerProductos = async () => {
      try {
        const response = await axios.get('/api/api/test')

        if (response.status === 200) {
          console.log(response)
          setProductos(response.data)
        }

      } catch (error) {
        console.log(error)
      }
    }

    obtenerProductos()
  }, [])

  return (
    <>

      <Header />

      {productos?.map((item, index) => (
        <div key={index}>
          <p> {item.name} </p>
          <Image src={`https://nest-app-6t3h.onrender.com/api/v1/product/image/product/${item.image}`} alt={item.name} width={300} height={350} /> 
        </div>
      ))}

      <MainPrincipal excedente={true} fichaAutor={false} >

        <Hero />

        {/* <CategoriaSeccion categoria="Terror" verMas="terror" products={librosDeStephenKing} /> */}

        <MejorAutor
          autor='Stephen King'
          descripcion='Stephen King es un escritor estadounidense conocido principalmente por sus obras de terror, suspense y fantasía. Nació el 21 de septiembre de 1947 en Portland, Maine. A lo largo de su carrera, ha escrito más de 60 novelas y varios relatos cortos, muchos de los cuales se han convertido en bestsellers. Entre sus libros más famosos se encuentran Carrie, It, El Resplandor y Misery.'
          imagen='/img/sthephen-king-author.jpg'
          slug='stephen_king'
        />

        <CategoriaSeccion categoria="Harry Potter" verMas="fantasia" products={librosDeHarry} />

        <CategoriasRecomendadas />

        {/* <CategoriaSeccion categoria="Juego de Tronos" verMas="fantasia" products={librosDeJuegosDeTronos} /> */}

      </MainPrincipal>

      <Footer />

    </>
  )
}

export default Home
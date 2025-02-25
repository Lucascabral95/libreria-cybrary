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
import { Errors } from '@/common/interfaces/errors.interface'
import LoadingData from '@/common/LoadingData/LoadingData'

const Home: React.FC = () => {
  const [librosDeHarry, setLibrosDeHarry] = useState<ProductWithAuthor[]>([])
  const [librosDeJuegosDeTronos, setLibrosDeJuegosDeTronos] = useState<ProductWithAuthor[]>([])
  const [librosDeStephenKing, setLibrosDeStephenKing] = useState<ProductWithAuthor[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<Errors>({ message: '', code: 0 })
  const [prendiendoMV, setPrendiendoMV] = useState<string>('')

  useEffect(() => {
    obtenerLibrosPorVariosAutores(
      "George R.R. Martin", setLibrosDeJuegosDeTronos,
      Number(6),
      setLibrosDeStephenKing, "Stephen King",
      setLibrosDeHarry, "J.K. Rowling",
      setLoading,
      setError, 
      setPrendiendoMV 
    )
  }, [])

  return (
    <>

      <Header />

      <MainPrincipal excedente={true} fichaAutor={false} >

        <Hero />

        <LoadingData text={prendiendoMV} loading={loading} component={<CategoriaSeccion categoria="Terror" verMas="terror" products={librosDeStephenKing} />} error={error} />

        <MejorAutor
          autor='Stephen King'
          descripcion='Stephen King es un escritor estadounidense conocido principalmente por sus obras de terror, suspense y fantasía. Nació el 21 de septiembre de 1947 en Portland, Maine. A lo largo de su carrera, ha escrito más de 60 novelas y varios relatos cortos, muchos de los cuales se han convertido en bestsellers. Entre sus libros más famosos se encuentran Carrie, It, El Resplandor y Misery.'
          imagen='/img/sthephen-king-author.jpg'
          slug='stephen_king'
        />

        <LoadingData text={prendiendoMV} loading={loading} component={<CategoriaSeccion categoria="Fantasia" verMas="fantasia" products={librosDeHarry} />} error={error} />

        <CategoriasRecomendadas />

        <LoadingData text={prendiendoMV} loading={loading} component={<CategoriaSeccion categoria="Juego de Tronos" verMas="fantasia" products={librosDeJuegosDeTronos} />} error={error} />

      </MainPrincipal>

      <Footer />

    </>
  )
}

export default Home
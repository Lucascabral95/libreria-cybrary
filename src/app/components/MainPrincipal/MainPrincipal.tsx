import React from 'react'
import "./MainPrincipal.scss"
import Condiciones from '../Condiciones/Condiciones'

interface MainProps {
  children: React.ReactNode,
  excedente?: boolean,
  fichaAutor?: React.ReactNode,
  librosRelacionados?: React.ReactNode,
}

const MainPrincipal: React.FC<MainProps> = ({ children, excedente, fichaAutor, librosRelacionados }) => {
  return (
    <main className='main-principal'>
      <div className='contenedor-main-principal'>

        {children}
        
      </div>

      { fichaAutor && <> {fichaAutor} </> }

      { librosRelacionados && <div className='modelador-libros-recomendados'> {librosRelacionados} </div> }

      { excedente && <Condiciones /> }

    </main>
  )
}

export default MainPrincipal;
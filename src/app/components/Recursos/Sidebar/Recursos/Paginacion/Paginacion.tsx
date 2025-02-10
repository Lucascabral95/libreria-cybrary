import React from 'react'
import "./Paginacion.scss"
import { MdArrowBackIosNew, MdArrowForwardIos } from "react-icons/md";

interface PaginacionProps {
    offset: number,
    setOffset: React.Dispatch<React.SetStateAction<number>>,
    cantidadPaginas: number,
}

const Paginacion: React.FC<PaginacionProps> = ({ offset, setOffset, cantidadPaginas }) => {

    const paginaAnterior = () => {
        if (offset === 0) {
            return
        } else {
            setOffset( offset - 1 )
        }
    }

    const paginaSiguiente = () => {
        if ( offset < cantidadPaginas - 1 ) {
            setOffset( offset + 1 )
        }
    }

    return (
        <div className='paginacion'>
            <div className='contenedor-paginacion'>

                <div className="paginas">
                    <div className="icono" onClick={paginaAnterior}>
                        <MdArrowBackIosNew className='icon' />
                    </div>
                    <div className="pagina">
                        <p> { offset + 1 } </p>
                    </div>
                    <div className="icono" onClick={paginaSiguiente}>
                        <MdArrowForwardIos className='icon' />
                    </div>
                </div>

            </div>
        </div>
    )
}

export default Paginacion
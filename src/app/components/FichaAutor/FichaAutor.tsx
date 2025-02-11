import React from 'react'
import "./FichaAutor.scss"
import Image from 'next/image'

interface FichaAutorProps {
    autor: string,
    biografia: string,
    imagen?: string
}

const FichaAutor: React.FC<FichaAutorProps> = ({ autor, biografia, imagen }) => {
    return (
        <div className='ficha-autor'>
            <div className='contenedor-ficha-autor'>

                <div className="titulo-presentacion">
                    <div className="tit">
                        <h3> Escrito por {autor} </h3>
                    </div>
                </div>

                <div className="biografia-foto">
                    <div className="foto">
                        <Image className='imagen-del-autor' src={`${process.env.NEXT_PUBLIC_PATH_EXTERNAL}/api/v1/author/image/author/${imagen}`} alt={autor} width={190} height={190} />
                    </div>
                    <div className="contenido">
                        <p> {biografia} </p>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default FichaAutor;
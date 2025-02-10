import React from 'react'
import "./MainRecursos.scss"

interface MainRecursosProps {
    children: React.ReactNode,
    cuerpo?: React.ReactNode
}

const MainRecursos: React.FC<MainRecursosProps> = ({ children, cuerpo }) => {
    return (
        <div className='main-recursos'>
            <div className='contenedor-main-recursos'>

                {children}

                {cuerpo && <div className='interior-de-main-recursos'> {cuerpo} </div>}

            </div>
        </div>
    )
}

export default MainRecursos
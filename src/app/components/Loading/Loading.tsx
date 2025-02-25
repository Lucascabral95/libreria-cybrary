import React from 'react'
import "./Loading.scss"

interface LoadingProps {
    text?: string
}

const Loading: React.FC<LoadingProps> = ({ text }) => {
    return (
        <div className='loading'>
            <div className='contenedor-loading'>

             {/* <h3 style={{ color: "#004D43", fontSize: "24px" }}> Cargando... </h3> */}
             <h3 style={{ color: "#004D43", fontSize: "24px" }}> { text ? text : "Cargando..." } </h3>

            </div>
        </div>
    )
}

export default Loading
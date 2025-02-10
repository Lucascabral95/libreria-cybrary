import React from 'react'
import "./ActualizarRecursoMain.scss"
import { motion } from 'motion/react'
import { IoCloseSharp } from "react-icons/io5";

interface ActualizarRecursoMainProps {
    children?: React.ReactNode,
    isOpen?: React.Dispatch<React.SetStateAction<boolean>>,
    titulo: string,
    actualizar?: (e: React.FormEvent<HTMLFormElement>) => void,
}

const ActualizarRecursoMain: React.FC<ActualizarRecursoMainProps> = ({ children, titulo, isOpen, actualizar }) => {
    return (
        <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.4 }}
            className="actualizar-recurso">
            <div className="contenedor-actualizar-recurso">

                <div className="boton-de-cierre">
                    <div className="boton">
                        <IoCloseSharp onClick={() => isOpen && isOpen(false)} className='icon' />
                    </div>
                </div>

                <div className="titulo">
                    <h4> {titulo} </h4>
                </div>

                <form className="contenido-interior-actualizacion" onSubmit={actualizar}>
                    {children}
                </form>

            </div>
        </motion.div>
    )
}

export default ActualizarRecursoMain
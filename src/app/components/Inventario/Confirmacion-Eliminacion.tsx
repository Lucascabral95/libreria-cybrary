import React from 'react'
import "./Inventario.scss"
import { motion } from 'motion/react'

interface EliminacionProps {
    recurso: string,
    setClose: React.Dispatch<React.SetStateAction<boolean>>,
    eliminarRecurso: () => void
}

const ConfirmacionDeEliminacion: React.FC<EliminacionProps> = ({ recurso, setClose, eliminarRecurso }) => {
    return (
        <div className='confirmacion-de-eliminacion'>

            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.4 }} className='contenedor-confirmacion-de-eliminacion'>
                <div className="pregunta">
                    <p> ¿Estas seguro que deseas eliminar {recurso}? </p>
                </div>

                <div className="botones">
                    <button className='boton-cancelar-eliminacion' onClick={() => setClose(false)}> Cancelar </button>
                    <button className='boton-confirmar-eliminacion' onClick={() => { eliminarRecurso(); setClose(false) }}> Confirmar  </button>
                </div>
            </motion.div>

        </div>
    )
}

export default ConfirmacionDeEliminacion
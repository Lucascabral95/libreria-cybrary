import React from 'react'
import "./Inventario.scss"
import useStoreZustand from '@/zustand';

interface ProductoProps {
    title: string;
    children: React.ReactNode;
    setClose: React.Dispatch<React.SetStateAction<boolean>>,
}

const InventarioBase: React.FC<ProductoProps> = ({ title, children, setClose }) => {
    const { tokenData } = useStoreZustand()

    return (
        <div className='seccion-inventario'>
            <div className='contenedor-seccion-inventario'>

                <div className="titulo-detalle-recurso">
                    <div className="tit-detalle-recurso">
                        <h2> {title}  </h2>
                    </div>
                    {tokenData.role === 'admin' &&
                        <div className="boton-de-eliminacion">
                            <div className="eliminar" onClick={() => setClose(true)}>
                                <p> Eliminar {title} </p>
                            </div>
                        </div>
                    }
                </div>
                <div className="informacion-general-contenedor">
                    <div className="informacion">
                        <p> Información general </p>
                    </div>
                </div>

                <div className='contenedor-mayor-de-detalles-de-recuros'>
                    {children}
                </div>

            </div>
        </div>
    )
}

export default InventarioBase;
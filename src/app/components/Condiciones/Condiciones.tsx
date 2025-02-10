import React from 'react'
import "./Condiciones.scss"
import { CiDeliveryTruck } from "react-icons/ci";
import { BiStoreAlt } from "react-icons/bi";
import { TbPackageExport } from "react-icons/tb";

const Condiciones: React.FC = () => {
    return (
        <section className="condiciones">
            <div className="contenedor-condiciones">

                <div className="secciones">
                    <div className="seccion">
                        <div className="icono">
                            <CiDeliveryTruck className='icon' />
                        </div>
                        <div className="texto">
                            <p> Compra segura </p>
                        </div>
                    </div>
                    <div className="seccion">
                        <div className="icono">
                            <BiStoreAlt className='icon' />
                        </div>
                        <div className="texto">
                            <p> Recogida en librería gratis </p>
                        </div>
                    </div>
                    <div className="seccion">
                        <div className="icono">
                            <TbPackageExport className='icon' />
                        </div>
                        <div className="texto">
                            <p> Devoluciones gratis hasta 30 días </p>
                        </div>
                    </div>
                </div>

            </div>
        </section>
    )
}

export default Condiciones
import React from 'react'
import "./ErrorRequest.scss"
import Image from 'next/image'

interface ErrorRequestProps {
    code?: number,
    message: string,
    detalle?: string,
}

const ErrorRequest: React.FC<ErrorRequestProps> = ({ code, message, detalle }) => {
    return (
        <div className="not-found">
            <div className="contenedor-not-found">

                <div className="imagen-contenidoError">
                    <div className="imagen">
                        <Image src={"/img/error-page.svg"} alt="404" width={200} height={200} className='img' />
                    </div>
                    <div className="contenido">
                        <div className="error-code">
                            <p> Error {code} </p>
                        </div>
                        <div className="error-contenido">
                            <p> {message} </p>
                        </div>
                    </div>
                </div>

                {detalle &&
                    <div className="texto-extra">
                        <p> {detalle} </p>
                    </div>
                }

            </div>
        </div>
    )
}

export default ErrorRequest
import React from 'react'
import "./ErrorLoad.scss"
import Image from 'next/image'

interface ErrorProps {
    code: number,
    message?: string
}

const ErrorLoad: React.FC<ErrorProps> = ({ code, message }) => {
    return (
        <div className="error-load">
            <div className="contenedor-error-load">

                <div className="titulo-de-error">
                    <p className='error-numeral'> Error {code} </p>
                    <p className='error-alfabetico'> {message === null || message === undefined ? "Internal Server Error" : message} </p>
                </div>

                <div className="imagen-de-error">
                    <Image className='imagen-error' src="/img/error-500.gif" alt="500" width={480} height={480} />
                </div>

            </div>
        </div>
    )
}

export default ErrorLoad
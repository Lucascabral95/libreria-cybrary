import React from 'react'
import MainRecursos from '../MainRecursos/MainRecursos'
import "./ErrorRecursos.scss"

interface ErrorRecursosProps {
    message: string
}

const ErrorRecursos: React.FC<ErrorRecursosProps> = ({ message }) => {
    return (
        <MainRecursos>
            <div className='error-de-recursos'>
                <div className="error">
                    <p> {message} </p>
                </div>
            </div>
        </MainRecursos>
    )
}

export default ErrorRecursos
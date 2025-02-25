import React from 'react'
import "./LoadingData.scss"
import Loading from '@/app/components/Loading/Loading';
import { MdError } from "react-icons/md";

interface LoadingMachineProps {
    loading: boolean,
    component: React.ReactNode,
    error: Error,
    text?: string
}

interface Error {
    message: string,
    code: number
}

const LoadingData: React.FC<LoadingMachineProps> = ({ loading, component, error, text }) => {
    return (
        <>
            {loading ? (
                <Loading text={text} />
            ) : error.message ? (
                <div className="carga-data-error">
                     <p className='mensaje-de-error'> {error.message} </p> <div className="icono"> <MdError className='icon' /> </div> 
                </div>
            ) : (
                component
            )}
        </>
    )
}

export default LoadingData
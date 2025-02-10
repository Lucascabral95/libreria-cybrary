import React from 'react'
import "./MainRecursos.scss"
import MainRecursos from '../../../MainRecursos/MainRecursos'
import Link from 'next/link'
import useStoreZustand from '@/zustand'

interface MainRecursosProps {
    activo: string,
    recurso: string,
    filas?: React.ReactNode,
    columnas?: React.ReactNode,
    paginacion?: React.ReactNode,
    crear?: boolean
}

const MainRecurosSeccion: React.FC<MainRecursosProps> = ({ activo, recurso, filas, columnas, paginacion, crear }) => {
    const { tokenData } = useStoreZustand()

    return (
        <MainRecursos>

            <div className='titulo-de-main-recursos' >
                <div className="tit">
                    <h2 > {activo} </h2>
                </div>
                {crear && tokenData.role === 'admin' &&
                    <div className="boton-de-creacion-de-recursos">
                        <Link className='redireccion-creacion' href={`/api/auth/recursos/creacion/${recurso}`}> Crear {recurso} </Link>
                    </div>
                }
            </div>

            <section className='main-recursos-recursos'>
                <div className='contenedor-main-recursos-recursos'>
                    <table className='tabla-de-recursos'>
                        <thead>
                            {filas}
                        </thead>
                        <tbody>
                            {columnas}
                        </tbody>
                    </table>
                </div>
            </section>

            {paginacion && <> {paginacion} </>}

        </MainRecursos>
    )
}

export default MainRecurosSeccion;
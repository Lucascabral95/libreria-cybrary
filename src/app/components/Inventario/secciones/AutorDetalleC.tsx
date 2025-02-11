'use client'
import React, { useEffect, useState } from 'react'
import "../Inventario.scss"
import InventarioBase from '../InventarioBase'
import { Autor } from '@/common/interfaces/autor-interface'
import Image from 'next/image'
import { Errors } from '@/common/interfaces/errors.interface'
import { actualizarAutor } from "../utils/actualizar/actualizar-recursos"
import { Toaster } from 'react-hot-toast'
import ConfirmacionDeEliminacion from '../Confirmacion-Eliminacion'
import { eliminarAutor } from '../utils/eliminar/eliminar-recursos'
import useStoreZustand from '@/zustand'

interface ProductoProps {
    title: string;
    producto: Autor | undefined;
}

const AutorDetalleC: React.FC<ProductoProps> = ({ title, producto }) => {
    const [data, setData] = useState<Partial<Autor>>({});
    const [activacionActualizacion, setActivacionActualizacion] = useState<boolean>(false);
    const [ , setError] = useState<Errors>({ message: '', code: 200 });
    const [close, setClose] = useState<boolean>(false);
    const { tokenData } = useStoreZustand()

    useEffect(() => {
        if (producto) {
            setData(producto);
        }
    }, [producto]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setData((prev) => ({ ...prev, [name]: value }));
        setActivacionActualizacion(true)
    };

    const actualizar = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setActivacionActualizacion(false)

        if (data && 'id' in data && data.id !== undefined) {
            actualizarAutor(data.id, setError, data)
        }
    }

    return (
        <InventarioBase setClose={setClose} title={title}>

            <form onSubmit={actualizar} className="descripciones-del-recurso">
                <div className="descripcion-clave-valor">
                    <div className="clave">
                        <p> Autor: </p>
                    </div>
                    <div className="valor">
                        <input className='valor-valor' type="text" name="name" value={data?.name as string} onChange={handleChange} readOnly={tokenData?.role !== "admin"} />
                    </div>
                </div>
                <div className="descripcion-clave-valor">
                    <div className="clave">
                        <p> Fecha de nacimiento: </p>
                    </div>
                    <div className="valor">
                        <input className='valor-valor' type="text" name="birth_date" value={data?.birth_date as string} onChange={handleChange} readOnly={tokenData?.role !== "admin"} />
                    </div>
                </div>
                <div className="descripcion-clave-valor">
                    <div className="clave">
                        <p> Nacionalidad: </p>
                    </div>
                    <div className="valor">
                        <input className='valor-valor' type="text" name="nacionality" value={data?.nacionality as string} onChange={handleChange} readOnly={tokenData?.role !== "admin"} />
                    </div>
                </div>
                <div className="descripcion-clave-valor">
                    <div className="clave">
                        <p> Biografía: </p>
                    </div>
                    <div className="valor">
                        <input className='valor-valor' type="text" name="biography" value={data?.biography as string} onChange={handleChange} readOnly={tokenData?.role !== "admin"} />
                    </div>
                </div>
                <div className="descripcion-clave-valor">
                    <div className="clave">
                        <p> Imagen: </p>
                    </div>
                    <div className="valor">
                        <p className='foto-foto'>
                            <Image className='foto-imagen' src={`${process.env.NEXT_PUBLIC_PATH_EXTERNAL}/api/v1/author/image/author/${data?.image}`} alt={data?.name as string} width={320} height={160} />
                        </p>
                    </div>
                </div>
                <div className="descripcion-clave-valor">
                    <div className="clave">
                        <p> Fecha de creación: </p>
                    </div>
                    <div className="valor">
                        <input className='valor-valor' type="text" name="created_at" value={data?.created_at as string} readOnly />
                    </div>
                </div>
                {activacionActualizacion &&
                    <div className="boton-de-actualizacion-recurso">
                        <button type='submit'> Actualizar producto </button>
                    </div>
                }
            </form>

            {close &&
                <ConfirmacionDeEliminacion
                    recurso={data?.name as string}
                    eliminarRecurso={() => eliminarAutor(data?.id as number)}
                    setClose={setClose}
                />
            }

            <Toaster />

        </InventarioBase>
    )
}

export default AutorDetalleC;
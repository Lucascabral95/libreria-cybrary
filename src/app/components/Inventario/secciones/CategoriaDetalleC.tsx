'use client'
import React, { useEffect, useState } from 'react'
import "../Inventario.scss"
import InventarioBase from '../InventarioBase'
import { Categorias } from '@/common/interfaces/categorias-recomendadas.interface'
import { actualizarCategoria } from "../utils/actualizar/actualizar-recursos"
import { Errors } from '@/common/interfaces/errors.interface'
import { Toaster } from 'react-hot-toast'
import ConfirmacionDeEliminacion from '../Confirmacion-Eliminacion'
import { eliminarCategoria } from '../utils/eliminar/eliminar-recursos'
import useStoreZustand from '@/zustand'

interface CategoriaProps {
    title: string;
    producto: Categorias | undefined;
}

const CategoriaDetalleC: React.FC<CategoriaProps> = ({ title, producto }) => {
    const [data, setData] = useState<Partial<Categorias>>({});
    const [activacionActualizacion, setActivacionActualizacion] = useState<boolean>(false);
    const [error, setError] = useState<Errors>({ message: '', code: 200 });
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
            actualizarCategoria(data.id, setError, data)
            console.log(error)
        }
    }

    return (
        <InventarioBase setClose={setClose} title={title}>

            <form onSubmit={actualizar} className="descripciones-del-recurso">
                <div className="descripcion-clave-valor">
                    <div className="clave">
                        <p> Categoría: </p>
                    </div>
                    <div className="valor">
                        <input className='valor-valor' placeholder='Nombre de la categoría' type="text" name="name" value={data?.name} onChange={handleChange} readOnly={tokenData?.role !== "admin"} />
                    </div>
                </div>
                <div className="descripcion-clave-valor">
                    <div className="clave">
                        <p> Descripción: </p>
                    </div>
                    <div className="valor">
                        <input className='valor-valor' placeholder='Descripción de la categoria' type="text" name="description" value={data?.description} onChange={handleChange} readOnly={tokenData?.role !== "admin"} />
                    </div>
                </div>
                <div className="descripcion-clave-valor">
                    <div className="clave">
                        <p> Fecha de creación: </p>
                    </div>
                    <div className="valor">
                        <p className='valor-valor'> {data?.created_at} </p>
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
                    eliminarRecurso={() => eliminarCategoria(data?.id as number)}
                    setClose={setClose}
                />
            }

            <Toaster />

        </InventarioBase>
    )
}

export default CategoriaDetalleC;
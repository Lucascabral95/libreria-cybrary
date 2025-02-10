'use client'
import React, { useEffect, useState } from 'react'
import "../Inventario.scss"
import InventarioBase from '../InventarioBase'
import { Proveedores } from '@/common/interfaces/proveedores.interface'
import { actualizarProveedor } from "../utils/actualizar/actualizar-recursos"
import { Errors } from '@/common/interfaces/errors.interface'
import { Toaster } from 'react-hot-toast'
import ConfirmacionDeEliminacion from '../Confirmacion-Eliminacion'
import { eliminarProveedor } from '../utils/eliminar/eliminar-recursos'
import useStoreZustand from '@/zustand'

interface ProveedorProps {
    title: string;
    producto: Proveedores | undefined;
}

const ProveedorDetalleC: React.FC<ProveedorProps> = ({ title, producto }) => {
    const [data, setData] = useState<Partial<Proveedores>>({});
    const [ , setIsOpenUpdate] = useState<boolean>(false);
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
        setActivacionActualizacion(true);
    };

    const actualizar = (e: React.FormEvent<HTMLFormElement>) => {
            e.preventDefault();
            setIsOpenUpdate(false);
            setActivacionActualizacion(false);
    
            if (data && 'id' in data && data.id !== undefined) {
                actualizarProveedor( data.id as number, setError, data );
            }
        }

    return (
        <InventarioBase setClose={setClose} title={title}>
 
            <form onSubmit={actualizar} className="descripciones-del-recurso">
                <div className="descripcion-clave-valor">
                    <div className="clave">
                        <p> Proveedor: </p>
                    </div>
                    <div className="valor">
                        <input type="text" name="name" value={data.name} placeholder='Nombre del proveedor' onChange={handleChange} className="valor-valor" readOnly={tokenData?.role !== "admin"} />
                    </div>
                </div>
                <div className="descripcion-clave-valor">
                    <div className="clave">
                        <p> Sector: </p>
                    </div>
                    <div className="valor">
                        <input type="texto" name="sector" value={data.sector} placeholder='Sector' onChange={handleChange} className="valor-valor" readOnly={tokenData?.role !== "admin"} />
                    </div>
                </div>
                <div className="descripcion-clave-valor">
                    <div className="clave">
                        <p> Email: </p>
                    </div>
                    <div className="valor">
                        <input type="email" name="email" value={data.contact_email} placeholder='Email' onChange={handleChange} className="valor-valor" readOnly={tokenData?.role !== "admin"} />
                    </div>
                </div>
                <div className="descripcion-clave-valor">
                    <div className="clave">
                        <p> Número de telefono: </p>
                    </div>
                    <div className="valor">
                        <input type="text" name="contact_phone" value={data.contact_phone} placeholder='Número de telefono' onChange={handleChange} className="valor-valor" readOnly={tokenData?.role !== "admin"} />
                    </div>
                </div>
                <div className="descripcion-clave-valor">
                    <div className="clave">
                        <p> Dirección: </p>
                    </div>
                    <div className="valor">
                        <input type="text" name="address" value={data.address} placeholder='Dirección' onChange={handleChange} className="valor-valor" readOnly={tokenData?.role !== "admin"} />
                    </div>
                </div>
                <div className="descripcion-clave-valor">
                    <div className="clave">
                        <p> Sitio Web: </p>
                    </div>
                    <div className="valor">
                        <input type="text" name="website" value={data.website} placeholder='Sitio Web' onChange={handleChange} className="valor-valor" readOnly={tokenData?.role !== "admin"} />
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
                    eliminarRecurso={() => eliminarProveedor(data?.id as number)}
                    setClose={setClose}
                />
            }

            <Toaster />

        </InventarioBase>
    )
}

export default ProveedorDetalleC;
'use client'
import React, { useEffect, useState } from 'react'
import "../Inventario.scss"
import InventarioBase from '../InventarioBase'
import { Empleado } from '@/common/interfaces/empleado.interface'
import { actualizarEmpleado } from "../utils/actualizar/actualizar-recursos"
import { Errors } from '@/common/interfaces/errors.interface'
import { Toaster } from 'react-hot-toast'
import ConfirmacionDeEliminacion from '../Confirmacion-Eliminacion'
import { eliminarEmpleado } from '../utils/eliminar/eliminar-recursos'
import useStoreZustand from '@/zustand'

interface ProveedorProps {
    title: string;
    producto: Empleado | undefined;
}

const EmpleadoDetalleC: React.FC<ProveedorProps> = ({ title, producto }) => {
    const [data, setData] = useState<Partial<Empleado>>({});
    const [activacionActualizacion, setActivacionActualizacion] = useState<boolean>(false);
    const [ , setError] = useState<Errors>({ message: '', code: 200 });
    const [close, setClose] = useState<boolean>(false);
    const { tokenData } = useStoreZustand()

    useEffect(() => {
        if (producto) {
            setData(producto);
        }
    }, [producto]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>) => {
        const { name, value } = e.target;
        const newValue = name === "is_active" ? value === "true" : value;
        setData((prev) => ({ ...prev, [name]: newValue }));
        setActivacionActualizacion(true)
    };

    const actualizar = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setActivacionActualizacion(false)

        if (data && 'id' in data && data.id !== undefined) {
            actualizarEmpleado(data.id, setError, data)
        }
    }

    return (
        <InventarioBase setClose={setClose} title={title}>

            <form className="descripciones-del-recurso" onSubmit={actualizar}>
                <div className="descripcion-clave-valor">
                    <div className="clave">
                        <p> Nombre completo: </p>
                    </div>
                    <div className="valor">
                        <input name="full_name" value={data.full_name} onChange={handleChange} type="text" className="valor-valor" readOnly={tokenData?.role !== "admin"} />
                    </div>
                </div>
                <div className="descripcion-clave-valor">
                    <div className="clave">
                        <p> Email: </p>
                    </div>
                    <div className="valor">
                        <input type="email" value={data.email} className="valor-valor" name="email" onChange={handleChange} readOnly={tokenData?.role !== "admin"} />
                    </div>
                </div>
                <div className="descripcion-clave-valor">
                    <div className="clave">
                        <p> is_active: </p>
                    </div>
                    <div className="valor">
                        <select name="is_active" onChange={handleChange} value={data.is_active ? "true" : "false"} className='valor-valor' disabled={tokenData?.role !== "admin"}>
                            <option value="true"> Activo </option>
                            <option value="false"> Inactivo </option>
                        </select>
                    </div>
                </div>
                <div className="descripcion-clave-valor">
                    <div className="clave">
                        <p> Rol: </p>
                    </div>
                    <div className="valor">
                        <select name="role" onChange={handleChange} value={data.role} className='valor-valor' disabled={tokenData?.role !== "admin"}>
                            <option value="admin"> Administrador </option>
                            <option value="employee"> Empleado </option>
                        </select>
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
                    recurso={data?.full_name as string}
                    eliminarRecurso={() => eliminarEmpleado(data?.id as number)}
                    setClose={setClose}
                />
            }

            <Toaster />

        </InventarioBase>
    )
}

export default EmpleadoDetalleC;
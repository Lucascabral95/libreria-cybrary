'use client'
import React, { useEffect, useState } from 'react'
import "../Inventario.scss"
import InventarioBase from '../InventarioBase'
import { StockMovimientosWithUsuarioYProducto, StockMovimientos } from '@/common/interfaces/stock-movimientos.interface'
import { Product } from '@/common/interfaces/products.interface'
import { Empleado } from '@/common/interfaces/empleado.interface'
import { Errors } from '@/common/interfaces/errors.interface'
import { getDeMovimiento, actualizarMovimiento } from "../utils/actualizar/actualizar-recursos"
import { Toaster } from 'react-hot-toast'
import ConfirmacionDeEliminacion from '../Confirmacion-Eliminacion'
import { eliminarMovimiento } from '../utils/eliminar/eliminar-recursos'
import useStoreZustand from '@/zustand'

interface ProveedorProps {
    title: string;
    producto: StockMovimientosWithUsuarioYProducto | undefined;
}

const MovimientoDetalleC: React.FC<ProveedorProps> = ({ title, producto }) => {
    const [data, setData] = useState<Partial<StockMovimientosWithUsuarioYProducto>>({});
    const [activacionActualizacion, setActivacionActualizacion] = useState<boolean>(false);
    const [movimientosData, setMovimientosData] = useState<Partial<StockMovimientos>>({});
    const [productos, setProductos] = useState<Product[]>([]);
    const [empleados, setEmpleados] = useState<Empleado[]>([]);
    const [ , setError] = useState<Errors>({ message: "", code: 0 });
    const [close, setClose] = useState<boolean>(false);
    const { tokenData } = useStoreZustand()

    useEffect(() => {

        if (producto) {
            setData(producto);

            setMovimientosData((prev) => ({ ...prev, movement_type: producto.movement_type }));
            setMovimientosData((prev) => ({ ...prev, product_id: producto.product_id }));
            setMovimientosData((prev) => ({ ...prev, user_id: producto.user_id }));
            setMovimientosData((prev) => ({ ...prev, quantity: producto.quantity }));
        }

    }, [producto]);

    useEffect(() => {
        getDeMovimiento(setProductos, setEmpleados, setError);
    }, [])

    const handleChange = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>) => {
        const { name, value } = e.target;
        const newValue = name === "product_id" || name === "user_id" || name === "quantity" ? Number(value) : value;
        setMovimientosData((prev) => ({ ...prev, [name]: newValue }));
        setActivacionActualizacion(true)
    };

    const actualizar = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setActivacionActualizacion(false)

        if (data && 'id' in data && data.id !== undefined) {
            actualizarMovimiento(data.id as number, setError, movimientosData);
        }
    }

    return (
        <InventarioBase setClose={setClose} title={title}>

            <div className="descripciones-del-recurso">
                <form onSubmit={actualizar}>
                    <div className="descripcion-clave-valor">
                        <div className="clave">
                            <p> Producto del movimiento: </p>
                        </div>
                        <div className="valor">
                            <select name="product_id" value={movimientosData.product_id} onChange={handleChange} className='valor-valor' disabled={tokenData?.role !== "admin"}>
                                {productos.map((item, index) => (
                                    <option key={index} value={item.id}> {item.name} </option>
                                ))}
                            </select>
                        </div>
                    </div>
                    <div className="descripcion-clave-valor">
                        <div className="clave">
                            <p> Usuario que realizo el movimiento: </p>
                        </div>
                        <div className="valor">
                            <select name="user_id" value={movimientosData.user_id} onChange={handleChange} className='valor-valor' disabled={tokenData?.role !== "admin"}>
                                {empleados.map((item, index) => (
                                    <option key={index} value={item.id}> {item.full_name} </option>
                                ))}
                            </select>
                        </div>
                    </div>
                    <div className="descripcion-clave-valor">
                        <div className="clave">
                            <p> Tipo de movimiento: </p>
                        </div>
                        <div className="valor">
                            <select style={{ color: movimientosData?.movement_type === "in" ? "green" : "red" }} name="movement_type" value={movimientosData.movement_type} onChange={handleChange} className='valor-valor' disabled={tokenData?.role !== "admin"}>
                                <option style={{ color: "green" }} value="in"> Compra </option>
                                <option style={{ color: "red" }} value="out"> Venta </option>
                            </select>
                        </div>
                    </div>
                    <div className="descripcion-clave-valor">
                        <div className="clave">
                            <p> Unidades: </p>
                        </div>
                        <div className="valor">
                            <input type="number" name="quantity" value={movimientosData?.quantity} onChange={handleChange} className="valor-valor" readOnly={tokenData?.role !== "admin"} />
                        </div>
                    </div>
                    {activacionActualizacion &&
                        <div className="boton-de-actualizacion-recurso">
                            <button type='submit'> Actualizar producto </button>
                        </div>
                    }
                </form>

                <div className="informacion-extra">
                    <p> Información extra </p>
                </div>
                <div className="descripcion-clave-valor">
                    <div className="clave">
                        <p> Empleado: </p>
                    </div>
                    <div className="valor">
                        <p className='valor-valor'> {data?.users_full_name} </p>
                    </div>
                </div>
                <div className="descripcion-clave-valor">
                    <div className="clave">
                        <p> Rol: </p>
                    </div>
                    <div className="valor">
                        <p className='valor-valor'> {data?.users_role} </p>
                    </div>
                </div>
                <div className="descripcion-clave-valor">
                    <div className="clave">
                        <p> Producto: </p>
                    </div>
                    <div className="valor">
                        <p className='valor-valor'> {data?.product_name} </p>
                    </div>
                </div>
                <div className="descripcion-clave-valor">
                    <div className="clave">
                        <p> Precio por unidad: </p>
                    </div>
                    <div className="valor">
                        <p className='valor-valor'> {data?.product_price} </p>
                    </div>
                </div>
                <div className="descripcion-clave-valor">
                    <div className="clave">
                        <p> Precio final: </p>
                    </div>
                    <div className="valor">
                        <p className='valor-valor'> $ {data?.total_amount} </p>
                    </div>
                </div>
            </div>

            {close &&
                <ConfirmacionDeEliminacion
                    recurso={data?.movement_type as string}
                    eliminarRecurso={() => eliminarMovimiento(data?.id as number)}
                    setClose={setClose}
                />
            }

            <Toaster />

        </InventarioBase>
    )
}

export default MovimientoDetalleC;
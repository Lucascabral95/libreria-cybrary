'use client'
import React, { useEffect, useState } from 'react'
import "@/app/api/auth/recursos/creacion/CreacionDeRecurso.scss"
import { CreacionMovimientoDeStock } from '@/common/interfaces/creacion/MovimientoStock-creacion.interface'
import { Errors } from '@/common/interfaces/errors.interface'
import { Product } from '@/common/interfaces/products.interface'
import { Empleado } from '@/common/interfaces/empleado.interface'
import { getDeMovimiento } from '../Inventario/utils/actualizar/actualizar-recursos'
import { Toaster } from 'react-hot-toast'
import { crearStockMovimiento } from '../Recursos/utils/crear-recursos.funciones'

const CreacionDeStockMovimiento = () => {
    const [formData, setFormData] = useState<CreacionMovimientoDeStock>({} as CreacionMovimientoDeStock)
    const [error, setError] = useState<Partial<Errors>>({})
    const [productos, setProductos] = useState<Product[]>([])
    const [empleados, setEmpleados] = useState<Empleado[]>([])

    const handleChange = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>) => {
        const { name, value } = e.target;
        const newValue = name === 'product_id' || name === 'user_id' || name === 'quantity' ? Number(value) : value
        setFormData((prev) => ({ ...prev, [name]: newValue }));
    }

    useEffect(() => {
        getDeMovimiento( setProductos, setEmpleados, setError )
    }, [])

    const creacion = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        crearStockMovimiento(setError, formData, setFormData)
    }

    return (
        <div className='contenedor-creacion-de-recursos'>

            <div className="titulo-de-crecion-recurso">
                <h2> Creá un nuevo movimiento </h2>
            </div>

            <form onSubmit={(e) => creacion(e)} className="formulario-de-creacion-de-recurso">
                <div className="grupo-par">
                    <div className="grupo-de-input">
                        <label className='label-creacion' htmlFor="product_id"> Producto del movimiento </label>
                        <select className="input-creacion" value={formData.product_id || ""} onChange={handleChange} name='product_id'>
                            <option value="" disabled> Seleccioná un libro </option>
                            {productos.map((producto) => (
                                <option key={producto.id} value={producto.id}> {producto.name} </option>
                            ))}
                        </select>
                    </div>
                    <div className="grupo-de-input">
                        <label className='label-creacion' htmlFor="user_id"> Empleado del movimiento </label>
                        <select className="input-creacion" value={formData.user_id || ""} onChange={handleChange} name='user_id'>
                            <option value="" disabled> Seleccioná un empleado </option>
                            {empleados.map((empleado) => (
                                <option key={empleado.id} value={empleado.id}>{empleado.full_name}</option>
                            ))}
                        </select>
                    </div>
                </div>
                <div className="grupo-par">
                    <div className="grupo-de-input">
                        <label className='label-creacion' htmlFor="movement_type"> Tipo de movimiento </label>
                        <select className="input-creacion" value={formData.movement_type || ""} onChange={handleChange} name='movement_type' required >
                            <option value="" disabled> Seleccioná un tipo de movimiento </option>
                            <option value="in"> Compra </option>
                            <option value="out"> Venta </option>
                        </select>
                    </div>
                    <div className="grupo-de-input">
                        <label className='label-creacion' htmlFor="quantity"> Cantidad </label>
                        <input type="text" value={formData.quantity || ""} className="input-creacion" onChange={handleChange} name='quantity' placeholder='Cantidad de libros' required />
                    </div>
                </div>
                <div className="boton-de-creacion-de-recurso">
                    <button type='submit'> Crear proveedor </button>
                </div>
            </form>

            {error.message && <p> Error {error.code}: {error.message} </p>}

            <Toaster />

        </div>
    )
}

export default CreacionDeStockMovimiento;
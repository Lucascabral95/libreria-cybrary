"use client"
import React, { useEffect, useState } from 'react'
import MainRecursos from '../MainRecursos/MainRecursos'
import "./RecursosSlug.scss"
import ErrorRecursos from '../ErrorRecursos/ErrorRecursos'
import { DetallesRecursos, recursosValidados } from '@/common/interfaces/seccion-actual.type'
import { Errors } from '@/common/interfaces/errors.interface'
import { ProductWithAuthor } from '@/common/interfaces/products-with-author-interface'
import { Categorias } from '@/common/interfaces/categorias-recomendadas.interface'
import { Proveedores } from '@/common/interfaces/proveedores.interface'
import { Empleado } from '@/common/interfaces/empleado.interface'
import { Autor } from '@/common/interfaces/autor-interface'
import { StockMovimientosWithUsuarioYProducto } from '@/common/interfaces/stock-movimientos.interface'
import {
    obtenerDetalleDelLibro,
    obtenerDetalleDeLaCategoria,
    obtenerDetalleDelAutor,
    obtenerDetalleDelProveedor,
    obtenerDetalleDelEmpleado,
    obtenerDetalleDelMovimiento
} from '../utils/obtencionDetallesRecursos.funciones'
import ErrorRequest from '../../ErrorRequest/ErrorRequest'
import ProductoDetalleC from '../../Inventario/secciones/ProductoDetalleC'
import AutorDetalleC from '../../Inventario/secciones/AutorDetalleC'
import ProveedorDetalleC from '../../Inventario/secciones/ProveedorDetalleC'
import CategoriaDetalleC from '../../Inventario/secciones/CategoriaDetalleC'
import EmpleadoDetalleC from '../../Inventario/secciones/EmpleadoDetalleC'
import MovimientoDetalleC from '../../Inventario/secciones/DetalleMovimientoC'

interface RecursosSlugProps {
    params: {
        slug: DetallesRecursos,
        recurso?: string | number
    },
}

const RecursosSlug: React.FC<RecursosSlugProps> = ({ params: { slug, recurso } }) => {
    const [error, setError] = useState<string | null>(null);
    const [errorFound, setErrorFound] = useState<Errors>({ message: '', code: 0 });
    const [loading, setLoading] = useState<boolean>(true);
    const [producto, setProducto] = useState<ProductWithAuthor>()
    const [categoria, setCategoria] = useState<Categorias>();
    const [autor, setAutor] = useState<Autor>();
    const [emepleado, setEmpleado] = useState<Empleado>();
    const [proveedor, setProveedor] = useState<Proveedores>();
    const [movimientos, setMovimiento] = useState<StockMovimientosWithUsuarioYProducto>();
    const [seccionSeleccionada, setSeccionSeleccionada] = useState<string>('');

    useEffect(() => {
        if (slug && recursosValidados.includes( slug as DetallesRecursos )) {
            setLoading(false);

            if (recurso) {
                setLoading(true);

                switch (slug) {
                    case "producto":
                        obtenerDetalleDelLibro( recurso as string, setProducto, setErrorFound, setLoading );
                        setSeccionSeleccionada("producto");
                        break;
                    case "categoria":
                        obtenerDetalleDeLaCategoria(recurso as string, setCategoria, setErrorFound, setLoading);
                        setSeccionSeleccionada("categoria");
                        break;
                    case "autor":
                        obtenerDetalleDelAutor(recurso as string, setAutor, setErrorFound, setLoading);
                        setSeccionSeleccionada("autor");
                        break;
                    case "empleado":
                        obtenerDetalleDelEmpleado(recurso as number, setEmpleado, setErrorFound, setLoading);
                        setSeccionSeleccionada("empleado");
                        break;
                        case "movimiento":
                            obtenerDetalleDelMovimiento(recurso as number, setMovimiento, setErrorFound, setLoading);
                            setSeccionSeleccionada("movimiento");
                        break;
                    case "proveedor":
                        setSeccionSeleccionada("proveedor");
                        obtenerDetalleDelProveedor(recurso as number, setProveedor, setErrorFound, setLoading);
                        break;
                    default:
                        setErrorFound({ message: "Recurso no válido.", code: 404 });
                        setLoading(false);
                        break;
                }
            }

        } else {
            setError("This resource does not exist.");
        }
    }, [slug, recurso]);

    if (error || loading) {
        return (
            <ErrorRecursos message={error as string} />
        );
    }

    return (
        <MainRecursos>

            <div className='detalle-recurso'>
                <div className='contenedor-de-detalle-recurso'>

                    {errorFound.code === 404 || errorFound.code === 500 ?
                        <ErrorRequest code={errorFound.code} message={errorFound.message} detalle='It is possible that the resource no longer exists, or perhaps the address was incorrect.' />
                        : (
                            seccionSeleccionada === "producto" ? (
                                <ProductoDetalleC title='Producto' producto={producto} />
                            ) : seccionSeleccionada === "autor" ? (
                                <AutorDetalleC title='Autor' producto={autor} />
                            ) : seccionSeleccionada === "categoria" ? (
                                <CategoriaDetalleC title='Categoria' producto={categoria} />
                            ) : seccionSeleccionada === "proveedor" ? (
                                <ProveedorDetalleC title='Proveedor' producto={proveedor} />
                            ) : seccionSeleccionada === "empleado" ? (
                                <EmpleadoDetalleC title='Empleado' producto={emepleado} />
                            ) : seccionSeleccionada === "movimiento" ? (
                                <MovimientoDetalleC title='Movimiento' producto={movimientos} />
                            ) : null
                        )
                    }

                </div>
            </div>

        </MainRecursos>
    )
}

export default RecursosSlug;
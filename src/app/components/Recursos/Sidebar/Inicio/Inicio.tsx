"use client"
import React from 'react'
import "./Inicio.scss"
import MainRecursos from '../../MainRecursos/MainRecursos'
import { RiSignalTowerFill } from "react-icons/ri";
import { formatNumeroPorMilesYMillones } from '@/common/functions/FormatearMilesYMillones';
import useStoreZustand from '@/zustand';
import ErrorLoad from '@/common/ErrorLoad/ErrorLoad';

const Inicio = () => {
    const { tokenData, datosDashbord, loadingDatosDashboard, errorDatosDashboard } = useStoreZustand();

    return (
        <MainRecursos
            cuerpo={

                loadingDatosDashboard ? (
                    <p> Cargando.... </p>
                ) : errorDatosDashboard.code !== 500 ? (
                    <div className='acitividad-inventario-detalles'>
                        <div className="actividad-inventario">
                            <div className="actividad">
                                <div className="actividad-titulo">
                                    <p> Actividad de venta </p>
                                </div>
                                <div className="actividad-secciones">
                                    <div className="act-seccion">
                                        <div className="cantidad">
                                            <p className='cantidad-numero-comprados'>
                                                {datosDashbord?.totalExpeditures?.products_total_selled === null ? 0 : datosDashbord?.totalExpeditures?.products_total_selled}
                                            </p>
                                            <p className='cantidad-texto-vendidos'> Cantidad </p>
                                        </div>
                                        <div className="vendidos">
                                            <p> Vendidos </p>
                                        </div>
                                    </div>
                                    <div className="act-seccion">
                                        <div className="cantidad">
                                            <p className='cantidad-numero-comprados'>
                                                {datosDashbord?.totalIncome?.products_total_buyed === null ? 0 : datosDashbord?.totalIncome?.products_total_buyed}
                                            </p>
                                            <p className='cantidad-texto-comprados'> Cantidad </p>
                                        </div>
                                        <div className="vendidos">
                                            <p> Comprados </p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="inventario">
                                <div className="cont-inventario">
                                    <p> Resumen de inventario </p>
                                </div>
                                <div className="seccion-de-inventario">
                                    <div className="cantidad-de-texto">
                                        <p> Cantidad disponible </p>
                                    </div>
                                    <div className="cantidad-de-numero">
                                        <p> {datosDashbord?.totalProducts === null ? 0 : formatNumeroPorMilesYMillones(datosDashbord?.totalProducts)} </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="detalles-productos-ventas">
                            <div className="detalles-productos">
                                <div className="titulo-de-seccion">
                                    <p> Detalles de recursos </p>
                                </div>
                                <div className="producto">
                                    <div className="producto-letra">
                                        <p> Todas las categorias </p>
                                    </div>
                                    <div className="producto-numero">
                                        <p> {datosDashbord?.quantityCategorys === null ? 0 : datosDashbord?.quantityCategorys} </p>
                                    </div>
                                </div>
                                <div className="producto">
                                    <div className="producto-letra">
                                        <p> Todos los proveedores </p>
                                    </div>
                                    <div className="producto-numero">
                                        <p> {datosDashbord?.quantitySupliers === null ? 0 : datosDashbord?.quantitySupliers} </p>
                                    </div>
                                </div>
                                <div className="producto">
                                    <div className="producto-letra">
                                        <p> Todos los articulos </p>
                                    </div>
                                    <div className="producto-numero">
                                        <p> {datosDashbord?.quantityProducts === null ? 0 : datosDashbord?.quantityProducts} </p>
                                    </div>
                                </div>
                            </div>

                            <div className="detalles-ventas">
                                <div className="titulo-de-la-seccion">
                                    <p> Artículos mas vendidos </p>
                                </div>
                                {datosDashbord?.articulesMostSell?.map((item, index) => (
                                    <div className="product" key={index}>
                                        <div className="product-chooised">
                                            <p> {item.product_name} </p>
                                        </div>
                                        <div className="product-precio">
                                            <p>
                                                $ {formatNumeroPorMilesYMillones(item.total_price_products)} ({item.total_quantity} U)
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="detalles-productos-ventas detalles-productos-ventas-secundarios">
                            <div className="detalles-productos">
                                <div className="titulo-de-seccion">
                                    <p> Ingresos totales </p>
                                </div>
                                <div className="producto">
                                    <div className="producto-letra">
                                        <p> Ventas en pesos ARS </p>
                                    </div>
                                    <div className="producto-numero">
                                        <p style={{ color: "#F7525A" }}>
                                            $ {formatNumeroPorMilesYMillones(datosDashbord?.totalExpeditures?.total_price)}
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="detalles-ventas">
                                <div className="titulo-de-la-seccion">
                                    <p> Egresos totales </p>
                                </div>
                                <div className="product">
                                    <div className="product-chooised">
                                        <p > Compras en pesos ARS </p>
                                    </div>
                                    <div className="product-precio">
                                        <p style={{ color: "#4CB378" }}>
                                            $ {formatNumeroPorMilesYMillones(datosDashbord?.totalIncome?.total_price)}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ) : (
                    errorDatosDashboard?.code === 500 && <ErrorLoad code={errorDatosDashboard?.code} message={errorDatosDashboard?.message} />
                )
            
            }
        >

            <div className="recursos-inicio">
                <div className="contenedor-recursos-inicio">

                    <div className="bienvenida">
                        <div className="icono">
                            <RiSignalTowerFill className='icon' />
                        </div>
                        <div className="rol">
                            <div className="fullname">
                                <p> {tokenData?.full_name} </p>
                            </div>
                            <div className="puesto">
                                <p> {tokenData?.role} </p>
                            </div>
                        </div>
                    </div>

                    <div className="panel-de-administracion">
                        <div className="seccion">
                            <p> Panel de administracion </p>
                        </div>
                    </div>

                </div>
            </div>

        </MainRecursos>
    )
}

export default Inicio; 
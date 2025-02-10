import React from 'react'
import "./Sidebar.scss"
import Image from 'next/image'
import { FaHome, FaUsers } from "react-icons/fa";
import { MdInventory2, MdArrowRight } from "react-icons/md";
import { IoLogOutSharp } from "react-icons/io5";
import { GiMovementSensor } from "react-icons/gi";
import { motion } from 'motion/react';
import Link from 'next/link';
import useStoreZustand from '@/zustand';
import { cerrarSesion } from '@/common/functions/cerrar-sesion';
import { IoClose } from "react-icons/io5";

interface SidebarProps {
    close?: React.Dispatch<React.SetStateAction<boolean>>
}

const Sidebar: React.FC<SidebarProps> = ({ close }) => {
    const { seccionActual, setSeccionActual, tokenData } = useStoreZustand();

    return (
        <section className='sidebar'>
            <div className='contenedor-sidebar'>

                <Link href="/api/auth/recursos/tipo" className="imagen-de-logo">
                    <Image src="https://imagessl.casadellibro.com/t1e/i/CDL-LogoSecundario-RGB.svg" className='logo' alt="Logo" width={140} height={40} />
                </Link>

                <div className="boton-cierre-sidebar">
                    <div className="nombre-y-rol">
                        <p>
                            {tokenData?.role === 'admin' ? `Administrador/a ${tokenData?.full_name}` : `Empleado/a ${tokenData?.full_name}`}
                        </p>
                    </div>
                    <div className="icono-de-cierre">
                        <IoClose className='icon' onClick={() => close?.(false)} />
                    </div>
                </div>

                <div className="secciones-dashboard-logout">
                    <div className="secciones-del-dashboard">
                        <div className="seccion-dashboard">
                            <Link href={`/api/auth/recursos/tipo/inicio`} className="seccion"
                                style={{ backgroundColor: seccionActual === "inicio" ? "var(--fondo-hover)" : "transparent" }}
                                onClick={() => { setSeccionActual("inicio"); close?.(false) }} >
                                <div className="sec">
                                    <div className="icono">
                                        <FaHome className='icon' />
                                    </div>
                                    <div className="texto">
                                        <p> Inicio </p>
                                    </div>
                                </div>
                            </Link>
                            <Link href={`/api/auth/recursos/tipo/inventario`} className="seccion"
                                style={{ backgroundColor: seccionActual === "inventario" || seccionActual === "productos" || seccionActual === "categorias" || seccionActual === "proveedores" || seccionActual === "autores" ? "var(--fondo)" : "transparent" }}
                                onClick={() => seccionActual !== "inventario" ? setSeccionActual("inventario") : setSeccionActual("")} >
                                <div className="sec">
                                    <div className="icono">
                                        <MdInventory2 className='icon'
                                            style={{ color: seccionActual === "productos" || seccionActual === "categorias" || seccionActual === "proveedores" || seccionActual === "autores" ? "var(--fondo-hover)" : "white", }}
                                        />
                                    </div>
                                    <div className="texto">
                                        <p
                                            style={{ color: seccionActual === "productos" || seccionActual === "categorias" || seccionActual === "proveedores" || seccionActual === "autores" ? "var(--fondo-hover)" : "white" }}
                                        > Inventario </p>
                                    </div>
                                </div>
                                <div className="sec-2">
                                    <div className="icono">
                                        <MdArrowRight className='icon' style={{
                                            color: seccionActual === "productos" || seccionActual === "categorias" || seccionActual === "proveedores" || seccionActual === "autores" ? "var(--fondo-hover)" : "white",
                                            transform: seccionActual === "inventario" ? "rotate(90deg)" : "rotate(0deg)"
                                        }} />
                                    </div>
                                </div>
                            </Link>

                            {["inventario", "productos", "categorias", "proveedores", "autores"].includes(seccionActual) && (
                                <motion.div
                                    className="secciones-interiores"
                                    initial={{ transform: "translateX(-100%)" }}
                                    animate={{ transform: "translateX(0%)" }}
                                    exit={{ transform: "translateX(-100%)" }}
                                    transition={{ duration: 0.4 }}
                                >
                                    <Link href={`/api/auth/recursos/tipo/productos`}
                                        className="seccion-de-adentro"
                                        style={{ backgroundColor: seccionActual === "productos" || seccionActual === "inventario" ? "var(--fondo-hover)" : "transparent" }}
                                        onClick={() => { setSeccionActual("productos"); close?.(false) }}
                                    >
                                        <p>Productos</p>
                                    </Link>
                                    <Link href={`/api/auth/recursos/tipo/categorias`}
                                        className="seccion-de-adentro"
                                        style={{ backgroundColor: seccionActual === "categorias" ? "var(--fondo-hover)" : "transparent" }}
                                        onClick={() => { setSeccionActual("categorias"); close?.(false) }}
                                    >
                                        <p>Categorias</p>
                                    </Link>
                                    <Link href={`/api/auth/recursos/tipo/proveedores`}
                                        className="seccion-de-adentro"
                                        style={{ backgroundColor: seccionActual === "proveedores" ? "var(--fondo-hover)" : "transparent" }}
                                        onClick={() => { setSeccionActual("proveedores"); close?.(false) }}
                                    >
                                        <p>Proveedores</p>
                                    </Link>
                                    <Link href={`/api/auth/recursos/tipo/autores`}
                                        className="seccion-de-adentro"
                                        style={{ backgroundColor: seccionActual === "autores" ? "var(--fondo-hover)" : "transparent" }}
                                        onClick={() => { setSeccionActual("autores"); close?.(false) }}
                                    >
                                        <p>Autores</p>
                                    </Link>
                                </motion.div>
                            )}

                            <Link href={`/api/auth/recursos/tipo/movimientos`} className="seccion"
                                style={{ backgroundColor: seccionActual === "movimientos" ? "var(--fondo-hover)" : "transparent" }}
                                onClick={() => { setSeccionActual("movimientos"); close?.(false) }}>
                                <div className="sec">
                                    <div className="icono">
                                        <GiMovementSensor className='icon' />
                                    </div>
                                    <div className="texto">
                                        <p> Movimientos </p>
                                    </div>
                                </div>
                            </Link>
                            <Link href={`/api/auth/recursos/tipo/empleados`} className="seccion"
                                style={{ backgroundColor: seccionActual === "empleados" ? "var(--fondo-hover)" : "transparent" }}
                                onClick={() => { setSeccionActual("empleados"); close?.(false) }}>
                                <div className="sec">
                                    <div className="icono">
                                        <FaUsers className='icon' />
                                    </div>
                                    <div className="texto">
                                        <p> Empleados </p>
                                    </div>
                                </div>
                            </Link>
                        </div>
                    </div>

                    <div className="cerrar-sesion">
                        <div className="logout" onClick={cerrarSesion}>
                            <IoLogOutSharp className='icon' />
                            <p> Cerrar sesión </p>
                        </div>
                    </div>
                </div>

            </div>
        </section>
    )
}

export default Sidebar
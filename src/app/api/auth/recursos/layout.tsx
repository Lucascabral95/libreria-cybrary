"use client"
import React from "react";
import "./Recursos.scss";
import Sidebar from "@/app/components/Recursos/Sidebar/Sidebar";
import HeaderRecursos from "@/app/components/Recursos/HeaderRecursos/HeaderRecursos";
import useStoreZustand from "@/zustand";
import { useEffect } from "react";

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode; }>) {
    const { setTokenData, setDatosDelDashboard } = useStoreZustand()

    useEffect(() => {
        setTokenData()
         setDatosDelDashboard()
    }, [])

    return (
        <div className='recursos'>
            <div className='contenedor-recursos'>

                <div className="sidebar-en-recursos">
                    <Sidebar />
                </div>

                <div className="contenido-de-recursos">
                    <HeaderRecursos />

                    {children}

                </div>

            </div>
        </div>
    );
}

'use client'
import React, { useState } from 'react'
import "./HeaderRecursos.scss"
import { CiSearch } from 'react-icons/ci'
import useStoreZustand from '@/zustand'
import { RiMenuFill, RiAdminFill } from "react-icons/ri";
import Sidebar from '../Sidebar/Sidebar'
import { FaUserAlt } from "react-icons/fa";
import Buscador from '../../Header/Buscador/Buscador'

const HeaderRecursos = () => {
    const [menuHamburguesa, setMenuHamburguesa] = useState<boolean>(false)
    const [sliceProducts, setSliceProducts] = useState<number>(3);
    const { tokenData, inputBusquedaAdmin, setInputBusquedaAdmin } = useStoreZustand()

    const buscar = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const busqueda = e.currentTarget.busqueda.value

        if (busqueda !== '') {
            window.location.href = `/api/auth/recursos/inventario/busqueda/${busqueda}`
        }
    }

    return (
        <header className='header-recursos'>
            <div className='contenedor-header-recursos'>

                <div className="menu-hamburguesa" onClick={() => setMenuHamburguesa(!menuHamburguesa)}>
                    <div className="icono">
                        <RiMenuFill className='icon' />
                    </div>
                </div>

                <div className="buscador">
                    <div className="contenedor-buscador">
                        <div className="icono">
                            <CiSearch className='icon' />
                        </div>
                        <form onSubmit={(e) => buscar(e)} className="input-del-buscador">
                            <input
                                className='input'
                                value={inputBusquedaAdmin}
                                name='busqueda'
                                onChange={ (e) => setInputBusquedaAdmin(e.target.value) }
                                type="text"
                                placeholder='Buscar recursos...'
                            />
                        </form>
                    </div>
                    {inputBusquedaAdmin &&
                        <div className="el-buscador">
                            <Buscador
                                link='/api/auth/recursos/inventario/producto'
                                linkAll='/api/auth/recursos/inventario'
                                sliceProducts={sliceProducts}
                                setSliceProducts={setSliceProducts}
                            />
                        </div>
                    }
                </div>

                <div className="admin">
                    <div className="administrador">
                        {tokenData?.role === 'admin' ? (
                            <>
                                <p> Empleado/a: {tokenData?.full_name} </p>
                                <FaUserAlt className='icon-header' />
                            </>
                        ) : (
                            <>
                                <p> Empleado/a: {tokenData?.full_name} </p>
                                <RiAdminFill className='icon-header' />
                            </>
                        )}
                    </div>
                </div>

                {menuHamburguesa &&
                    <div className="sidebar-del-header">
                        <Sidebar close={setMenuHamburguesa} />
                    </div>
                }

            </div>
        </header>
    )
}

export default HeaderRecursos
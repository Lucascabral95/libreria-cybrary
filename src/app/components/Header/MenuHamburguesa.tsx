import React, { useState } from 'react'
import "./Header.scss"
import { motion } from "motion/react"
import { CategoriasHeader } from '@/common/interfaces/categorias-recomendadas.interface'
import Link from 'next/link'
import { BiPlus } from "react-icons/bi";
import MenuHamburguesaCategorias from "../../../JSON/MenuHamburguesaCategorias.json"

interface MenuHamburguesaProps {
    setIsOpenMenu: React.Dispatch<React.SetStateAction<boolean>>
}

const MenuHamburguesa: React.FC<MenuHamburguesaProps> = ({ setIsOpenMenu }) => {
    const [categorias, ] = useState<CategoriasHeader[]>(MenuHamburguesaCategorias)

    return (
        <motion.div
            initial={{ transform: "translateX(-100%)" }} animate={{ transform: "translateX(0%)" }} exit={{ transform: "translateX(-100%)" }} transition={{ duration: 0.5 }}
            className='menu-hamburguesa-componente'>
            <div className='contenedor-menu-hamburguesa-componente'>

                <div className="categorias-menu">
                    {categorias.map((item, index) => (
                        <Link key={index} href={`/libro/categoria/${item.slug}`} className="contenedor-de-las-categorias" onClick={() => setIsOpenMenu(false)}>
                            <div className="categoria-menu" key={index}>
                                <p className='link-categoria'> {item.name} </p>
                            </div>
                            <div className="icono">
                                <BiPlus className='icon' />
                            </div>
                        </Link>
                    ))}
                </div>

            </div>
        </motion.div>
    )
}

export default MenuHamburguesa;
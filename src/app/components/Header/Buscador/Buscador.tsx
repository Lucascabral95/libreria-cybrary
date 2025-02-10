import React, { useEffect, useState } from 'react'
import "./Buscador.scss"
import { Product } from '@/common/interfaces/products.interface'
import Link from 'next/link'
import { CiSearch } from 'react-icons/ci'
import useStoreZustand from '@/zustand'
import { obtenerTodosLosLibros } from '@/utils/funciones-libros'

interface Props {
    link: string,
    linkAll: string,
    sliceProducts: number,
    setSliceProducts: React.Dispatch<React.SetStateAction<number>>
}

const Buscador: React.FC<Props> = ({ link, linkAll, sliceProducts, setSliceProducts }) => {
    const [productos, setProductos] = useState<Product[]>([])
    const { inputBusquedaAdmin, setInputBusquedaAdmin } = useStoreZustand()
    const [resize, setResize] = useState(window.innerWidth);

    useEffect(() => {
        const resizeHandler = () => {
            if (window.innerWidth < 480) {
                setSliceProducts(8);
                setResize(window.innerWidth);
            } else {
                setSliceProducts(3);
                setResize(window.innerWidth);
            }
        }
        window.addEventListener("resize", resizeHandler);
        return () => window.removeEventListener("resize", resizeHandler);

    }, [resize])

    useEffect(() => {
        if (inputBusquedaAdmin) {
            obtenerTodosLosLibros(inputBusquedaAdmin, setProductos)
        }
    }, [inputBusquedaAdmin])

    return (
        <div className='buscador-de-recursos'>
            <div className='contenedor-buscador-de-recursos'>

                <div className="busqueda-en-buscador">
                    <div className="contenedor-busqueda-en-buscador">
                        <div className="icono">
                            <CiSearch className='icon' />
                        </div>
                        <div className="input-d">
                            <input type="text" placeholder='Buscar recursos...' value={inputBusquedaAdmin} onChange={(e) => setInputBusquedaAdmin(e.target.value)} />
                        </div>
                    </div>
                </div>

                {productos.slice(0, sliceProducts).map((item, index) => (
                    <Link onClick={() => setInputBusquedaAdmin("")} href={`${link}/${item.slug}`} key={index} className="resultados-busqueda">
                        <div className="nombre-producto">
                            <p> {item.name} </p>
                        </div>
                        <div className="sku-producto">
                            <p> {item.author} </p>
                        </div>
                    </Link>
                ))}

                {productos.length > sliceProducts &&
                    <Link onClick={() => setInputBusquedaAdmin("")} href={`${linkAll}/${inputBusquedaAdmin}`} className="boton-de-ver-mas">
                        <p> Ver todos  </p>
                    </Link>
                }

            </div>
        </div>
    )
}

export default Buscador
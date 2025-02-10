'use client'
import React, { useEffect, useState } from 'react'
import "../Inventario.scss"
import InventarioBase from '../InventarioBase'
import { ProductWithAuthor } from '@/common/interfaces/products-with-author-interface';
import Image from 'next/image'
import { Product } from '@/common/interfaces/products.interface';
import { Categorias } from '@/common/interfaces/categorias-recomendadas.interface';
import { Proveedores } from '@/common/interfaces/proveedores.interface';
import { Errors } from '@/common/interfaces/errors.interface';
import { actualizarProducto, obtenerProductoPorSlug, recursosDeProductos } from '../utils/actualizar/actualizar-recursos';
import { Toaster } from 'react-hot-toast';
import ConfirmacionDeEliminacion from '../Confirmacion-Eliminacion';
import { eliminarProducto } from '../utils/eliminar/eliminar-recursos';
import { Autor } from '@/common/interfaces/autor-interface';
import useStoreZustand from '@/zustand';

interface CategoriaProps {
    title: string;
    producto: ProductWithAuthor | undefined;
}

const ProductoDetalleC: React.FC<CategoriaProps> = ({ title, producto }) => {
    const [data, setData] = useState<Partial<ProductWithAuthor>>({});
    const [activacionActualizacion, setActivacionActualizacion] = useState<boolean>(false);
    const [libroSeleccionadoData, setLibroSeleccionadoData] = useState<Partial<Product>>({});
    const [categorias, setCategorias] = useState<Categorias[]>([]);
    const [proveedores, setProveedores] = useState<Proveedores[]>([]);
    const [ , setError] = useState<Errors>({ message: '', code: 200 });
    const [close, setClose] = useState<boolean>(false);
    const [ , setAutores] = useState<Autor[]>([]);
    const { tokenData } = useStoreZustand()

    useEffect(() => {
        if (producto) {
            setData(producto);
            recursosDeProductos(setProveedores, setCategorias, setAutores, setError)
            obtenerProductoPorSlug(producto.id as number, setLibroSeleccionadoData, setError)
        }
    }, [producto]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>) => {
        const { name, value } = e.target;
        const newValue = (name === "stock" || name === "price" || name === "quantity_pages" || name === "category_id" || name === "supplier_id") ? Number(value) : value;
        setLibroSeleccionadoData((prev) => ({ ...prev, [name]: newValue }));
        setActivacionActualizacion(true)
    };

    const actualizacion = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setActivacionActualizacion(false)

        if (libroSeleccionadoData && 'id' in libroSeleccionadoData && libroSeleccionadoData.id !== undefined) {
            actualizarProducto(libroSeleccionadoData.id, setError, libroSeleccionadoData)
        }
    }

    return (
        <InventarioBase setClose={setClose} title={title}>

            <div className="descripciones-del-recurso">
                <form onSubmit={actualizacion}>
                    <div className="descripcion-clave-valor">
                        <div className="clave">
                            <p> Nombre del producto: </p>
                        </div>
                        <div className="valor">
                            <input type="text" className="valor-valor" value={libroSeleccionadoData?.name || ""} name='name' placeholder="Nombre del libro" onChange={handleChange} readOnly={tokenData?.role !== "admin"} />
                        </div>
                    </div>
                    <div className="descripcion-clave-valor">
                        <div className="clave">
                            <p> SKU (código del producto): </p>
                        </div>
                        <div className="valor">
                            <input type="text" className="valor-valor" value={libroSeleccionadoData?.sku || ""} name='sku' placeholder="Sku del libro" onChange={handleChange} readOnly={tokenData?.role !== "admin"} />
                        </div>
                    </div>
                    <div className="descripcion-clave-valor">
                        <div className="clave">
                            <p> Autor: </p>
                        </div>
                        <div className="valor">
                            <input type="text" className="valor-valor" value={libroSeleccionadoData?.author || ""} name='author' placeholder="Nombre del libro" readOnly />
                        </div>
                    </div>
                    <div className="descripcion-clave-valor">
                        <div className="clave">
                            <p className='valor-valor'> Fecha de Publicación: </p>
                        </div>
                        <div className="valor">
                            <input type="text" className="valor-valor" value={libroSeleccionadoData?.publication_date || ""} name='publication_date' placeholder="Fecha de publicación" onChange={handleChange} readOnly={tokenData?.role !== "admin"} />
                        </div>
                    </div>
                    <div className="descripcion-clave-valor">
                        <div className="clave">
                            <p> Idioma: </p>
                        </div>
                        <div className="valor">
                            <input type="text" className="valor-valor" value={libroSeleccionadoData?.language || ""} name='language' placeholder="Idioma del libro" onChange={handleChange} readOnly={tokenData?.role !== "admin"} />
                        </div>
                    </div>
                    <div className="descripcion-clave-valor">
                        <div className="clave">
                            <p> Sinopsis: </p>
                        </div>
                        <div className="valor">
                            <input type="text" className="valor-valor" value={libroSeleccionadoData?.synopsis || ""} name='synopsis' placeholder="Sinopsis del libro" onChange={handleChange} readOnly={tokenData?.role !== "admin"} />
                        </div>
                    </div>
                    <div className="descripcion-clave-valor">
                        <div className="clave">
                            <p> Imagen del producto: </p>
                        </div>
                        <div className="valor">
                            <div className="foto-foto">
                                <Image className='foto-imagen-producto' src={`${process.env.NEXT_PUBLIC_PATH}/api/v1/product/image/product/${data?.image}`} alt={libroSeleccionadoData?.name as string} width={150} height={320} />
                            </div>
                        </div>
                    </div>
                    <div className="descripcion-clave-valor">
                        <div className="clave">
                            <p> Cantidad de páginas: </p>
                        </div>
                        <div className="valor">
                            <input type="number" className="valor-valor" value={libroSeleccionadoData?.quantity_pages || ""} name='quantity_pages' placeholder="Cantidad de páginas" onChange={handleChange} readOnly={tokenData?.role !== "admin"} />
                        </div>
                    </div>
                    <div className="descripcion-clave-valor">
                        <div className="clave">
                            <p> Stock: </p>
                        </div>
                        <div className="valor">
                            <input type="number" className="valor-valor" value={libroSeleccionadoData?.stock || ""} name='stock' placeholder="Unidades en stock" onChange={handleChange} readOnly={tokenData?.role !== "admin"} />
                        </div>
                    </div>
                    <div className="descripcion-clave-valor">
                        <div className="clave">
                            <p> Precio: </p>
                        </div>
                        <div className="valor">
                            <input type="number" className="valor-valor" value={libroSeleccionadoData?.price || ""} name='price' placeholder="Precio" onChange={handleChange} readOnly={tokenData?.role !== "admin"} />
                        </div>
                    </div>
                    <div className="descripcion-clave-valor">
                        <div className="clave">
                            <p> Categoría: </p>
                        </div>
                        <div className="valor">
                            <select className='valor-valor' name="category_id" value={libroSeleccionadoData?.category_id || ""} onChange={handleChange} disabled={tokenData?.role !== "admin"} >
                                {categorias?.map((item, index) => (
                                    <option key={index} value={Number(item.id)}> {item.name} </option>
                                ))}
                            </select>
                        </div>
                    </div>
                    <div className="descripcion-clave-valor">
                        <div className="clave">
                            <p> Proveedor: </p>
                        </div>
                        <div className="valor">
                            <select className='valor-valor' name="supplier_id" value={libroSeleccionadoData?.supplier_id || ""} onChange={handleChange} disabled={tokenData?.role !== "admin"}>
                                {proveedores?.map((item, index) => (
                                    <option key={index} value={Number(item.id)}> {item.name} </option>
                                ))}
                            </select>
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
                        <p> Categoria: </p>
                    </div>
                    <div className="valor">
                        <p className='valor-valor'> {data?.category_product} </p>
                    </div>
                </div>
                <div className="descripcion-clave-valor">
                    <div className="clave">
                        <p> Descripción de la categoría: </p>
                    </div>
                    <div className="valor">
                        <p className='valor-valor'> {data?.description_category} </p>
                    </div>
                </div>
                <div className="descripcion-clave-valor">
                    <div className="clave">
                        <p> Fecha de nacimiento del autor: </p>
                    </div>
                    <div className="valor">
                        <p className='valor-valor'> {data?.birth_date_author} </p>
                    </div>
                </div>
                <div className="descripcion-clave-valor">
                    <div className="clave">
                        <p> Nacionalidad del autor: </p>
                    </div>
                    <div className="valor">
                        <p className='valor-valor'> {data?.nacionality_author} </p>
                    </div>
                </div>
                <div className="descripcion-clave-valor">
                    <div className="clave">
                        <p> Biografia del autor: </p>
                    </div>
                    <div className="valor">
                        <p className='valor-valor'> {data?.biography_author} </p>
                    </div>
                </div>
                <div className="descripcion-clave-valor">
                    <div className="clave">
                        <p> Imagen del autor: </p>
                    </div>
                    <div className="valor">
                        <div className="foto-foto">
                            <Image className='foto-imagen-producto' src={`${process.env.NEXT_PUBLIC_PATH}/api/v1/author/image/author/${data?.image_author}`} alt={data?.name as string} width={150} height={320} />
                        </div>
                    </div>
                </div>
                <div className="descripcion-clave-valor">
                    <div className="clave">
                        <p> Fecha de creación: </p>
                    </div>
                    <div className="valor">
                        <p className='valor-valor'>  {data?.created_at} </p>
                    </div>
                </div>
            </div>

            {close &&
                <ConfirmacionDeEliminacion
                    recurso={data?.name as string}
                    eliminarRecurso={() => eliminarProducto(data?.id as number)}
                    setClose={setClose}
                />
            }

            <Toaster />

        </InventarioBase>
    )
}

export default ProductoDetalleC
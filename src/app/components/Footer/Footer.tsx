"use client"
import React, { useState } from 'react'
import "./Footer.scss"
import Image from 'next/image'
import { FaGithub, FaLinkedin, FaInstagram } from "react-icons/fa";
import { TbWorld } from "react-icons/tb";
import { HiOutlineMailOpen } from "react-icons/hi";
import toast, { Toaster } from "react-hot-toast";

const Footer: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  
   const suscribirme = ( e: React.FormEvent<HTMLFormElement> ) => {
    e.preventDefault()

     if (email) {
      toast.success("Gracias por suscribirte", {
        duration: 2500,
        position: "top-right"
      })
       setEmail("")
     }
   }

  return (
    <div className='footer'>

      <div className='contenedor-footer'>

      </div>

      <div className="editoriales">

        <div className="newsletters">
          <div className="contenedor-newsletters">
            <div className="icono">
              <HiOutlineMailOpen className='icon' />
            </div>
            <div className="informacion">
              <div className="titulo">
                <h4> Recibe nuestras novedades en libros en tu email </h4>
              </div>
              <div className="descripcion">
                <p> Lorem ipsum, dolor sit amet consectetur adipisicing elit. Debitis iusto nulla cupiditate unde quis neque aspernatur in, ex porro ab excepturi fugiat qui recusandae repudiandae alias, dolorum accusamus sequi quia. Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nesciunt inventore corrupti dolores quae quod in, sunt repellat blanditiis aut earum quo voluptas exercitationem enim similique sit mollitia optio pariatur iure. Lorem ipsum dolor sit amet consectetur adipisicing elit. Amet placeat praesentium vitae deleniti fugit sunt temporibus, beatae minus sapiente possimus? Nam necessitatibus ad ipsam earum, repellendus autem beatae voluptates atque! </p>
              </div>
              <form onSubmit={ (e) => suscribirme(e) } className="input-suscripcion">
                <div className="input">
                  <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" required />
                </div>
                <div className="boton">
                  <button type='submit'> SUSCRIBIRME </button>
                </div>
              </form>
            </div>
          </div>
        </div>

        <div className="edit">
          <div className="edit-interior">
            <div className="editorial">
              <Image className='img' src="/img/anaya.jpg" alt="Editorial Anaya" width={120} height={25} />
            </div>
            <div className="editorial">
              <Image className='img' src="/img/penguin.png" alt="Editorial Penguin" width={120} height={25} />
            </div>
            <div className="editorial">
              <Image className='img' src="/img/harper.png" alt="Editorial Harper Collins" width={120} height={25} />
            </div>
            <div className="editorial">
              <Image className='img' src="/img/planeta.jpg" alt="Editorial Planeta" width={120} height={25} />
            </div>
          </div>
        </div>

        <div className="mis-redes">
          <div className="contenedor-mis-redes">
            <div className="detalles">
              <a href="https://portfolio-web-dev-git-main-lucascabral95s-projects.vercel.app/" target="_blank" rel="noopener noreferrer">
                <p> Lucas Cabral Dev </p>
              </a>
            </div>
            <div className="network">
              <div className="redes">
                <a href="https://github.com/Lucascabral95" target="_blank" rel="noopener noreferrer">
                  <FaGithub className='icono' />
                </a>
              </div>
              <div className="redes">
                <a href="https://www.linkedin.com/in/lucas-gast%C3%B3n-cabral/" target="_blank" rel="noopener noreferrer" >
                  <FaLinkedin className='icono' />
                </a>
              </div>
              <div className="redes">
                <a href="https://www.instagram.com/lucascabral95" target="_blank" rel="noopener noreferrer">
                  <FaInstagram className='icono' />
                </a>
              </div>
              <div className="redes">
                <a href="https://portfolio-web-dev-git-main-lucascabral95s-projects.vercel.app/" target="_blank" rel="noopener noreferrer">
                  <TbWorld className='icono' />
                </a>
              </div>
            </div>
          </div>
        </div>

        <Toaster />

      </div>

    </div>
  )
}

export default Footer
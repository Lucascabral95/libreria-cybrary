import React, { ReactNode } from 'react'
import "./LogueoRegister.scss"
import Image from 'next/image';

interface LogueoRegisterProps {
    children: ReactNode;
}

const LogueoRegister: React.FC<LogueoRegisterProps> = ({ children }) => {
    return (
        <section className="logueo-register">
            <div className="contenedor-logueo-register">

                <div className="imagen-auth">
                    <div className="imagen">
                        <Image src={"/img/libreria.avif"} alt="Bienvenida" width={960} height={540} className='imagen-de-login-register' />
                    </div>
                    <div className="auth">
                        <div className="autenticacion">
                            <div className="cont-autenticacion">
                                <div className="logo">
                                    <Image src="https://imagessl.casadellibro.com/t1e/i/CDL-LogoSecundario-RGB.svg" alt="Logo" width={200} height={200} className='logo-imagen' />
                                </div>
                                <div className="titulo">
                                    <p> Bienvenido a La Casa del Libro </p>
                                </div>

                                {children}

                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </section>
    )
}

export default LogueoRegister

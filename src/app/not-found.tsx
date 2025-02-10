import React from 'react'
import MainPrincipal from './components/MainPrincipal/MainPrincipal'
import "./app.scss"
import ErrorRequest from './components/ErrorRequest/ErrorRequest'
import Header from './components/Header/Header'
import Footer from './components/Footer/Footer'

const NotFound: React.FC = () => {
    return (
        <>

            <Header />

            <MainPrincipal excedente={true} >

                <ErrorRequest code={404} message="Wow! We couldn't find the page" detalle="It's possible that the page no longer exists, or perhaps the address was incorrect" />

            </MainPrincipal>

            <Footer />

        </>
    )
}

export default NotFound
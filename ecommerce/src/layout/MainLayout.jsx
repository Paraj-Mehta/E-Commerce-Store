import React from 'react'
import NavBar from '../components/Navbar'
import Footer from '../components/Footer'
import { Outlet } from 'react-router-dom'


const MainLayout = (props) => {
    return (
        <>
            <div className="d-flex flex-column min-vh-100">
            <NavBar isLoggedIn={props.isLoggedIn} setIsLoggedIn={props.setIsLoggedIn} />
            <main className="flex-grow-1 container py-4">
                <Outlet context={{
                    isLoggedIn: props.isLoggedIn,
                    setIsLoggedIn: props.setIsLoggedIn
                }} />
            </main>
            <Footer />
            </div>
        </>
    )
}

export default MainLayout
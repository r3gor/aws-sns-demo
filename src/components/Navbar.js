import React from 'react'
import { Link, NavLink } from 'react-router-dom'
import { Auth } from './Auth'

export const Navbar = () => {
    return (
        <>
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <Link 
                className="navbar-brand ms-5" 
                to="/"
            >
                : : FISI DISK : :
            </Link>

            <div className="navbar-collapse">
                <div className="navbar-nav">

                    <NavLink 
                        activeClassName="active"
                        className="nav-item nav-link" 
                        exact
                        to="/admin"
                    >
                        Admin
                    </NavLink>

                </div>
            
            </div>

            <div className="">
                <ul className="navbar-nav ml-auto">
                    <Auth/>
                </ul>
            </div>
        </nav>
        </>
    )
}

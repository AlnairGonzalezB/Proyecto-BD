import React from 'react'
import './Navbar.css'
import {Link} from "react-router-dom";

const Navbar = () => {
    return (
        <div>
            <nav className="navbar">
      <div className="contenedor">
        <div className="logo">
           
        </div>
          <h2>PinguDemy</h2>
        <div className="links">
          <Link to="/Mis_Usuarios">Usuarios</Link>
          <Link to="/Mis_Rentas">Rentas</Link>
          <Link to="/Mis_Ventas">Ventas</Link>
          <Link to="/Mis_Libros">Libros</Link>
          <Link to="/Mis_Documentales">Documentales</Link>
          <Link to="/Mis_Cursos">Cursos</Link>
        </div>
      </div>
    </nav>
        </div>
    )
}

export default Navbar

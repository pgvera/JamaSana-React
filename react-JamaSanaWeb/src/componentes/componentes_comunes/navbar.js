import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Cookies from 'universal-cookie';
import './navbar.css';

const cookies = new Cookies();

class NavBar extends Component {

   constructor(props) {
      super(props);
      this.state = {
         ruta: this.props.location.pathname
      }

   }

   onClick = () => {
      cookies.remove("username");
      cookies.remove("token");
      window.location.href = "/";
   }

   render() {

      return (
         <nav>
            <ul className="ul-style" >
               <li className="li-style"> <div className="name-app center-color"> La JamaSana </div> </li>
               <li className={this.state.ruta === "/reportes" ? "li-style active" : "li-style"} > <Link to="/reportes"> Reportes </Link> </li>
               <li className={this.state.ruta === "/categorias" ? "li-style active" : "li-style"} > <Link to="/categorias"> Categorías </Link> </li>
               {/* <li className={this.state.ruta === "/pedidos" ? "li-style active" : "li-style"} > <Link to="/pedidos"> Pedidos </Link> </li> */}
               {/* <li className={this.state.ruta === "/comidas" ? "li-style active" : "li-style"} > <Link to="/comidas"> Comidas </Link> </li> */}
               <li className="li-style" style={{ float: 'right' }} > <button className="logout-btn center-color" onClick={this.onClick} > Cerrar sesión </button> </li>
            </ul>
         </nav>
      );

   }

}

export default NavBar;
import React, { Component } from "react";
import Cookies from "universal-cookie";
import Navbar from "reactjs-navbar";
import logo from "../../imagenes/logo.png";
import Loader from "react-loader-spinner";
import {
  faUsers,
  faUtensils,
  faCreditCard,
  faChartPie,
  faCogs,
  faUserCircle,
} from "@fortawesome/free-solid-svg-icons";

import "reactjs-navbar/dist/index.css";
const cookies = new Cookies();
class Navbar2 extends Component {
  state = {
    isLoading: false,
  };

  render() {
    return (
      <Navbar
        logo={logo}
        loader={<Loader type="Puff" color="#D85B5B" height={25} width={25} />}
        isLoading={this.state.isLoading}
        // helpCallback={() => {
        //   alert("I need help... and coffee...");
        // }}
        closeCallback={() => {
          alert("hi");
        }}
        menuItems={[
          {
            title: "Vendedores",
            icon: faUsers,
            isAuth: true,
            onClick: () => {
              window.location.href = "/vendedores";
            },
          },
          //   {
          //     title: "Transactions",
          //     icon: faBookOpen,
          //     isAuth: () => {
          //       // Claim authorization logic...
          //       return false;
          //     },
          //   },
          //   {
          //     title: "Networks",
          //     icon: faGlobe,
          //     isAuth: true,
          //   },
          {
            title: "Administración",
            icon: faCogs,
            isAuth: true,
            subItems: [
              {
                title: "Categorías",
                icon: faUtensils,
                isAuth: true,
                onClick: () => {
                  window.location.href = "/categorias";
                },
              },
              {
                title: "Suscripciones",
                icon: faCreditCard,
                isAuth: true,
                onClick: () => {
                  // What you want to do...
                  alert("I need another cup of coffee...");
                },
              },
              // {
              //   title: "Suscripciones",
              //   icon: faCreditCard,
              //   isAuth: true,
              //   subItems: [
              //     { title: "Subitem 2-1", icon: faAdjust, isAuth: true },
              //     {
              //       title: "Subitem 2-2",
              //       icon: faBell,
              //       isAuth: true,
              //       subItems: [
              //         {
              //           title: "Subitem 2-2-1",
              //           icon: faGhost,
              //           isAuth: true,
              //           subItems: [
              //             {
              //               title: "Subitem 2-2-2-1",
              //               icon: faFan,
              //               isAuth: true,
              //             },
              //             {
              //               title: "Subitem 2-2-2-2",
              //               icon: faCarSide,
              //               isAuth: true,
              //             },
              //             {
              //               title: "Subitem 2-2-2-3",
              //               icon: faJedi,
              //               isAuth: true,
              //             },
              //             {
              //               title: "Subitem 2-2-2-4",
              //               icon: faLaughBeam,
              //               isAuth: true,
              //             },
              //           ],
              //         },
              //         {
              //           title: "Subitem 2-2-2",
              //           icon: faKey,
              //           isAuth: true,
              //         },
              //       ],
              //     },
              //     {
              //       title: "Make request",
              //       icon: faCheese,
              //       isAuth: true,
              //       onClick: () => {
              //         // What you want to do...
              //         this.setState({ isLoading: true }, () =>
              //           setTimeout(() => {
              //             this.setState({ isLoading: false });
              //           }, 3000)
              //         );
              //       },
              //     },
              //   ],
              // },
              // {
              //   title: "Subitem 3",
              //   icon: faWater,
              //   isAuth: () => {
              //     // Claim authorization logic...
              //     return false;
              //   },
              // },
            ],
          },
          {
            title: "Reports",
            icon: faChartPie,
            isAuth: true,
            onClick: () => {
              // What you want to do...
              window.location.href = "/reportes";
            },
          },
          {
            title: "Cerrar Sesión",
            icon: faUserCircle,
            isAuth: true,
            onClick: () => {
              // What you want to do...
              // alert("I need another cup of coffee...");
              cookies.remove("username");
              cookies.remove("token");
              window.location.href = "/";
            },
          },
        ]}
      />
    );
  }
}

export default Navbar2;

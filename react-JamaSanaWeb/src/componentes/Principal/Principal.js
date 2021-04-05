import React, { Component } from 'react';
import Separador from '../componentes_comunes/separador';
import Navbar from '../componentes_comunes/navbar';
import Label from '../componentes_comunes/label_administrador';
import Cookies from 'universal-cookie';
import { Bar } from 'react-chartjs-2';
import { Redirect } from 'react-router';

//css
import './Principal.css';
import 'bootstrap/dist/css/bootstrap.min.css';
// import { Table, Button, Container, Modal, FormGroup, ModalFooter, ModalBody, ModalHeader } from 'reactstrap';

//imagenes
import logo from "../../imagenes/logo.png"


const cookies = new Cookies();

class Principal extends Component {

    state = {

        logged: true,
        data1: {
            labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
            datasets: [{
                label: "Comidas más vendidas",
                data: [12, 19, 3, 5, 20, 3],
                backgroundColor: 'rgba(79,208,83,.3)',
                borderColor: 'rgba(79,208,83,1)',
                borderWidth: 1
            }]
        },
        data2: {
            labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
            datasets: [{
                label: "Valoracion de comidas",
                data: [12, 19, 3, 5, 10, 3],
                backgroundColor: 'rgba(79,208,83,.3)',
                borderColor: 'rgba(79,208,83,1)',
                borderWidth: 1
            }]
        },
    }

    componentDidMount() {

        if (!cookies.get("token")) {
            this.setState({ logged: false });
        } else {
            return;
        }

    }

    render() {

        if (!this.state.logged) {
            return (<Redirect to="/" />);
        } else {

            return (
                <div>
                    <Navbar {...this.props} />
                    <Label />
                    <Separador nombre="Reportes" />
                    <div className="centrado-graficos" >
                        <div className="contenedor-graficos">
                            <div className="graficos" ><Bar options={{ maintainAspectRatio: false }} data={this.state.data1} ></Bar></div>
                            <div className="graficos" ><Bar options={{ maintainAspectRatio: false }} data={this.state.data2} ></Bar></div>
                        </div>
                    </div>
                </div>
            );

        }

    }

}

export default Principal;
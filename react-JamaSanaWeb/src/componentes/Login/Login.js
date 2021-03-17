import React, { Component } from 'react'

//css
import './Login.css';
import 'bootstrap/dist/css/bootstrap.min.css';
// import { Table, Button, Container, Modal, FormGroup, ModalFooter, ModalBody, ModalHeader } from 'reactstrap';

//imagenes
import logo from "../../imagenes/logo.png"

//servicios


class Login extends Component {
    state = {
        credentials: {
            username: "",
            password: ""
        }

    }
    login = event => {
        if (this.state.credentials.username === "" || this.state.credentials.password==="") {
            alert(
                "Debe llenar todos los campos"
            );
            

        }
        else {
            console.log(this.state.credentials);
            fetch('http://127.0.0.1:8000/usuarios/login_admin', {
                method: "POST",
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(this.state.credentials)
            }).then(
                data => {
                    console.log(data);
                }
            ).catch(
                error => {
                    console.log(error);
                    alert(
                        "Credenciales incorrectas"
                    );
                })

        }

    }

    inputChanged = event => {
        const cred = this.state.credentials;
        cred[event.target.name] = event.target.value;
        this.setState({ credentials: cred });
    }

    render() {
        return <div id="fondo" >
            <div id="contenedor">
                <div className="texto">
                    <p>Bienvenido a LaJamaSama</p>
                    <img id="logo" src={logo} alt="Logo" />
                </div>

                
                <form>
                    <div id="bloque1">
                        <div className="row texto">
                            <div className="col-sm">
                                <p>Usuario:</p>
                            </div>
                            <div className="col-sm">
                                <input type="text" className="form-control" id="username" name="username" placeholder="Usuario"
                                    value={this.state.credentials.username}
                                    onChange={this.inputChanged}>
                                </input>
                            </div>
                        </div>

                        <div className="row texto">
                            <div className="col-sm">
                                <p>Contraseña:</p>
                            </div>
                            <div className="col-sm">
                                <input type="password" className="form-control" id="password" name="password" placeholder="Contraseña"
                                    value={this.state.credentials.password}
                                    onChange={this.inputChanged}>
                                </input>
                            </div>
                        </div>
                        <div className="row texto">
                            <div className="col-sm">
                                <input type="submit"
                                    className="btn btn-success"
                                    value="Entrar"
                                    onClick={this.login}></input>
                            </div>
                        </div>
                    </div>

                </form>



            </div>


        </div>
    }
}


export default Login;
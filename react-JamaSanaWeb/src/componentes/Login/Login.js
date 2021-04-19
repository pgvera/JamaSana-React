import React, { Component } from "react";
import Cookies from "universal-cookie";

// Componentes
import LoginHeader from "./login_header.js";

//css
import "./Login.css";
import "bootstrap/dist/css/bootstrap.min.css";

//imagenes
// import logo from "../../imagenes/logo.png"

//constantes
import * as Url from "../../recursos/constantes/http-url";

const cookies = new Cookies();

class Login extends Component {
  state = {
    credentials: {
      username: "",
      password: "",
    },
    error: false,
    error_msg: "",
    logged: false,
  };

  componentDidMount() {
    if (!cookies.get("token")) {
      return;
    } else {
      this.setState({ logged: true });
    }
  }

  onSubmit = (e) => {
    e.preventDefault();
  };

  onChange = async (e) => {
    this.setState({
      error: false,
      credentials: {
        ...this.state.credentials,
        [e.target.name]: e.target.value,
      },
    });
  };

  login = (event) => {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(this.state.credentials),
    };

    fetch(Url.url_login, requestOptions)
      .then(async (response) => {
        const data = await response.json();
        if (response.status === 200) {
          cookies.set("token", data["Auth-token"], { path: "/" });

          // window.location.href = "./reportes";
          this.setState({ logged: true });
          window.location.href = "./reportes";
          // return (<Redirect to="/reportes" />);
        } else {
          this.setState({
            error: true,
            error_msg: "Usuario o contraseña inválidos",
          });
        }
      })
      .catch((err) => {
        this.setState({
          error: true,
          error_msg: "Error al conectar con el servidor",
        });
      });
  };

  render() {
    return (
      <div className="contenido-centrado fondo">
        <LoginHeader />

        <div
          id="contenedor"
          style={{ paddingTop: this.state.error ? "0px" : "30px" }}
        >
          {this.state.error === true && (
            <div className="contenedor-error">
              <span>{this.state.error_msg}</span>
            </div>
          )}

          <form onSubmit={this.onSubmit}>
            <div id="bloque1">
              <div className="row texto">
                <div className="col-sm">
                  <p>Usuario:</p>
                </div>
                <div className="col-sm">
                  <input
                    type="text"
                    className="form-control"
                    id="username"
                    name="username"
                    value={this.state.credentials.username}
                    onChange={this.onChange}
                  ></input>
                </div>
              </div>

              <div className="row texto">
                <div className="col-sm">
                  <p>Contraseña:</p>
                </div>
                <div className="col-sm">
                  <input
                    type="password"
                    className="form-control"
                    id="password"
                    name="password"
                    value={this.state.credentials.password}
                    onChange={this.onChange}
                  ></input>
                </div>
              </div>

              <div className="row texto">
                <div className="col-sm">
                  <p>Tipo:</p>
                </div>
                <div className="col-sm">
                  <input
                    type="text"
                    className="form-control"
                    name="tipo"
                    value="Administrador"
                    disabled={true}
                  ></input>
                </div>
              </div>
              <div className="row texto">
                <div className="col-sm">
                  <input
                    type="submit"
                    className="btn btn-success"
                    value="Ingresar"
                    onClick={this.login}
                  ></input>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default Login;

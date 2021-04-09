//librerias
import React, { useState } from "react";
import axios from "axios";
import Cookies from "universal-cookie";
import { useHistory } from "react-router-dom";
import { Container, Row, Col, FormGroup } from "reactstrap";

//css
import "./Vendedor.css";
import "bootstrap/dist/css/bootstrap.min.css";

//componentes
import NavBar from "../componentes_comunes/navbar";
import LabelVendedor from "../componentes_comunes/label_administrador";
import Separador from "../componentes_comunes/separador";

const cookies = new Cookies();

const VendedorAdd = (props) => {
  let history = useHistory();

  const [vendedor, setVendedor] = useState({
    username: "",
    email: "",
    password: "",
    first_name: "",
    last_name: "",
  });

  const onInputChange = (e) => {
    setVendedor({ ...vendedor, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    let token = cookies.get("token");

    const options = {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Token ${token}`,
      },
    };

    let data = {
      username: vendedor.username,
      email: vendedor.email,
      password: vendedor.password,
      first_name: vendedor.first_name,
      last_name: vendedor.last_name,
    };

    const formData = new FormData();

    for (let key in data) {
      formData.append(key, data[key]);
    }

    await axios
      .post(global.url_registrar_vendedor, formData, options)
      .then((res) => {
        console.log(res);
        history.push("/vendedores");
      })
      .catch((error) => {
        console.log(error);
        alert(error.toString());
      });
  };

  return (
    <div>
      <NavBar {...props} />
      <LabelVendedor />
      <Separador nombre="Vendedores" />
      <div className="container">
        <Container>
          <Container id="form-cont">
            <form id="comiAdd" onSubmit={(e) => onSubmit(e)}>
              <Row>
                <Col className="py-1" xs xl="7">
                  <FormGroup className="groupf mb-3">
                    <label>Username:</label>
                    <input
                      id="inpnom"
                      required
                      className="form-control"
                      name="username"
                      type="text"
                      onChange={(e) => onInputChange(e)}
                    />
                  </FormGroup>
                </Col>
                <Col className="py-1" xs xl="7">
                  <FormGroup className="groupf mb-3">
                    <label>Email:</label>
                    <input
                      required
                      className="form-control"
                      name="email"
                      type="text"
                      onChange={(e) => onInputChange(e)}
                    />
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <Col className="py-1" xs xl="7">
                  <FormGroup className="groupf mb-3">
                    <label>Primer Nombre:</label>
                    <input
                      required
                      className="form-control"
                      name="first_name"
                      type="text"
                      onChange={(e) => onInputChange(e)}
                    />
                  </FormGroup>
                </Col>
                <Col className="py-1" xs xl="7">
                  <FormGroup className="groupf mb-3">
                    <label>Segundo Nombre:</label>
                    <input
                      required
                      className="form-control"
                      name="last_name"
                      type="text"
                      onChange={(e) => onInputChange(e)}
                    />
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <Col className="py-1" xs="6" xl="7">
                  <FormGroup className="groupf mb-3">
                    <label>Password:</label>
                    <input
                      required
                      className="form-control"
                      name="password"
                      type="password"
                      onChange={(e) => onInputChange(e)}
                    />
                  </FormGroup>
                </Col>
              </Row>
              <footer id="addfoot">
                <button
                  type="submit"
                  className="btn btn-success addbuts"
                  to="/vendedor/add"
                >
                  Agregar
                </button>
                <button
                  onClick={() => history.goBack()}
                  className="btn btn-danger addbuts"
                >
                  Cancelar
                </button>
              </footer>
            </form>
          </Container>
        </Container>
      </div>
    </div>
  );
};
export default VendedorAdd;

//librerias
import React, { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "universal-cookie";
import { useHistory } from "react-router-dom";
import { Container, Row, Col, FormGroup } from "reactstrap";
import { FilePond, registerPlugin } from "react-filepond";
import FilePondPluginImageExifOrientation from "filepond-plugin-image-exif-orientation";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";

//css
import "bootstrap/dist/css/bootstrap.min.css";
import "filepond/dist/filepond.min.css";

//componentes
import NavBar from "../componentes_comunes/navbar";
import LabelVendedor from "../componentes_comunes/label_administrador";
import Separador from "../componentes_comunes/separador";

//constantes
import * as Url from "../../recursos/constantes/http-url";

registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview);

const cookies = new Cookies();

const SuscripcionAdd = (props) => {
  let history = useHistory();

  const [suscripcion, setSuscripcion] = useState({
    nombre: "",
    id_tipo_suscripcion: null,
    precio: null,
    cantidad_comidas: null,
    comidas_gratis: null,
    color: ""
  });

  const [tipoSuscripcion, setTipoSuscripcion] = useState([]);

  useEffect(() => {
    loadTipoSuscripciones();
  }, []);

  const setTipo = (e) => {
		// console.log(e.target.value);
		setSuscripcion({ ...suscripcion, [e.target.name]: e.target.value });
	};

  const loadTipoSuscripciones = async () => {
    const result = await axios.get(Url.url_tipoSuscripciones);
    const { data } = result;
    setTipoSuscripcion(data);
  }

  const onInputChange = (e) => {
    setSuscripcion({ ...suscripcion, [e.target.name]: e.target.value });
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
      nombre: suscripcion.nombre,
      id_tipo_suscripcion: suscripcion.id_tipo_suscripcion,
      precio: suscripcion.precio,
      cantidad_comidas: suscripcion.cantidad_comidas,
      comidas_gratis: suscripcion.cantidad_comidas,
      color: suscripcion.color
    };
    console.log(data);

    const formData = new FormData();

    for (let key in data) {
      formData.append(key, data[key]);
    }

    await axios
      .post(Url.url_suscripcion + "0", formData, options)
      .then((res) => {
        console.log(res);
        history.push("/suscripciones");
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
      <Separador nombre="Suscripciones" />
      <div className="container">
        <Container>
          <Container id="form-cont">
            <form id="comiAdd" onSubmit={(e) => onSubmit(e)}>
              <Row>
                <Col className="py-1" md="6">
                  <FormGroup>
                    <label>Nombre:</label>
                    <input className="form-control" name="nombre" type="text" onChange={(e) => onInputChange(e)} required />
                  </FormGroup>
                </Col>
                <Col className="py-1" md="6">
                  <Row>
                    <Col  md="12">
                      <label>Tipo:</label>
                    </Col>
                  </Row>
                  <Row>
                    <Col className="py-1" md="6">
                      <select md="6" required style={{ border: "2px solid #77d353" }} name="id_tipo_suscripcion" onChange={(e) => setTipo(e)} > {tipoSuscripcion.map((item) => { return <option value={item.id}>{item.nombre}</option>; })} </select>
                    </Col>
                  </Row>
                </Col>
              </Row>
              <Row>
                <Col className="py-1" md="6">
                  <FormGroup>
                    <label>Precio:</label>
                    <input className="form-control" name="precio" type="number" onChange={(e) => onInputChange(e)} required />
                  </FormGroup>
                </Col>
                <Col className="py-1" md="6">
                  <FormGroup>
                    <label>Cantidad de comidas:</label>
                    <input className="form-control" name="cantidad_comidas" type="number" onChange={(e) => onInputChange(e)} required />
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <Col className="py-1" md="6">
                  <FormGroup>
                    <label>Comidas Gratis:</label>
                    <input className="form-control" name="comidas_gratis" type="number" onChange={(e) => onInputChange(e)} required />
                  </FormGroup>
                </Col>
                <Col className="py-1" md="6">
                  <FormGroup>
                    <label>Color:</label>
                    <input className="form-control" name="color" type="text" onChange={(e) => onInputChange(e)} required />
                  </FormGroup>
                </Col>
              </Row>
              <button type="submit" className="btn btn-success addbuts" to="/suscripcion/add" > Agregar </button>
            </form>
            <footer id="addfoot">
              <button onClick={() => history.goBack()} className="btn btn-danger addbuts" > Cancelar </button>
            </footer>
          </Container>
        </Container>
      </div>
    </div>
  );
};
export default SuscripcionAdd;

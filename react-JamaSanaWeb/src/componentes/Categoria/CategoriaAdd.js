//librerias
import React, { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "universal-cookie";
import { useHistory } from "react-router-dom";
import { Container, Row, Col, FormGroup } from "reactstrap";

//css
import "./Categoria.css";
import "bootstrap/dist/css/bootstrap.min.css";

//componentes
import NavBar from "../componentes_comunes/navbar";
import LabelVendedor from "../componentes_comunes/label_administrador";
import Separador from "../componentes_comunes/separador";

//constantes
import * as Url from "../../recursos/constantes/http-url";

const cookies = new Cookies();

const CategoriaAdd = (props) => {
  let history = useHistory();

  const [categoria, setCategoria] = useState({
    nombre: "",
    imagen: null,
  });

  const [image, setImage] = useState([]);
  const [imageUrl, setImageUrl] = useState([]);

  useEffect(() => {
    setImageUrl(
      "https://cdn4.iconfinder.com/data/icons/ionicons/512/icon-camera-512.png"
    );
  }, []);

  const onInputChange = (e) => {
    setCategoria({ ...categoria, [e.target.name]: e.target.value });
  };
  const selectFile = (e) => {
    setImage(e.target.files[0]);
    setImageUrl(URL.createObjectURL(e.target.files[0]));
    setCategoria({ ...categoria }, "imagen", image);
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
      nombre: categoria.nombre,
      imagen: image,
    };

    const formData = new FormData();

    for (let key in data) {
      formData.append(key, data[key]);
    }

    await axios
      .post(Url.url_categoria + "0", formData, options)
      .then((res) => {
        console.log(res);
        history.push("/categorias");
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
      <Separador nombre="Categorias" />
      <div className="container">
        <Container>
          <Container id="form-cont">
            <form id="comiAdd" onSubmit={(e) => onSubmit(e)}>
              <Row>
                <Col className="py-1" xs xl="7">
                  <FormGroup className="groupf mb-3">
                    <label>Nombre:</label>
                    <input
                      id="inpnom"
                      required
                      className="form-control"
                      name="nombre"
                      type="text"
                      onChange={(e) => onInputChange(e)}
                    />
                  </FormGroup>
                  <FormGroup className="groupf mb-3">
                    <div className="mt-3">
                      <label>Link-img:</label>
                      <input
                        required
                        name="srcimg"
                        type="file"
                        accept="image/*"
                        onChange={(e) => selectFile(e)}
                      />
                    </div>
                  </FormGroup>
                  <div id="img-add">
                    <img id="addimg" src={imageUrl} alt="" />
                  </div>
                </Col>
              </Row>
              <button
                type="submit"
                className="btn btn-success addbuts"
                to="/categoria/add"
              >
                Agregar
              </button>
            </form>
            <footer id="addfoot">
              <button
                onClick={() => history.goBack()}
                className="btn btn-danger addbuts"
              >
                Cancelar
              </button>
            </footer>
          </Container>
        </Container>
      </div>
    </div>
  );
};
export default CategoriaAdd;

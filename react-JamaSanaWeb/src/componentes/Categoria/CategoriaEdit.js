//librerias
import React, { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "universal-cookie";
import { useHistory, useParams } from "react-router-dom";
import { Container, Row, Col, FormGroup } from "reactstrap";

//css
import "./Categoria.css";
import "bootstrap/dist/css/bootstrap.min.css";

//componentes
import NavBar from "../componentes_comunes/navbar";
import LabelVendedor from "../componentes_comunes/label_administrador";
import Separador from "../componentes_comunes/separador";

const cookies = new Cookies();
const CategoriaEdit = (props) => {
  let history = useHistory();
  const { id } = useParams();

  const [image, setImage] = useState([]);
  const [imageUrl, setImageUrl] = useState([]);

  // const [categoria, setCategoria] = useState([]);
  const [categoria, setCategoria] = useState({
    nombre: "",
    imagen: "",
  });

  const { nombre } = categoria;

  useEffect(() => {
    loadCategoria();
  }, []);

  const onInputChange = (e) => {
    setCategoria({ ...categoria, [e.target.name]: e.target.value });
  };

  const loadCategoria = async () => {
    let token = cookies.get("token");
    const options = {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Token ${token}`,
      },
    };
    // console.log(global.url_categoria + id);
    const result = await axios.get(global.url_categoria + id, options);
    // console.log(result);
    setCategoria(result.data);
  }; // eslint-disable-line react-hooks/exhaustive-deps

  const onSubmit = async (e) => {
    e.preventDefault();
    // await axios.put(`http://localhost:3003/comidas/${id}`, comida);
    // console.log(global.url_categoria + id);
    // await axios.put(global.url_categoria + id, categoria);
    // history.push("/categorias");

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
      .put(global.url_categoria + id, formData, options)
      .then((res) => {
        console.log(res);
        history.push("/categorias");
      })
      .catch((error) => {
        console.log(error);
        alert(error.toString());
      });
  };

  const selectFile = (e) => {
    setImage(e.target.files[0]);
    setImageUrl(URL.createObjectURL(e.target.files[0]));
    setCategoria({ ...categoria }, "imagen", image);
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
                  <FormGroup class="groupf mb-3">
                    <label>Nombre:</label>
                    <input
                      id="inpnom"
                      required
                      className="form-control"
                      name="nombre"
                      type="text"
                      value={nombre}
                      onChange={(e) => onInputChange(e)}
                    />
                  </FormGroup>
                  <div id="img-add">
                    {/* <img id="addimg" src="https://cdn4.iconfinder.com/data/icons/ionicons/512/icon-camera-512.png" /> */}
                    <img
                      id="addimg"
                      src={global.url_static + categoria.imagen}
                      alt=""
                    />
                  </div>
                  <FormGroup class="groupf mb-3">
                    <div class="mt-3">
                      <label>Link-img:</label>
                      <input
                        name="imagen"
                        type="file"
                        accept="image/*"
                        // value={imagen}
                        onChange={(e) => selectFile(e)}
                      />
                    </div>
                  </FormGroup>
                  <div id="img-add">
                    <img id="addimg" src={imageUrl} alt="" />
                  </div>
                </Col>
              </Row>
              <footer id="addfoot">
                <button className="btn btn-success addbuts">Guardar</button>
                <button
                  onClick={() => history.goBack()}
                  class="btn btn-danger addbuts"
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

export default CategoriaEdit;

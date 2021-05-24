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
import "./Categoria.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "filepond/dist/filepond.min.css";
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css";

//componentes
import NavBar from "../componentes_comunes/navbar";
import LabelVendedor from "../componentes_comunes/label_administrador";
import Separador from "../componentes_comunes/separador";

//constantes
import * as Url from "../../recursos/constantes/http-url";

registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview);

const cookies = new Cookies();

const CategoriaAdd = (props) => {
  let history = useHistory();

  const [categoria, setCategoria] = useState({
    nombre: "",
    imagen: null,
  });
  const [files, setFiles] = useState([]);

  useEffect(() => {}, []);

  const onInputChange = (e) => {
    setCategoria({ ...categoria, [e.target.name]: e.target.value });
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
      imagen: files[0].file,
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
                  <FilePond
                    required
                    files={files}
                    onupdatefiles={setFiles}
                    allowMultiple={false}
                    name="files"
                    labelIdle='Drag & Drop your files or <span class="filepond--label-action">Browse</span>'
                  />
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

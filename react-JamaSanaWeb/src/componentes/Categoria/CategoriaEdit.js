//librerias
import React, { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "universal-cookie";
import { useHistory, useParams } from "react-router-dom";
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

// Register the plugins
registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview);

const cookies = new Cookies();
const CategoriaEdit = (props) => {
  let history = useHistory();
  const { id } = useParams();
  const [files, setFiles] = useState([]);
  const [categoria, setCategoria] = useState({});
  const { nombre } = categoria;

  useEffect(() => {
    loadCategoria();
  }, []);

  const onInputChange = (e) => {
    setCategoria({ ...categoria, [e.target.name]: e.target.value });
  };

  const changeImage = () => {
    document.getElementById("img-add").hidden = true;
  };

  const loadCategoria = async () => {
    let token = cookies.get("token");
    const options = {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Token ${token}`,
      },
    };

    const result = await axios.get(Url.url_categoria + id, options);
    setCategoria(result.data);
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

    let data = {};
    if (files.length > 0) {
      data = {
        nombre: categoria.nombre,
        imagen: files[0].file,
      };
      console.log("entre aqui");
    } else {
      data = {
        nombre: categoria.nombre,
      };
      console.log("no");
    }
    const formData = new FormData();

    for (let key in data) {
      console.log(data[key]);
      formData.append(key, data[key]);
    }

    await axios
      .put(Url.url_categoria + id, formData, options)
      .then((res) => {
        // console.log(res);
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
                      required
                      id="inpnom"
                      className="form-control"
                      name="nombre"
                      type="text"
                      value={nombre}
                      onChange={(e) => onInputChange(e)}
                    />
                  </FormGroup>
                  <div id="img-add">
                    <img
                      id="addimg"
                      src={Url.url_static + categoria.imagen}
                      alt=""
                    />
                  </div>
                  <FilePond
                    files={files}
                    onupdatefiles={setFiles}
                    allowMultiple={false}
                    // maxFiles={3}
                    // server="/api"
                    name="files"
                    // onupdatefiles={setFiles}
                    labelIdle='Drag & Drop your files or <span class="filepond--label-action">Browse</span>'
                    onaddfile={(e) => changeImage()}
                  />
                  {/* <FormGroup className="groupf mb-3">
                    <div className="mt-3">
                      <label>Link-img:</label>
                      <input
                        required
                        name="imagen"
                        type="file"
                        accept="image/*"
                        onChange={(e) => selectFile(e)}
                      />
                    </div>
                  </FormGroup> */}
                  {/* <div>
                    <img
                      id="edit_com"
                      className="img-add-2"
                      src="https://cdn4.iconfinder.com/data/icons/ionicons/512/icon-camera-512.png"
                      alt=""
                    />
                    <img
                      id="edit2_com"
                      className="img-add-2"
                      src={imageUrl}
                      alt=""
                      hidden
                    />
                  </div> */}
                </Col>
              </Row>
              <button className="btn btn-success addbuts">Actualizar</button>
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

export default CategoriaEdit;

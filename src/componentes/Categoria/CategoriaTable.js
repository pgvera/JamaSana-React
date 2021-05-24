//librerias
import React from "react";
import BootstrapTable from "react-bootstrap-table-next";
import axios from "axios";
import { Link } from "react-router-dom";
import * as Icon from "react-bootstrap-icons";

//css
import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css";

//componentes
import CategoriaHome from "./CategoriaHome";

//constantes
import * as Url from "../../recursos/constantes/http-url";

const deleteUser = async (id) => {
  await axios.delete(Url.url_categoria + id);
  CategoriaHome.loadCategorias();
};

function rankFormatter(cell, row, rowIndex, formatExtraData) {
  return <img src={Url.url_static + cell} className="img_cat" alt="" />;
}

function format(cell, row) {
  return (
    <div>
      <span>
        <Link className="links-comida" to={`/categoria/edit/${cell}`}>
          <Icon.Pencil id="edit" className="iconos"></Icon.Pencil>
        </Link>
      </span>
      <span>
        <Link className="links-comida" onClick={() => deleteUser(cell)}>
          <Icon.DashCircleFill
            id="delete"
            className="iconos"
          ></Icon.DashCircleFill>
        </Link>
      </span>
    </div>
  );
}

const columns = [
  {
    dataField: "id",
    text: "Product ID",
    hidden: true,
  },
  {
    dataField: "nombre",
    text: "Nombre",
  },
  {
    dataField: "imagen",
    text: "Imagen",
    formatter: rankFormatter,
  },
  {
    dataField: "id",
    text: "Acciones",
    formatter: format,
  },
];

const CategoriaTable = (props) => (
  <BootstrapTable keyField="id" data={props.categorias} columns={columns} />
);

export default CategoriaTable;

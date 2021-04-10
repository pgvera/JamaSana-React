//librerias
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, Redirect } from "react-router-dom";
import * as Icon from "react-bootstrap-icons";
import Cookies from "universal-cookie";
// librerias de la tabla
import BootstrapTable from "react-bootstrap-table-next";
import ToolkitProvider, { Search } from "react-bootstrap-table2-toolkit";
import paginationFactory from "react-bootstrap-table2-paginator";

//css
// import './Categoria.css';
import "./Vendedor.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css";

//componentes
import NavBar from "../componentes_comunes/navbar";
import LabelVendedor from "../componentes_comunes/label_administrador";
import Separador from "../componentes_comunes/separador";

const cookies = new Cookies();

const VendedorHome = (props) => {
  const [vendedores, setVendedor] = useState([]);
  const [logged, setLogged] = useState(true);

  const comprobacion = () => {
    if (!cookies.get("token")) {
      setLogged(false);
    } else {
      return;
    }
  };

  useEffect(() => {
    comprobacion();
    loadVendedores();
  }, []);

  // cargar todas las vendedores
  const loadVendedores = async () => {
    let token = cookies.get("token");
    const options = {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Token ${token}`,
      },
    };

    // const result = await axios.get(global.url_vendedores, options).then(res => {
    //   console.log(res)
    // }).catch(error => {
    //   console.log(error)
    //   alert('No se puede obtener Vendedores  \n'+error.toString())
    // });

    const result = await axios.get(global.url_vendedores, options);
    setVendedor(result.data.reverse());

    // const result = await axios.get(global.url_vendedores);
    // setCategoria(result.data.reverse());
  };

  const deleteVendedores = async (id) => {
    let token = cookies.get("token");
    const options = {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Token ${token}`,
      },
    };

    await axios
      .delete(global.url_vendedor + id, options)
      .then((res) => {
        console.log(res);
      })
      .catch((error) => {
        console.log(error);
        alert("No se puede eliminar ese Vendedor  \n" + error.toString());
      });

    loadVendedores();
  };

  function format(cell, row) {
    console.log(cell);
    return (
      <div>
        <span>
          <Link className="links-comida" to={`/vendedor/edit/${cell}`}>
            <Icon.Pencil id="edit" className="iconos"></Icon.Pencil>
          </Link>
        </span>
        <span>
          <Link className="links-comida" onClick={() => deleteVendedores(cell)}>
            <Icon.DashCircleFill
              id="delete"
              className="iconos"
            ></Icon.DashCircleFill>
          </Link>
        </span>
      </div>
    );
  }

  const { SearchBar, ClearSearchButton } = Search;

  const columns = [
    {
      dataField: "id",
      text: "ID",
      hidden: true,
    },
    {
      dataField: "username",
      text: "Usuario",
      sort: true,
    },
    {
      dataField: "id",
      text: "Acciones",
      formatter: format,
      // align: 'center'
    },
  ];

  const customTotal = (from, to, size) => (
    <span className="react-bootstrap-table-pagination-total">
      Showing {from} to {to} of {size} Results
    </span>
  );

  const options = {
    sizePerPage: 3,
    pageStartIndex: 0,
    firstPageText: "<<",
    prePageText: "<",
    nextPageText: ">",
    lastPageText: ">>",
    alwaysShowAllBtns: true,
    showTotal: true,
    paginationTotalRenderer: customTotal,
    sizePerPageList: [
      {
        text: "5",
        value: 5,
      },
      {
        text: "10",
        value: 10,
      },
      {
        text: "All",
        value: vendedores.length,
      },
    ], // A numeric array is also available. the purpose of above example is custom the text
  };

  const MyExportCSV = (props) => {
    const handleClick = () => {
      props.onExport();
    };
    return (
      <div>
        <button className="btn btn-success" onClick={handleClick}>
          Export to CSV
        </button>
      </div>
    );
  };

  const defaultSorted = [
    {
      dataField: "username",
      order: "desc",
    },
  ];

  // la pagina web - la vista
  if (!logged) {
    return <Redirect to="/" />;
  } else {
    return (
      <div>
        <NavBar {...props} />
        <LabelVendedor />
        <Separador nombre="Vendedores" />
        <div className="table_cat">
          <ToolkitProvider
            bootstrap4
            keyField="id"
            data={vendedores}
            columns={columns}
            search
            exportCSV
          >
            {(props) => (
              <div>
                <div className="row">
                  {/* <div className="col-sm">
                    <h3>Buscar:</h3>
                    </div> */}
                  <div className="col-sm">
                    <SearchBar {...props.searchProps} />
                    <ClearSearchButton {...props.searchProps} />
                  </div>
                  <div className="col-sm">
                    <Link
                      id="addhome"
                      className="btn btn-light"
                      to="/vendedor/add"
                    >
                      Añadir<Icon.Plus className="iconplus"></Icon.Plus>
                    </Link>
                  </div>
                </div>

                <br></br>
                <br></br>
                {/* <BootstrapTable keyField='id' data={vendedores} columns={columns}  bordered={false} /> */}
                <MyExportCSV {...props.csvProps} />
                <BootstrapTable
                  bootstrap4
                  defaultSorted={defaultSorted}
                  {...props.baseProps}
                  bordered={false}
                  pagination={paginationFactory(options)}
                />
              </div>
            )}
          </ToolkitProvider>
        </div>
      </div>
    );
  }
};

export default VendedorHome;

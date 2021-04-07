//librerias
import React from 'react'
import BootstrapTable from 'react-bootstrap-table-next';
import axios from "axios";
import { Link, Redirect } from "react-router-dom";
import * as Icon from 'react-bootstrap-icons';

//css
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';

//componentes
import CategoriaHome from "./CategoriaHome";

const deleteUser = async id => {
    // let url = global.host + `categorias/${id}`;
    await axios.delete(global.url_categoria+id);
    CategoriaHome.loadCategorias();
  };

function rankFormatter(cell, row, rowIndex, formatExtraData) {
    return (
    //   <i className={ formatExtraData[cell] } />
    <img src={global.url_static+cell} className="img_cat"/> 
    );
  }

  function format(cell, row){
    return(
        <div>
            <span><Link className="links-comida" to={`/categoria/edit/${cell}`}><Icon.Pencil id="edit" className="iconos"></Icon.Pencil></Link></span>
            <span><Link className="links-comida" onClick={() => deleteUser(cell)}><Icon.DashCircleFill id="delete" className="iconos"></Icon.DashCircleFill></Link></span>
        </div>
        
    );
  }


const columns = [{
    dataField: 'id',
    text: 'Product ID',
    hidden: true
  }, {
    dataField: 'nombre',
    text: 'Nombre'
  }, {
    dataField: 'imagen',
    text:"Imagen",
    formatter: rankFormatter
},{
    dataField:"id",
    text: "Acciones",
    formatter: format

}
];



const CategoriaTable = (props) => (
    <BootstrapTable keyField='id' data={ props.categorias } columns={ columns }  />

//   <table>
//     <thead>
//       <tr>
//         <th>Nombre</th>
//         <th>Imagen</th>
//         <th>Actions</th>
//       </tr>
//     </thead>
//     <tbody>
//       {props.categorias.length > 0 ? (
//         props.categorias.map((categoria) => (
//           <tr key={categoria.id}>
//             <td>{categoria.nombre}</td>
//             <td><img src={categoria.imagen} alt=""/></td>
//             <td>
//               <button className="button muted-button">Edit</button>
//               <button className="button muted-button">Delete</button>
//             </td>
//           </tr>
//         ))
//       ) : (
//         <tr>
//           <td colSpan={3}>No users</td>
//         </tr>
//       )}
//     </tbody>
//   </table>
)

export default CategoriaTable
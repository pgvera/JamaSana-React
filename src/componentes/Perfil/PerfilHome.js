//Librerias
import React, {useState, useEffect} from 'react'
import axios from 'axios';
import {Link} from 'react-router-dom';
import * as Icon from 'react-bootstrap-icons';
import Cookies from 'universal-cookie';
//Tabla
import BootstrapTable from 'react-bootstrap-table-next';
import ToolkitProvider, {Search} from 'react-bootstrap-table2-toolkit';
import paginationFactory from 'react-bootstrap-table2-paginator';
//Componentes
import Navbar from '../componentes_comunes/navbar';
import LabelVendedor from '../componentes_comunes/label_administrador';
import Separador from '../componentes_comunes/separador';
//Constantes
import * as Url from '../../recursos/constantes/http-url';

const cookies = new Cookies();

const Perfil = (props) => {

	const [perfiles, setPerfiles] = useState([]);
	const [logged, setLogged] = useState(false);

	//Funciones para las vainitas locas

	useEffect(() => {
		loadPerfiles();
	}, []);

	const loadPerfiles = async () => {
		const perfilesP = await axios.get(Url.url_allperfilesp);
		setPerfiles(perfilesP.data);
	}

	const format = (row, cell) =>
	(
		<div>
			<span>
				<Link to="/" className="links-comida">
					<Icon.Pencil id="edit" className="iconos"></Icon.Pencil>
				</Link>
			</span>
			<span>
				<label onClick={() => console.log(cell)} className="links-comida" >
					<Icon.DashCircleFill id="delete" className="iconos"></Icon.DashCircleFill>
				</label>
			</span>
		</div >
	);

	const {SearchBar, ClearSearchButton} = Search;

	const columns = [
		{
			dataField: "id",
			text: "Product ID",
			hidden: true,
		},
		{
			dataField: "nombre",
			text: "Nombre del perfil",
			sort: true,
		},
		{
			dataField: "peso_minimo",
			text: "Peso",
			sort: true,
		},
		{
			dataField: "altura_minimo",
			text: "Altura",
			sort: true,
		},
		{
			dataField: "imc_minimo",
			text: "IMC",
			sort: true,
		},
		{
			dataField: "id",
			text: "Acciones",
			formatter: format,
		}
	];

	const custom = (from, to, size) =>
	(
		<span className="react-bootstrap-table-pagination-total" >
			Mostrando {from} a {to} de {size} resultados.
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
		paginationTotalRenderer: custom,
		sizePerPageList: [
			{
				text: "5",
				value: 5
			},
			{
				text: "10",
				value: 10
			},
			{
				text: "All",
				value: perfiles.length,
			},
		],
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

	const defaultSort = [
		{
			dataField: "name",
			order: "desc",
		},
	];

	//Vista
	return (
		<div>
			<Navbar {...props} />
			<LabelVendedor />
			<Separador nombre="Perfiles" />
			<div className="table_cat" >
				<ToolkitProvider
					bootstrap4
					keyField="id"
					data={perfiles}
					columns={columns}
					search
					exportCSV
				>
					{(props) => (
						<div>
							<div className="row">
								<div className="col-sm">
									<SearchBar {...props.searchProps} />
									<ClearSearchButton {...props.searchProps} />
								</div>
								<div className="col-sm">
									<Link to="/perfiles/add"
										id="addPerfil"
										className="btn btn-light"
									>
										Añadir<Icon.Plus className="iconplus"></Icon.Plus>
									</Link>
								</div>
							</div>
							<br />
							<br />
							<MyExportCSV {...props.csvProps} />
							<BootstrapTable
								bootstrap4
								defaultSorted={defaultSort}
								{...props.baseProps}
								bordered={false}
								pagination={paginationFactory(options)}
							/>
						</div>
					)}
				</ToolkitProvider>
			</div>
		</div >
	);
};

export default Perfil;

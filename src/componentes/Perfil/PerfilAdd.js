//librerias
import React, {useState, useEffect} from "react";
import axios from "axios";
import Cookies from "universal-cookie";
import {useHistory} from "react-router-dom";
import {Container, Label, Input, Row, Col, FormGroup, Form} from "reactstrap";
import {FilePond, registerPlugin} from "react-filepond";

//css
import "bootstrap/dist/css/bootstrap.min.css";
import "filepond/dist/filepond.min.css";

//componentes
import NavBar from "../componentes_comunes/navbar";
import LabelVendedor from "../componentes_comunes/label_administrador";
import Separador from "../componentes_comunes/separador";

//constantes
import * as Url from "../../recursos/constantes/http-url";

const cookies = new Cookies();

const PerfilAdd = (props) => {

	let history = useHistory();

	const [categorias, setCategorias] = useState([]);
	//const [categorias_selecciondas, setCategoriasSelecciondas] = useState([]);
	const [perfil, setPerfil] = useState({
		nombre: "",
		peso_mode_comparator: "1",
		peso_minimo: "0",
		peso_maximo: "0",
		altura_mode_comparator: "1",
		altura_minimo: "0",
		altura_maximo: "0",
		imc_mode_comparator: "1",
		imc_minimo: "0",
		imc_maximo: "0",
	});

	useEffect(() => {
		loadCategories();
	}, []);

	const loadCategories = async () => {
		const response = await axios.get(Url.url_categorias);
		setCategorias(response.data);
	}

	const inputChangeHandler = (e) => {
		setPerfil({
			...perfil,
			[e.target.name]: e.target.value,
		});
	}

	return (
		<div>
			<NavBar {...props} />
			<LabelVendedor />
			<Separador nombre="Perfiles" />
			<div className="container">
				<Container id="font-cont">
					<Form id="perfilPadd">
						<FormGroup>
							<Label for="nombreP">Nombre: </Label>
							<Input type="text" name="nombre" id="nombreP" value={perfil.nombre} onChange={e => inputChangeHandler(e)} />
						</FormGroup>
						<Row>
							<Col md="6">
								{/*Parte del peso*/}
								<FormGroup>
									<Label for="comp_peso">Tipo de comparador (peso): </Label>
									<Input type="select" name="peso_mode_comparator" id="comp_peso" onChange={e => inputChangeHandler(e)}>
										<option value={1} > Mayor que </option>
										<option value={2} > Menor que </option>
										<option value={3} > Igual a </option>
										<option value={4} > Entre </option>
										<option value={5} > Fuera de </option>
									</Input>
								</FormGroup>
								{(() => {
									switch (perfil.peso_mode_comparator) {
										case "1":
											return (<Input type="number" name="peso_maximo" id="valor_peso" onChange={e => inputChangeHandler(e)}></Input>);
											break;
										case "2":
											return (<Input type="number" name="peso_minimo" id="valor_peso" onChange={e => inputChangeHandler(e)}></Input>);
											break;
										case "3":
											return (<Input type="number" name="peso_maximo" id="valor_peso" onChange={e => inputChangeHandler(e)}></Input>);
											break;
										default:
											return (
												<Row>
													<Col md="6">
														<Input type="number" name="peso_maximo" id="valor_peso" onChange={e => inputChangeHandler(e)}></Input>
													</Col>
													<Col md="6">
														<Input type="number" name="peso_minimo" id="valor_peso" onChange={e => inputChangeHandler(e)}></Input>
													</Col>
												</Row>
											);
											break;
									}
								})()}
							</Col>
							<Col md="6">
								{/*Parte del altura*/}
								<FormGroup>
									<Label for="comp_altura">Tipo de comparador (altura): </Label>
									<Input type="select" name="altura_mode_comparator" id="comp_altura" onChange={e => inputChangeHandler(e)}>
										<option value={1} > Mayor que </option>
										<option value={2} > Menor que </option>
										<option value={3} > Igual a </option>
										<option value={4} > Entre </option>
										<option value={5} > Fuera de </option>
									</Input>
								</FormGroup>
								{(() => {
									switch (perfil.altura_mode_comparator) {
										case "1":
											return (<Input type="number" name="altura_maximo" id="valor_altura" onChange={e => inputChangeHandler(e)}></Input>);
											break;
										case "2":
											return (<Input type="number" name="altura_minimo" id="valor_altura" onChange={e => inputChangeHandler(e)}></Input>);
											break;
										case "3":
											return (<Input type="number" name="altura_maximo" id="valor_altura" onChange={e => inputChangeHandler(e)}></Input>);
											break;
										default:
											return (
												<Row>
													<Col md="6">
														<Input type="number" name="altura_maximo" id="valor_peso" onChange={e => inputChangeHandler(e)}></Input>
													</Col>
													<Col md="6">
														<Input type="number" name="altura_minimo" id="valor_peso" onChange={e => inputChangeHandler(e)}></Input>
													</Col>
												</Row>
											);
											break;
									}
								})()}
							</Col>
						</Row>
						<FormGroup>
							<Label for="categorias"> Seleccionar categorias </Label>
							<Container>
								<Input type="select" multiple size="5" onChange={(e => console.log(e))}>
									{
										categorias.map(categoria => <option key={categoria.id} value={categoria.id}> {categoria.nombre} </option>)
									}
								</Input>
							</Container>
						</FormGroup>
						<Row>
							<Col md={{size: "1", offset: "4"}} > {/*md={{size: "2", offset: "5"}}*/}
								<button className="btn btn-success" onClick={() => console.log("Agregado")} > Agregar </button>
							</Col>
							<Col md={{size: "5", offset: "2"}}>
								<button className="btn btn-danger" onClick={() => history.goBack()} > Cancelar </button>
							</Col>
						</Row>
					</Form>
				</Container>
			</div>
		</div >
	);
};

export default PerfilAdd;


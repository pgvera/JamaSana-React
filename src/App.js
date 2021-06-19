import React from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';

//css
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

// Componentes
import CategoriaHome from './componentes/Categoria/CategoriaHome';
import Login from './componentes/Login/Login';
import Dashboard from './componentes/Dashboard/dashboard';
import CategoriaAdd from './componentes/Categoria/CategoriaAdd';
import CategoriaEdit from './componentes/Categoria/CategoriaEdit';
import VendedorHome from './componentes/Vendedor/VendedorHome';
import VendedorAdd from './componentes/Vendedor/VendedorAdd';
import VendedorEdit from './componentes/Vendedor/VendedorEdit';
import SuscripcionHome from './componentes/Suscripciones/SuscripcionHome';
import SuscripcionAdd from './componentes/Suscripciones/SuscripcionAdd';
import SuscripcionEdit from './componentes/Suscripciones/SuscripcionEdit';
import PerfilHome from './componentes/Perfil/PerfilHome';
import PerfilAdd from './componentes/Perfil/PerfilAdd';


function App() {
	return (
		<Router>
			<Switch>
				<Route exact path="/" render={props => (<Login {...props} />)} />
				<Route exact path="/reportes" render={props => (<Dashboard {...props} />)} />
				<Route exact path="/categorias" render={props => (<CategoriaHome {...props} />)} />
				<Route exact path="/categoria/add" render={props => (<CategoriaAdd {...props} />)} />
				<Route exact path="/categoria/edit/:id" render={props => (<CategoriaEdit {...props} />)} />
				<Route exact path="/vendedores" render={props => (<VendedorHome {...props} />)} />
				<Route exact path="/vendedor/add" render={props => (<VendedorAdd {...props} />)} />
				<Route exact path="/vendedor/edit/:id" render={props => (<VendedorEdit {...props} />)} />
				<Route exact path="/suscripciones" render={props => (<SuscripcionHome {...props} />)} />
				<Route exact path="/suscripcion/add" render={props => (<SuscripcionAdd {...props} />)} />
				<Route exact path="/suscripcion/edit/:id" render={props => (<SuscripcionEdit {...props} />)} />
				<Route exact path="/perfiles" render={props => (<PerfilHome {...props} />)} />
				<Route exact path="/perfiles/add" render={props => (<PerfilAdd {...props} />)} />
			</Switch>
		</Router>
	);
}


export default App;


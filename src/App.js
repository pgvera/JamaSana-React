import React from 'react';
import {  BrowserRouter as Router,  Switch,  Route} from 'react-router-dom';

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
      </Switch>
    </Router>
  );
}


export default App;

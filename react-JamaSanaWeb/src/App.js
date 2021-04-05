import React from 'react';
import {  BrowserRouter as Router,  Switch,  Route,  Link} from 'react-router-dom';

//css
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

// Componentes
import Categorias from './componentes/Categoria/Categorias';
import Login from './componentes/Login/Login';
import Principal from './componentes/Principal/Principal';


function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" render={props => (<Login {...props} />)} />
        <Route exact path="/reportes" render={props => (<Principal {...props} />)} />
        <Route exact path="/categorias" render={props => (<Categorias {...props} />)} />
      </Switch>
    </Router>
  );
}


export default App;


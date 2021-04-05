import React, { Component } from 'react';
// import '../../css/login_page.css';
import './login_page.css';

class LoginHeader extends Component {

    render(){
        return (
            <div className="contenido-header contenido-centrado" >
                <p className="title-style" > Bienvenido a LaJamaSana</p>
                <img src="https://i.imgur.com/zUIOEXt.png" alt="logo-jamasana"  />
            </div>
        );
    }
}

export default LoginHeader;
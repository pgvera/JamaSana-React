import React from "react";
import "./separador.css";

const Separador = (props) => {
  return (
    <div>
      <p className="separador fuente-color">
        {" "}
        <s id="s1"></s> {props.nombre} <s id="s2"></s>{" "}
      </p>
    </div>
  );
};

export default Separador;

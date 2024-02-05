import React from "react";
import { CardTools } from "../cards/CardTools.jsx";

const CeoTools = () => {
  const user = JSON.parse(localStorage?.getItem("user"));

  return (
    <>
      {user?.role === "ceo" ? (
        <article className="grid md:grid-cols-3 grid-cols-1 gap-10 my-8">
          <CardTools
            to="·"
            title="Crear Tema"
            content="Ingresa aquí para generar nuevos temas y subtemas."
          />
          <CardTools
            to="crear"
            title="Crear Post"
            content="Ingresa aquí para generar nuevos Posts."
          />
          <CardTools
            to="CeoPost"
            title="Todos los posts"
            content="Ingresa aquí para ver todos los posts y poder modificarlos o bloquearlos."
          />
        </article>
      ) : null}
    </>
  );
};

export default CeoTools;

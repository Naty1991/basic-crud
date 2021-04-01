import React, { useState } from "react";
import uniqid from "uniqid"; /*libreria que nos aporta un id diferente*/
import "./Listadonombres.css";

const Listadonombres = () => {
  const [nombre, setNombre] = useState("");
  const [listaNombres, setListaNombres] = useState([]);
  const [modoEdicion, setModoEdicion] = useState(
    false
  ); /*false porque en principio no estamos en modo de edicion, estamos en modo registro*/
  const [id, setId] = useState("");
  const [error, setError] = useState(null);

  const addNombre = (e) => {
    if (!nombre.trim()) {
      setError("El campo nombre está vacío");
      return; /*con el return vamos a salir de la función padre addNombre y no nos va a imprimir nada*/
    }
    e.preventDefault();
    const nuevoNombre = {
      /*creamos un nuevo objeto con un id random*/ id: uniqid(),
      tituloNombre: nombre,
    };
    setListaNombres([
      ...listaNombres,
      nuevoNombre,
    ]); /*le damos a la lista, los nombres que colocamos en el input*/
    setNombre(""); /*para borrar la barra del input*/
    setError(null);
  };

  const deleteNombre = (id) => {
    const nuevoArray = listaNombres.filter((item) => item.id !== id);
    setListaNombres(nuevoArray);
  };

  const editar = (item) => {
    setModoEdicion(true);
    setNombre(item.tituloNombre);
    setId(item.id);
  };

  const editarNombre = (e) => {
    e.preventDefault();
    const nuevoArray = listaNombres.map((item) =>
      item.id === id ? { id: id, tituloNombre: nombre } : item
    );
    setListaNombres(nuevoArray);
    setModoEdicion(false);
    setNombre("");
  };

  return (
    <div>
      <h2 className="p-2 bg-secondary text-white text-center" >Aplicación de CRUD BÁSICA</h2>
      <div className="row" id="contenedor">
        <div className="col" id="columna1">
          <h2>Listado de nombres</h2>
          <ul className="list-group">
            {listaNombres.map((item) => (
              <li key={item.id} className="list-group-item" id="item">
                {item.tituloNombre}
                <div className="botones">
                  <button
                    onClick={() => {
                      editar(item);
                    }}
                    className="btn btn-info float-right"
                  >
                    Editar
                  </button>
                  <button
                    onClick={() => {
                      deleteNombre(item.id);
                    }}
                    className="btn btn-danger float-right"
                  >
                    Borrar
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
        <div className="col" id="columna2">
          <h2>Formulario para añadir nombres</h2>
          <form
            onSubmit={modoEdicion ? editarNombre : addNombre}
            className="form-group"
          >
            <input
              onChange={(e) => {
                setNombre(e.target.value);
              }}
              className="form-control mb-3"
              type="text"
              placeholder="Introduce el nombre"
              value={nombre} /*para borrar la barra del input*/
            />
            <input
              className="btn btn-success btn-block"
              id="registrar"
              type="submit"
              value={modoEdicion ? "Editar Nombre" : "Registrar Nombre"}
            />
          </form>
          {error != null ? (
            <div className="alert alert-danger">{error}</div>
          ) : (
            <div> </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Listadonombres;

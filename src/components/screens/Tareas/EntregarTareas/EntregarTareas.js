import { useState } from "react";
import "./EntregarTareas.css";
import { publicAxios } from "../../../../lib/apiClient";

const Entregar = () => {
  const [ImageSelectedPrevious, setImageSelectedPrevious] = useState(null);
  const changeFile = (e) => {
    console.log(e.target.files);
    if (e.target.files[0] !== undefined) {
      //ENVIAR ARCHIVO
    }
  };

  const getTareas = async (e) => {
    const params = {
      id: "6225659f6208d12d1cdce801",
    };
    const data = await publicAxios
      .get("/api/v1/tareas/alltareas/", { params })
      .then((response) => {
        console.log(response);
      })
      .catch((response) => {
        console.log(response);
      });
  };

  return (
    <>
      <div className="container">
        <div className="container-body">
          <div className="descripcion-tarea">
            <h2 className="titulo">Entregar Tarea:</h2>
            <h2 className="titulo">Funcion Fibonacci</h2>
            <br />
            <h3 className="subtitulo">Descripción</h3>
            <p className="descripcion">
              uedando esencialmente igual al original. Fue popularizado en los
              60s con la creación de las hojas "Letraset", las cuales contenian
              pasajes de Lorem Ipsum, y más recientemente con software de
              autoedición, como por ejemplo Aldus PageMaker, el cual incluye
              versiones de Lorem Ipsum.
            </p>
            <br />
            <h3 className="subtitulo">Valor</h3>
            <p className="puntaje">40 Puntos</p>
            <br />
            <h3 className="subtitulo">Tiempo Restante</h3>
            <p className="tiempo-restante">1 Hora 59 minutos</p>
          </div>

          <div className="entregable-tarea">
            <h3 className="subtitulo">Archivo de tarea</h3>
            <p className="descripcion">
              Arrastra y suelta el archivo de tu tarea en el cuadro o da un
              click en el boton para elegir el archivo. Cuando tu tarea este
              lista, da click en en bóton de "Entregar Tarea"
            </p>
            <br></br>
            <div className="image-upload-wrap">
              <input
                className="file-upload-input"
                type="file"
                accept="application/pdf"
                multiple
                onChange={(e) => {
                  changeFile(e);
                }}
              />
              <div className="text-information">
                <h3>
                  Arrastra y Suelta el archivo, o bien da click para buscar el
                  archivo
                </h3>
              </div>
            </div>
            <div className="btn-group">
              <button className="btn-cancel">Cancelar</button>
              <button
                className="btn-up"
                onClick={(e) => {
                  getTareas(e);
                }}
              >
                Enviar Tarea
              </button>
            </div>
            <br></br>
          </div>
        </div>
      </div>
    </>
  );
};

export default Entregar;

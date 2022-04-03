import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import "./SignUpForm.css";
import { publicAxios } from "../../../../lib/apiClient";
import DateSelect from "../../inputs/date/Date";
import Text from "../../inputs/text/Text";
import Button from "../../buttons/cta/Button";
import Date from "../../inputs/date/Date";

const SignUpForm = ({ tipo }) => {
  const [txtUsuario, setTxtUsuario] = useState("");
  const [txtContra, setTxtContra] = useState("");
  const [txtNombreUsuario, setTxtNombreUsuario] = useState("");
  const [txtApellidoUsuario, setTxtApellidoUsuario] = useState("");
  const [txtIdentidadUsuario, setTxtIdentidadUsuario] = useState("");
  const [fechaNac, setFechaNac] = useState({
    dia: 0,
    mes: 0,
    year: 0,
  });
  const [txtNombreEncargado, setTxtNombreEncargado] = useState("");
  const [txtApellidoEncargado, setTxtApellidoEncargado] = useState("");
  const [txtEmailEncargado, setTxtEmailEncargado] = useState("");
  const [txtTipoTituloDocente, setTxtTipoTituloDocente] = useState("");
  const [txtTituloTitle, setTxtTituloTitle] = useState("");
  const [txtTipoTelefono, setTxtTipoTelefono] = useState("");
  const [txtTelefonoUsuario, setTxtTelefonoUsuario] = useState("");
  const [txtDireccion, setTxtDireccion] = useState("");
  const [txtGenero, setTxtGenero] = useState("");
  const navigate = useNavigate();

  const onChangeHandler = ({ target: { name, value } }) => {
    switch (name) {
      case "txtUsuario":
        setTxtUsuario(value);
        break;

      case "txtContra":
        setTxtContra(value);
        break;

      case "txtIdentidadUsuario":
        setTxtIdentidadUsuario(value);
        break;

      case "txtNombreUsuario":
        setTxtNombreUsuario(value);
        break;

      case "txtApellidoUsuario":
        setTxtApellidoUsuario(value);
        break;

      case "txtDiaFN":
        setFechaNac({ ...fechaNac, dia: value });
        break;

      case "txtMesFN":
        setFechaNac({ ...fechaNac, mes: value });
        break;

      case "txtYearFN":
        setFechaNac({ ...fechaNac, year: value });
        break;

      case "txtNombreEncargado":
        setTxtNombreEncargado(value);
        break;

      case "txtApellidoEncargado":
        setTxtApellidoEncargado(value);
        break;

      case "txtEmailEncargado":
        setTxtEmailEncargado(value);
        break;

      case "txtTipoTituloDocente":
        setTxtTipoTituloDocente(value);
        break;

      case "txtTituloTitle":
        setTxtTituloTitle(value);
        break;

      case "txtGenero":
        setTxtGenero(value);
        break;

      case "txtSelectTipoTelefono":
        setTxtTipoTelefono(value);
        break;

      case "txtNumeroTelefonoUsuario":
        setTxtTelefonoUsuario(value);
        break;

      case "txtDireccionUsuario":
        setTxtDireccion(value);
        break;

      default:
        console.error("¿Cómo llegaste siquiera aquí?");
        break;
    }
  };

  const confirmarCrearCuentaDocente = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    dispatch({ type: "ON_SIGNUP_LOADING", payload: {} });
    try {
      let usuarioCreado = null;
      const bodyToSend = {
        identidad: txtIdentidadUsuario,
        nombres: txtNombreUsuario,
        apellidos: txtApellidoUsuario,
        fechaNacimiento: `${fechaNac.mes}/${fechaNac.dia}/${fechaNac.year}`,
        titulosAcademicos: [
          {
            tipo: txtTipoTituloDocente,
            nombre: txtTituloTitle,
          },
        ],
        genero: txtGenero,
        telefono: [
          {
            tipo: txtTipoTelefono,
            numero: txtTelefonoUsuario,
          },
        ],
        direccion: [
          {
            tipo: "Personal",
            direccion: txtDireccion,
          },
        ],
      };
      const bodyUser = {
        email: txtUsuario,
        password: txtContra,
      };
      const headerAPI = {
        headers: { apitoken: "2a7d17a0-d53d-4987-a7dd-c07bfe3bdc98" },
      };
      const data = await publicAxios.post(
        "/api/v1/docentes/new",
        bodyToSend,
        headerAPI
      );
      if (data?.data) {
        const idInsertado = data?.data?.result?.insertedId;
        publicAxios
          .put(`/api/v1/docentes/signin/${idInsertado}`, bodyUser, headerAPI)
          .then(() => navigate("/signup/success"))
          .catch(() => alert("Erroooor"));
      }
    } catch (error) {
      console.error("Error al crear el usuario");
    }
  };
  const confirmarCrearCuentaEstudiante = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    dispatch({ type: "ON_SIGNUP_LOADING", payload: {} });
    try {
      const bodyNewEstudiante = {
        identidad: txtIdentidadUsuario,
        nombres: txtNombreUsuario,
        apellidos: txtApellidoUsuario,
        fechaNacimiento: `${fechaNac.mes}/${fechaNac.dia}/${fechaNac.year}`,
        genero: txtGenero,
        telefono: [
          {
            tipo: txtTipoTelefono,
            numero: txtTelefonoUsuario,
          },
        ],
        fotoPerfil: "default.png",
        direccion: [
          {
            tipo: "Personal",
            direccion: txtDireccion,
          },
        ],
      };

      const bodyEncargado = {
        nombre: txtNombreEncargado,
        apellido: txtApellidoEncargado,
        telefono: [
          {
            tipo: "Personal",
            numero: "9885-9987",
          },
        ],
        email: txtEmailEncargado,
      };

      const bodyUsuarioEstudiante = {
        email: txtUsuario,
        password: txtContra,
      };
      const headerAPI = {
        headers: { apitoken: "2a7d17a0-d53d-4987-a7dd-c07bfe3bdc98" },
      };

      const dataNewEstudiante = await publicAxios.post(
        "/api/v1/estudiantes/new",
        bodyNewEstudiante,
        headerAPI
      );
      console.log(dataNewEstudiante);
      if (dataNewEstudiante?.data) {
        const idInsertado = dataNewEstudiante?.data?.result?.insertedId;
        const estaInsertadoEncargado = await publicAxios.put(
          `/api/v1/estudiantes/newencargado/${idInsertado}`,
          bodyEncargado,
          headerAPI
        );
        if (estaInsertadoEncargado.data) {
          publicAxios
            .put(
              `/api/v1/estudiantes/signin/${idInsertado}`,
              bodyUsuarioEstudiante,
              headerAPI
            )
            .then(() => {
              navigate("/signup/success");
            })
            .catch(() => alert("Error al crear cuenta de estudiante"));
        }
      }
    } catch (error) {
      console.error(error);
    }
  };
  const [formStep, setFormStep] = useState(0);
  const dispatch = useDispatch();

  return (
    <article className="signup-form-container">
      <h1
        id="signup-ft-usuario"
        className="signup-form-title"
        style={{ marginBottom: "1em", fontSize: "2rem" }}
      >
        {`Creando cuenta de ${tipo.toLowerCase()}`}
      </h1>
      <div className="sbs-component"></div>
      {/* Información del usuario */}
      <>
        <h2 className="signup-form-title">Usuario</h2>
        <form action="" className="signup-form-user-container">
          <fieldset>
            <Text
              label="Correo electrónico"
              id="txtUsuario"
              name="txtUsuario"
              anchoCompleto={true}
              placeholder="Ingresa el correo de tu usuario"
              marginBottom="2rem"
              type="text"
              onChangeHandler={onChangeHandler}
              value={txtUsuario}
            />
          </fieldset>
          <fieldset>
            <Text
              label="Contraseña"
              id="txtContra"
              name="txtContra"
              anchoCompleto={true}
              placeholder="Ingresa la contraseña de tu usuario"
              marginBottom="1rem"
              type="password"
              onChangeHandler={onChangeHandler}
              value={txtContra}
            />
          </fieldset>
        </form>
      </>
      {/* Información del usuario */}
      {/* Información Personal del Usuario (Docente y Estudiante) */}
      <h2 id="signup-ft-personal" className="signup-form-title">
        Tus datos
      </h2>
      <form action="" className="signup-form signup-form-informacionpersonal">
        <fieldset>
          <Text
            label="Número de identidad"
            placeholder="060X-200X-00XXX"
            icon={null}
            id="txtIdentidadUsuario"
            name="txtIdentidadUsuario"
            value={txtIdentidadUsuario}
            onChangeHandler={onChangeHandler}
            marginBottom="2rem"
            anchoCompleto={true}
            type="text"
            maxLength={15}
          />
        </fieldset>
        <fieldset>
          <Text
            label="Nombres"
            placeholder="José Fulano"
            icon={null}
            id="txtNombreUsuario"
            name="txtNombreUsuario"
            value={txtNombreUsuario}
            onChangeHandler={onChangeHandler}
            marginBottom="2rem"
            anchoCompleto={true}
            type="text"
          />
        </fieldset>
        <fieldset>
          <Text
            label="Apellidos"
            placeholder="Mengano Martínez"
            icon={null}
            id="txtApellidoUsuario"
            name="txtApellidoUsuario"
            marginBottom="1em"
            value={txtApellidoUsuario}
            onChangeHandler={onChangeHandler}
            anchoCompleto={true}
            type="text"
          />
        </fieldset>
        <fieldset>
          <label htmlFor="">Fecha de nacimiento</label>
          <Date type="DAY" id="txtDiaFN" onChange={onChangeHandler} />
          <Date type="MONTH" id="txtMesFN" onChange={onChangeHandler} />
          <Date type="YEAR" id="txtYearFN" onChange={onChangeHandler} />
        </fieldset>
        <fieldset>
          <label htmlFor="txtGenero">Soy</label>
          <span>Hombre</span>
          <input
            onChange={onChangeHandler}
            type="radio"
            value="Masculino"
            name="txtGenero"
            id="txtGeneroMas"
          />
          <span>Mujer</span>
          <input
            onChange={onChangeHandler}
            type="radio"
            value="Femenino"
            name="txtGenero"
            id="txtGeneroFem"
          />
        </fieldset>
      </form>
      {/* Información Personal del Usuario (Docente y Estudiante) */}
      {/* Información de Título sí es docente */}
      {tipo === "DOCENTE" && (
        <>
          <h2 className="signup-form-title" id="signup-ft-titulos">
            Tus títulos
          </h2>
          <form action="">
            <fieldset className="signup-form-titulos-container">
              <label htmlFor="txtTipoTituloDocente">Tipo de Título</label>
              <select
                name="txtTipoTituloDocente"
                id="txtTipoTituloDocente"
                onChange={onChangeHandler}
                value={txtTipoTituloDocente}
              >
                <option value="Bachillerato">Bachillerato</option>
                <option value="Pregrado">Pregrado</option>
                <option value="Postgrado">Postgrado</option>
                <option value="Maestría">Maestría</option>
                <option value="Doctorado">Doctorado</option>
              </select>
              <Text
                label="Área de título"
                placeholder="Ing. en Ciencias de la Computación"
                id="txtTituloTitle"
                name="txtTituloTitle"
                onChangeHandler={onChangeHandler}
                value={txtTituloTitle}
              />
            </fieldset>
          </form>
        </>
      )}
      {/* Información de Título sí es docente */}
      {/* Información de encarga sí es estudiante */}
      {tipo === "ESTUDIANTE" && (
        <>
          <h2
            id="signup-ft-encargado"
            className="signup-form-title"
          >{`Encargado de${
            txtNombreUsuario ?? txtApellidoEncargado
              ? ` ${txtNombreUsuario} ${txtApellidoUsuario}`
              : `l estudiante`
          }`}</h2>
          <form action="" className="signup-form-encarga-container">
            <fieldset>
              <Text
                label="Nombre del encargado"
                placeholder="María Josefa"
                id="txtNombreEncargado"
                name="txtNombreEncargado"
                marginBottom="2rem"
                anchoCompleto={true}
                type="text"
                onChangeHandler={onChangeHandler}
                value={txtNombreEncargado}
              />
            </fieldset>
            <fieldset>
              <Text
                label="Apellido del encagado"
                placeholder="Nuñez Errata"
                id="txtApellidoEncargado"
                name="txtApellidoEncargado"
                marginBottom="2rem"
                anchoCompleto={true}
                type="text"
                onChangeHandler={onChangeHandler}
                value={txtApellidoEncargado}
              />
            </fieldset>
            <fieldset>
              <Text
                label="Correo electrónico"
                id="txtEmailEncargado"
                name="txtEmailEncargado"
                marginBottom="2rem"
                anchoCompleto={true}
                placeholder="ejemplo@gmail.com"
                type="text"
                onChangeHandler={onChangeHandler}
                value={txtEmailEncargado}
              />
            </fieldset>
          </form>
        </>
      )}
      {/* Información de encarga sí es estudiante */}
      {/* Foto de perfil */}
      <>
        <h2 className="signup-form-title" id="signup-ft-encargado">
          Información de contacto
        </h2>
        <small>Dejate conocer más. </small>
        <form action="">
          <fieldset>
            <input type="file" name="" id="" />
          </fieldset>
          <fieldset>
            <div className="select-container">
              <label htmlFor="txtSelectTipoTelefono">Este número es...</label>
              <select
                name="txtSelectTipoTelefono"
                id="txtSelectTipoTelefono"
                onChange={onChangeHandler}
              >
                <option value="Personal">Personal</option>
                <option value="Doméstico">Doméstico</option>
                <option value="Trabajo">Trabajo</option>
              </select>
            </div>
            <Text
              label="Número de teléfono"
              type="tel"
              anchoCompleto={true}
              id="txtNumeroTelefonoUsuario"
              name="txtNumeroTelefonoUsuario"
              placeholder="Ingresa tu número de teléfono"
              onChangeHandler={onChangeHandler}
            />
          </fieldset>
          <fieldset>
            <label htmlFor="txtDireccionUsuario">Dirección</label>
            <textarea
              name="txtDireccionUsuario"
              id="txtDireccionUsuario"
              cols="30"
              rows="10"
            ></textarea>
          </fieldset>
        </form>
      </>
      {/* Foto de perfil */}
      {tipo === "DOCENTE" ? (
        <Button
          type="primary"
          label="Crear cuenta"
          title="Click para crear la cuenta"
          callback={confirmarCrearCuentaDocente}
        />
      ) : (
        <Button
          type="primary"
          label="Crear cuenta"
          title="Click para crear la cuenta"
          callback={confirmarCrearCuentaEstudiante}
        />
      )}
    </article>
  );
};

export default SignUpForm;

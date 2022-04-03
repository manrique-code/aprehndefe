import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import {
  faArrowRight,
  faAt,
  faE,
  faEye,
} from "@fortawesome/free-solid-svg-icons";
// import { library } from "@fortawesome/fontawesome-svg-core";
import { publicAxios } from "../../../../lib/apiClient";

import "./LoginForm.css";
import Text from "../../inputs/text/Text";
import Button from "../../buttons/cta/Button";
import ButtonRedirecter from "../../buttons/redirecter/ButtonRedirecter";
// library.add(faArrowRight, faAt, faEye);

export const LoginForm = () => {
  const [txtCorreo, setTxtCorreo] = useState("");
  const [txtPassword, setTxtPassword] = useState("");
  const dispatch = useDispatch();
  const onChangeHandler = ({ target: { name, value } }) => {
    switch (name) {
      case "txtCorreo":
        setTxtCorreo(value);
        break;
      case "txtPassword":
        setTxtPassword(value);
        break;
      default:
        break;
    }
  };
  const confirmLogin = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    dispatch({ type: "ON_LOGIN_LOADING", payload: {} });
    try {
      const data = await publicAxios.post(
        "/api/v1/docentes/login",
        {
          email: txtCorreo,
          password: txtPassword,
        },
        {
          headers: {
            apitoken: "2a7d17a0-d53d-4987-a7dd-c07bfe3bdc98",
          },
        }
      );
      const { jwt: jwToken, user } = data?.data?.payload;
      dispatch({ type: "ON_LOGIN_SUCCESS", payload: { jwToken, user } });
    } catch (error) {
      // Error 70: No existe el correo en la base de datos, osea, no existe el usuario, las credenciales están incorrectas
      dispatch({ type: "ON_LOGIN_ERROR", payload: { errors: [70] } });
    }
  };
  const signUpRedirect = (tipo) => {
    dispatch({ type: "ON_SIGNUP_TYPE", payload: { tipo } });
  };
  return (
    <section className="login-form-container">
      <h1 className="login-form-title">Iniciá sesión</h1>
      <Text
        label="Correo Electrónico"
        placeholder="Ingrese su correo electrónico"
        id="txtCorreo"
        anchoCompleto={true}
        onChangeHandler={onChangeHandler}
        name="txtCorreo"
        value={txtCorreo}
        inputIcon={faAt}
        marginBottom="2rem"
      />
      <Text
        label="Contraseña"
        type="password"
        id="txtPassword"
        name="txtPassword"
        onChangeHandler={onChangeHandler}
        value={txtPassword}
        anchoCompleto={true}
        inputIcon={faEye}
        marginBottom="2rem"
        buttonLabel={
          <ButtonRedirecter
            to="/signup"
            callback={() => alert("Hola mundo!")}
            label="Olvidé mi contraseña"
            marginBottom="0px"
          />
        }
      />
      <Button
        label="Inciar sesión"
        icon={null}
        callback={confirmLogin}
        size="lg"
        style={{ marginBottom: "2rem" }}
      />
      <div className="separator"></div>
      <div className="login-form-signin">
        <span className="login-form-signin" style={{ marginBottom: "1rem" }}>
          ¿No tenés cuenta?
        </span>
        <ButtonRedirecter
          to="/signup"
          callback={() => signUpRedirect("DOCENTE")}
          label="Crear cuenta de docente"
          marginBottom="1rem"
        />
        <ButtonRedirecter
          to="/signup"
          label="Crear cuenta de estudiante"
          callback={() => signUpRedirect("ESTUDIANTE")}
          marginBottom="1rem"
        />
      </div>
    </section>
  );
};

export default LoginForm;

import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import "./SignUp.css";
import SignUpForm from "../../ui/forms/signUpForm/SignUpForm";
import ButtonRedirecter from "../../ui/buttons/redirecter/ButtonRedirecter";

const SignUp = () => {
  const dispatch = useDispatch();
  const formsEstudiante = [];
  const formDocente = [];
  const [currentForm, setCurrentForm] = useState(0);
  const { tipo } = useSelector((state) => state.signup);
  const signUpRedirect = (tipo) => {
    dispatch({ type: "ON_SIGNUP_TYPE", payload: { tipo } });
  };
  return (
    <div className="signup-container">
      <section>
        <h3>¿No es el tipo de cuenta que querés crear?</h3>
        {tipo === "ESTUDIANTE" ? (
          <ButtonRedirecter
            label="Soy un docente"
            to={"/signup"}
            callback={() => signUpRedirect("DOCENTE")}
          />
        ) : (
          <ButtonRedirecter
            label="Soy un estudiante"
            to={"/signup"}
            callback={() => signUpRedirect("ESTUDIANTE")}
          />
        )}
      </section>
      <section className="signup-form-high-order">
        <SignUpForm tipo={tipo} />
      </section>
      <section className="signup-form-navigator-container">
        <article className="signup-form-navigator-items-container"></article>
        <article className="signup-form-navigator-buttons-container">
          <a href={`#`}>Atrás</a>
          <a href={`#signup-ft-encargado`}>Siguiente</a>
        </article>
      </section>
    </div>
  );
};

export default SignUp;

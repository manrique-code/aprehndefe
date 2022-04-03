import { useState, useEffect } from "react";
import PropTypes from "prop-types";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./Text.css";

const Text = ({
  errorMessage,
  id,
  placeholder,
  label,
  name,
  maxLength,
  onChangeHandler,
  value,
  error,
  inputIcon,
  errorMessageIcon,
  buttonLabel,
  marginBottom,
  anchoCompleto = false,
  obligatorio = false,
  type = "text",
}) => {
  const hasInputIcon = inputIcon && true;
  const hasErroIcon = errorMessageIcon && true;
  const [estaInputActivo, setEstaInputActivo] = useState(false);
  const [claseInputActivo, setClaseInputActivo] = useState("");
  useEffect(() => {
    estaInputActivo
      ? setClaseInputActivo("focus-input")
      : setClaseInputActivo("");
  }, [estaInputActivo]);
  return (
    <fieldset
      className={`text-input-component-container ${
        anchoCompleto ? "ancho-completo" : ""
      }`}
      style={{ marginBottom }}
    >
      <div className="lbl-input">
        <label htmlFor={id}>
          {label}
          {obligatorio && (
            <sup style={{ color: "red", fontSize: "0.5em" }}>Opcional</sup>
          )}
        </label>
        {buttonLabel}
      </div>
      <div className={`text-input-component`}>
        <div className={`input-container ${claseInputActivo}`}>
          <input
            onChange={onChangeHandler}
            className={`input`}
            value={value}
            id={id}
            placeholder={placeholder}
            maxLength={maxLength}
            name={name}
            type={type}
            onFocus={() => setEstaInputActivo(true)}
            onBlur={() => setEstaInputActivo(false)}
          />
          {/* <FontAwesomeIcon
            className={`input-icon`}
            style={{ color: estaInputActivo ? "#0071e3" : "black" }}
            icon={hasInputIcon && inputIcon}
          /> */}
        </div>
        {error && (
          <div className="input-error-message">
            <span className="message-error">{errorMessage}</span>
            {/* <FontAwesomeIcon icon={hasErroIcon && errorMessageIcon} /> */}
          </div>
        )}
      </div>
    </fieldset>
  );
};

Text.propTypes = {
  anchoCompleto: PropTypes.bool,
  errorMessage: PropTypes.string,
  errorMessageIcon: PropTypes.object,
  id: PropTypes.string,
  placeholder: PropTypes.string,
  label: PropTypes.string,
  name: PropTypes.string,
  maxLength: PropTypes.number,
  icon: PropTypes.object,
  obligatorio: PropTypes.bool,
  type: PropTypes.string,
};

export default Text;

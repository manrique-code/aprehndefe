import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";

import "./InputAction.css";

const InputAction = ({
  id,
  buttonLabel,
  placeHolder,
  size,
  label,
  titleLabel,
  onclick,
  onChange,
  onKeyUp,
  onKeyPress,
  value,
  styles,
}) => {
  const [estaInputActivo, setEstaInputActivo] = useState(false);
  const [claseInputActivo, setClaseInputActivo] = useState("");
  useEffect(() => {
    estaInputActivo
      ? setClaseInputActivo("focus-input")
      : setClaseInputActivo("");
  }, [estaInputActivo]);
  return (
    <div className="input-action-container">
      <label htmlFor="txtInputActionInput" className="input-action-label">
        {label}
      </label>
      <fieldset
        className={`input-action-form-container ${size} ${claseInputActivo}`}
      >
        <input
          type="text"
          className={`input-action-input`}
          placeholder={placeHolder}
          value={value}
          style={styles}
          onKeyUp={onKeyUp}
          onKeyDown={onKeyPress}
          onChange={onChange}
          name={id}
          id={id}
          onFocus={() => setEstaInputActivo(true)}
          onBlur={() => setEstaInputActivo(false)}
        />
        <button
          className="input-action-button"
          title={titleLabel}
          onClick={onclick}
        >
          {buttonLabel}
        </button>
      </fieldset>
    </div>
  );
};

InputAction.propTypes = {
  buttonLabel: PropTypes.string,
  placeHolder: PropTypes.string,
  size: PropTypes.oneOf(["sm", "md", "lg"]),
  label: PropTypes.string,
  titleLabel: PropTypes.string,
  styles: PropTypes.object,
};

export default InputAction;

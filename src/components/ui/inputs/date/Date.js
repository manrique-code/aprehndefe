import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { getYear, parse } from "date-fns";
import "./Date.css";

const MonthDate = () => {
  const months = [
    "Enero",
    "Febrero",
    "Marzo",
    "Abril",
    "Mayo",
    "Junio",
    "Julio",
    "Agosto",
    "Septiembre",
    "Octubre",
    "Noviembre",
    "Diciembre",
  ];
  return months.map((month, i) => (
    <option className="option-item" value={i + 1} key={i}>
      {month}
    </option>
  ));
};

const YearDate = () => {
  let years = [];
  //   Intentando obtener el año dinámicamente pero tenía un error que no pude solucionar (no había tiempo)
  for (let index = 2022; index > 1900; index -= 1) {
    years.push(index);
  }
  return years.map((year, i) => (
    <option className="option-item" value={year} key={i}>
      {year}
    </option>
  ));
};

const DayDate = () => {
  let days = [];
  for (let index = 0; index < 31; index++) {
    days.push(index);
  }
  return days.map((day, i) => (
    <option className="option-item" value={i + 1} key={i}>
      {day + 1}
    </option>
  ));
};

const DateInput = ({
  id,
  options,
  label,
  size,
  onChangeHandler,
  props = {},
}) => {
  const [estaActivo, setEstaActivo] = useState(false);
  const [claseActivo, setClaseActivo] = useState("");
  useEffect(() => {
    estaActivo ? setClaseActivo("activo") : setClaseActivo("");
  }, [estaActivo]);
  return (
    <div className={`date-input-container ${size}`}>
      <label htmlFor={id} className="lbl-date-input">
        {label}
      </label>
      <select
        name={id}
        id={id}
        onChange={onChangeHandler}
        className={`date-input ${claseActivo}`}
        {...props}
        onFocus={() => setEstaActivo(true)}
        onBlur={() => setEstaActivo(false)}
      >
        <option>{label}</option>
        {options}
      </select>
    </div>
  );
};

const Date = ({ type, id, size = "md", onChange, props = {} }) => {
  switch (type) {
    case "MONTH":
      return (
        <DateInput
          size={size}
          options={<MonthDate />}
          id={id}
          label="Mes"
          onChangeHandler={onChange}
          {...props}
        />
      );
    case "YEAR":
      return (
        <DateInput
          size={size}
          onChangeHandler={onChange}
          options={<YearDate />}
          id={id}
          label="Año"
          {...props}
        />
      );
    case "DAY":
      return (
        <DateInput
          onChangeHandler={onChange}
          size={size}
          options={<DayDate />}
          id={id}
          label="Día"
          {...props}
        />
      );
    default:
      break;
  }
};

Date.propTypes = {
  type: PropTypes.oneOf(["MONTH", "YEAR", "DAY"]),
  size: PropTypes.oneOf(["sm", "md", "lg"]),
};

export default Date;

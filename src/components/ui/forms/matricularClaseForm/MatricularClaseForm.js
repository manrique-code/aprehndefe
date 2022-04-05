import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import "./MatricularClaseForm.css";
import { publicAxios } from "../../../../lib/apiClient";
import InputAction from "../../inputs/inputAction/InputAction";

const MatricularClaseForm = () => {
  const TIME_OUT = 1500;
  const [codigoClase, setCodigoClase] = useState("");
  let timer = null;

  const callEndpoint = async (codigo) => {
    const encodedCodigo = codigo.replace("#", "%23");
    console.log(encodedCodigo);
    const headerAPI = {
      headers: {
        apitoken: "2a7d17a0-d53d-4987-a7dd-c07bfe3bdc98",
      },
    };
    try {
      const clase = await publicAxios.get(
        `/api/v1/clases/obtener/${encodedCodigo}`,
        headerAPI
      );
      console.info("Clase encontrada: ", clase?.data);
      return clase?.data;
    } catch (error) {
      console.error("Error al buscar la clase: ", error);
      return false;
    }
  };

  const buscarClase = async (codigo) => {
    const search = /#\d{4}/g;
    codigo.match(search) && (await buscarClase(codigo));
  };

  useEffect(() => {}, [codigoClase]);

  const onChangeHandler = async ({ target: { value } }) => {
    setCodigoClase(value);
    buscarClase(value);
  };

  const pegarCodigo = async () => {
    const pasteData = await navigator.clipboard.readText();
    setCodigoClase(pasteData);
  };

  return (
    <section className="matricular-clase-form-container">
      <article className="matricular-clase-form-seach">
        <InputAction
          id="txtCodigoClase"
          label="Ingresá el código de tu clase a matricular"
          buttonLabel="Pegar código"
          placeHolder="STS1801#5977"
          onclick={pegarCodigo}
          value={codigoClase}
          onChange={onChangeHandler}
        />
      </article>
      <article className="matricular-clase-form-result"></article>
    </section>
  );
};

export default MatricularClaseForm;

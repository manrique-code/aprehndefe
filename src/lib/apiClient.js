import axios from "axios";

//AQUI CREAMOS 2 INSTANCIAS, UNA PARA PETICIONES PUBLICAS Y UNA PARA PETICIONES PRIVADAS
export const publicAxios = axios.create();
export const privateAxios = axios.create();

//DEFINIMOS LA EL VALOR DEL APITOKEN EN AXIOS, DE IGUAL FORMA PARA PUBLICAS Y PRIVADAS,
//EXISTE UNA CONDICION QUE DICE QUE CADA VARIABLE DE ENTORNO EN .env DEBE INICIAR EN MAYUSCULAS
//COM "REACT_<NOMBRE_VARIABLE_ENTORNO>"
publicAxios.defaults.headers.common["apitoken"] =
  process.env.REACT_APP_APITOKEN;
privateAxios.defaults.headers.common["apitoken"] =
  process.env.REACT_APP_APITOKEN;

//CREAMOS LA VARIABLE DE ENTORNO CON y se la pasamos a axios baseURL
publicAxios.defaults.baseURL = process.env.REACT_APP_APIURL;
privateAxios.defaults.baseURL = process.env.REACT_APP_APIURL;

//QUITAR EL CACHE PARA QUE NO INTERFIERA
publicAxios.defaults.headers.common["cache-contro"] = "no-cache";
privateAxios.defaults.headers.common["cache-contro"] = "no-cache";

publicAxios.defaults.headers.common["Content-Type"] = "application/json";
privateAxios.defaults.headers.common["Content-Type"] = "application/json";

export const setJWT = (jwt) => {
  privateAxios.defaults.headers.common["Authorization"] = `Bearer ${jwt}`;
};

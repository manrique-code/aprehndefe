import { Provider } from "react-redux";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import "./App.css";
import "./assets/css/fonts.css";

import store from "./store/index";

import Entregar from "./components/screens/Tareas/EntregarTareas/EntregarTareas.js";
import Login from "./components/screens/LoginSignIn/LoginSignIn";
import Evaluar from "./components/screens/Tareas/EvaluarTareas/EvaluarTareas";
import SignUp from "./components/screens/SignUp/SignUp";
import SignupSuccess from "./components/screens/States/SignupSuccess/SignupSuccess";
import ActiviadesClase from "./components/screens/clasesActividades/actividades";
import Clases from "./components/screens/Clases/Clases";
import MatricularClase from "./components/screens/MatricularClase/MatricularClase";

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />}></Route>
          <Route path="/signup/success" element={<SignupSuccess />} />
          <Route
            path="/tareas/entregar/:numTarea/:idClase/:idEstudiante"
            element={<Entregar />}
          />
          <Route path="/tareas/evaluar" element={<Evaluar />} />
          <Route
            path="/clases/actividades/:idClase/:idEstudiante"
            element={<ActiviadesClase />}
          />
          <Route path="/clases" element={<Clases />} />
          <Route path="/tareas/entregar" element={<Entregar />} />
          <Route path="/matricular" element={<MatricularClase />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;

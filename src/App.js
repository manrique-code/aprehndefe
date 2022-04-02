import { Provider } from "react-redux";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import "./App.css";
import Entregar from "./components/screens/Tareas/EntregarTareas/EntregarTareas.js";
import "./assets/css/fonts.css";

import store from "./store/index";
import Login from "./components/screens/LoginSignIn/LoginSignIn";

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;

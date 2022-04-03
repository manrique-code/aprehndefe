import { NavLink } from "react-router-dom";

import "./ButtonRedirecter.css";

const ButtonRedirecter = ({ callback, label, to, marginBottom }) => {
  return (
    <NavLink
      className="button-redirecter"
      to={to}
      onClick={callback}
      style={{ marginBottom }}
    >
      {label}
    </NavLink>
  );
};

export default ButtonRedirecter;

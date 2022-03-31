import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./Button.css";

const Button = ({ label, icon, title, size = "md", type = "primary" }) => {
  return (
    <button className={`button ${type} ${size}`} title={title}>
      <span className="button-title">{label}</span>
      <FontAwesomeIcon
        className="button-icon"
        icon={icon}
        style={{ marginLeft: "0.5em" }}
      />
    </button>
  );
};

Button.propTypes = {
  label: PropTypes.string,
  icon: PropTypes.object,
  type: PropTypes.oneOf(["primary", "secondary", "terciary"]),
  size: PropTypes.oneOf(["sm", "md", "lg"]),
};

export default Button;

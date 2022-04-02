import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./Button.css";

const Button = ({
  callback,
  label,
  icon,
  title,
  style,
  size = "md",
  type = "primary",
}) => {
  const hasIcon = icon && true;
  return (
    <a
      onClick={callback}
      className={`button ${type} ${size}`}
      title={title}
      style={style}
      href="#"
    >
      <span className="button-title">{label}</span>
      <FontAwesomeIcon
        className="button-icon"
        icon={hasIcon && icon}
        style={{ marginLeft: "0.5em" }}
      />
    </a>
  );
};

Button.propTypes = {
  callback: PropTypes.func,
  label: PropTypes.string,
  icon: PropTypes.object,
  size: PropTypes.oneOf(["sm", "md", "lg"]),
  title: PropTypes.string,
  type: PropTypes.oneOf(["primary", "secondary", "terciary"]),
};

export default Button;

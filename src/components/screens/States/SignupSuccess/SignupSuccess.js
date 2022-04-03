import "./SignupSuccess.css";
import imgSuccess from "../../../../assets/img/states/Success.png";
const SignupSuccess = () => {
  return (
    <section className="signup-success-container">
      <div className="signup-success-img-container">
        <img
          src={imgSuccess}
          alt="Cuenta creada correctamente"
          className="signup-success-img"
        />
      </div>
      <h2>¡Que lindo!</h2>
      <span>
        Acabás de crear tu cuenta en Aprehnde. ¡Nunca parés de aprender!
      </span>
    </section>
  );
};

export default SignupSuccess;

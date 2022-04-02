import React from "react";
import "./LoginSignIn.css";
import HeroImage from "../../../assets/img/loginSignin/hero.jpeg";
import LoginForm from "../../ui/forms/loginForm/LoginForm";
const Login = ({ leftScreen, rightScreen }) => {
  const hasLeftScreen = leftScreen && true;
  const hasRightScreen = rightScreen && true;
  return (
    <div className="loginsignin-screens-container">
      <section className="loginsignin-form">
        <LoginForm />
      </section>
      <section className="loginsigin-hero-image"></section>
    </div>
  );
};

export default Login;

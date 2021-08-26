import React from "react";
import { Link } from "react-router-dom";
import LoginPage from "./LoginPage.js";

function Register(props) {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  function handleChangeEmail(e) {
    setEmail(e.target.value);
  }

  function handleChangePassword(e) {
    setPassword(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    props.onRegister(email, password);
  }
  return (
    <LoginPage
      name="register"
      title="Регистрация"
      buttonText="Зарегистрироваться"
      headerLink="Войти"
      link="sign-in"
      userEmail=""
      onSubmit={handleSubmit}
      onRegister={props.onRegister}
      onChangeEmail={handleChangeEmail}
      onChangePassword={handleChangePassword}
      email={email}
      password={password}
    >
      <Link to="sign-in" className="popup__link">
        Уже зарегистрированы? Войти
      </Link>
    </LoginPage>
  );
}

export default Register;

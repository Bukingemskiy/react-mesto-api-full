import React from "react";
import LoginPage from "./LoginPage.js";

function Login(props) {
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
    props.onLogin(email, password);
  }
  return (
    <LoginPage
      name="login"
      title="Вход"
      buttonText="Войти"
      headerLink="Регистрация"
      link="sign-up"
      userEmail=""
      onSubmit={handleSubmit}
      onLogin={props.onLogin}
      onChangeEmail={handleChangeEmail}
      onChangePassword={handleChangePassword}
      email={email}
      password={password}
    ></LoginPage>
  );
}
export default Login;

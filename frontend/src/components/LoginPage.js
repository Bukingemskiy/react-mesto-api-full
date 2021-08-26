import React from "react";
import Header from "./Header.js";

function LoginPage(props) {
  return (
    <>
      <Header
        userEmail={props.userEmail}
        link={props.link}
        headerLink={props.headerLink}
      />
      <div style={{ display: "flex" }}>
        <div style={{ backgroundColor: "black" }} className="popup__content">
          <h2
            style={{
              color: "white",
              textAlign: "center",
              margin: "60px 0 50px",
            }}
            className="popup__title"
          >
            {props.title}
          </h2>
          <form
            className={`popup__edit`}
            name={props.name}
            onSubmit={props.onSubmit}
          >
            <section className="popup__section">
              <input
                style={{
                  backgroundColor: "black",
                  color: "#CCCCCC",
                  borderBottom: "2px solid #CCCCCC",
                }}
                className="popup__input"
                placeholder="Email"
                type="email"
                name="email"
                id="email"
                minLength="2"
                maxLength="30"
                value={props.email}
                onChange={props.onChangeEmail}
                required
              />
              <span
                className="popup__input-error"
                id="popup_title-error"
              ></span>
            </section>
            <section className="popup__section">
              <input
                style={{
                  backgroundColor: "black",
                  color: "#CCCCCC",
                  borderBottom: "2px solid #CCCCCC",
                  margin: "0 0 216px",
                }}
                className="popup__input"
                placeholder="Пароль"
                type="password"
                name="password"
                id="password"
                value={props.password}
                onChange={props.onChangePassword}
                required
              />
              <span className="popup__input-error" id="popup_link-error"></span>
            </section>
            <button
              style={{
                backgroundColor: "white",
                color: "black",
                marginBottom: "15px",
              }}
              className="popup__save-button"
              type="submit"
            >
              {props.buttonText}
            </button>
            {props.children}
          </form>
        </div>
      </div>
    </>
  );
}

export default LoginPage;

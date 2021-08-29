import React from "react";
import { Link } from "react-router-dom";

function Header(props) {
  const [visible, setVisible] = React.useState("none");
  const [optionsIcon, setOptionsIcon] = React.useState("header__options");

  function handleVisible() {
    if (visible === "none") {
      setVisible("flex");
      setOptionsIcon("header__close");
    } else {
      setVisible("none");
      setOptionsIcon("header__options");
    }
  }

  if (window.innerWidth < 768) {
    return (
      <>
        <div
          style={{
            display: visible,
            flexDirection: "column",
            borderBottom: "1px solid rgba(84, 84, 84, 0.7)",
          }}
        >
          <div
            style={{
              margin: "40px auto 0",
              textAlign: "center",
            }}
            className="header__email"
          >
            {props.userEmail}
          </div>
          <Link
            style={{
              textAlign: "center",
              margin: "18px auto 40px",
            }}
            to={props.link}
            onClick={props.onExitClick}
            className="header__link"
          >
            {props.headerLink}
          </Link>
        </div>
        <header className="header">
          <div className="header__container">
            <div className="header__logo"></div>
            <div onClick={handleVisible} className={optionsIcon}></div>
          </div>
        </header>
      </>
    );
  } else {
    return (
      <header className="header">
        <div className="header__logo"></div>
        <div
          style={{
            display: "flex",
          }}
        >
          <div className="header__email">{props.userEmail}</div>
          {props.loggedIn ? (
            <Link to="/" className="header__link" onClick={props.onSignOut}>
              Выйти
            </Link>
          ) : (
            <Link
              to={props.link}
              onClick={props.onExitClick}
              className="header__link"
            >
              {props.headerLink}
            </Link>
          )}
        </div>
      </header>
    );
  }
}
export default Header;

import React from "react";
import registerOn from "../images/RegisterOn.png";
import registerOff from "../images/RegisterOff.png";

function InfoTooltip(props) {
  return (
    <div className={`popup ${props.isOpen ? "popup_visible" : ""}`}>
      <div className="popup__content">
        <button
          className="popup__close-button"
          type="button"
          aria-label="Закрыть"
          onClick={props.onClose}
        ></button>
        <img
          src={`${props.isRegister ? registerOn : registerOff}`}
          alt={`${props.isRegister ? "Успешная регистрация" : "Ошибка"}`}
          className="popup__register-image"
        ></img>
        <h2 className="popup__register-title">{`${
          props.isRegister
            ? "Вы успешно зарегистрировались!"
            : "Что-то пошло не так! Попробуйте ещё раз."
        }`}</h2>
      </div>
    </div>
  );
}
export default InfoTooltip;

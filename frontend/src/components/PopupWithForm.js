import React from "react";

function PopupWithForm(props) {
  return (
    <div
      className={`popup popup_type_${props.name} ${
        props.isOpen ? "popup_visible" : ""
      }`}
    >
      <div className="popup__content">
        <button
          className="popup__close-button"
          type="button"
          aria-label="Закрыть"
          onClick={props.onClose}
        ></button>
        <h2 className="popup__title">{props.title}</h2>
        <form
          className={`popup__edit`}
          name={props.name}
          onSubmit={props.onSubmit}
        >
          {props.children}
          <button className="popup__save-button" type="submit">
            {props.isLoading ? "Сохранение..." : props.buttonText}
          </button>
        </form>
      </div>
    </div>
  );
}

export default PopupWithForm;

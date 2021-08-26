import React from "react";

function ImagePopup(props) {
  return (
    <div
      className={`popup popup_opacity ${
        props.card.link !== "" ? "popup_visible" : ""
      }`}
    >
      <div className="popup__image-content">
        <button
          className="popup__close-button"
          type="button"
          aria-label="Закрыть"
          onClick={props.onClose}
        ></button>
        <figure className="popup__figure">
          <img
            className="popup__image"
            src={props.card.link}
            alt={props.card.name}
          />
          <figcaption className="popup__image-caption">
            {props.card.name}
          </figcaption>
        </figure>
      </div>
    </div>
  );
}

export default ImagePopup;

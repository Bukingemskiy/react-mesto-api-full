import React from "react";
import PopupWithForm from "./PopupWithForm";

function AddPlacePopup(props) {
  const [place, setPlace] = React.useState("");
  const [link, setLink] = React.useState("");

  function handleChangePlace(e) {
    setPlace(e.target.value);
  }

  function handleChangeLink(e) {
    setLink(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    props.onAddPlace({
      name: place,
      link: link,
    });
    setPlace("");
    setLink("");
  }

  return (
    <PopupWithForm
      name="add-card"
      title="Новое место"
      buttonText="Создать"
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
      isLoading={props.isLoading}
    >
      <section className="popup__section">
        <input
          className="popup__input"
          placeholder="Название"
          type="text"
          name="title"
          id="popup_title"
          minLength="2"
          maxLength="30"
          value={place || ""}
          onChange={handleChangePlace}
          required
        />
        <span className="popup__input-error" id="popup_title-error"></span>
      </section>
      <section className="popup__section">
        <input
          className="popup__input"
          placeholder="Ссылка на картинку"
          type="url"
          name="link"
          id="popup_link"
          value={link || ""}
          onChange={handleChangeLink}
          required
        />
        <span className="popup__input-error" id="popup_link-error"></span>
      </section>
    </PopupWithForm>
  );
}
export default AddPlacePopup;

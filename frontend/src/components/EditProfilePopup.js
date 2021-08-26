import React from "react";
import PopupWithForm from "./PopupWithForm";
import { CurrentUserContext } from "../contexts/CurrentUserContext.js";

function EditProfilePopup(props) {
  const currentUser = React.useContext(CurrentUserContext);
  const [name, setName] = React.useState("");
  const [description, setDescription] = React.useState("");

  React.useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser, props.isOpen]);

  function handleChangeName(e) {
    setName(e.target.value);
  }

  function handleChangeDescription(e) {
    setDescription(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    props.onUpdateUser({
      name: name,
      about: description,
    });
  }

  return (
    <PopupWithForm
      name="edit-profile"
      title="Редактировать профиль"
      buttonText="Сохранить"
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
      isLoading={props.isLoading}
    >
      <section className="popup__section">
        <input
          className="popup__input"
          placeholder="Имя"
          type="text"
          name="name"
          minLength="2"
          maxLength="40"
          id="popup_name"
          value={name || ""}
          onChange={handleChangeName}
          required
        />
        <span className="popup__input-error" id="popup_name-error"></span>
      </section>
      <section className="popup__section">
        <input
          className="popup__input"
          placeholder="О себе"
          type="text"
          name="info"
          minLength="2"
          maxLength="200"
          id="popup_text"
          value={description || ""}
          onChange={handleChangeDescription}
          required
        />
        <span className="popup__input-error" id="popup_text-error"></span>
      </section>
    </PopupWithForm>
  );
}
export default EditProfilePopup;

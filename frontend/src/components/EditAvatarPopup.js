import React from "react";
import PopupWithForm from "./PopupWithForm";

function EditAvatarPopup(props) {
  const imageRef = React.useRef("");

  function handleSubmit(e) {
    e.preventDefault();
    props.onUpdateAvatar({
      avatar: imageRef.current.value,
    });
    e.target.reset();
  }

  return (
    <PopupWithForm
      name="update-avatar"
      title="Обновить аватар"
      buttonText="Сохранить"
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
      isLoading={props.isLoading}
    >
      <section className="popup__section">
        <input
          className="popup__input"
          placeholder="Ссылка на новый аватар"
          type="url"
          name="avatar"
          id="popup_avatar"
          ref={imageRef}
          required
        />
        <span className="popup__input-error" id="popup_avatar-error"></span>
      </section>
    </PopupWithForm>
  );
}
export default EditAvatarPopup;

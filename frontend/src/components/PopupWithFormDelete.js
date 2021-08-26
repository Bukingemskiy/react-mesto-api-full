import React from "react";
import PopupWithForm from "./PopupWithForm";

function PopupWithFormDelete() {
  return (
    <PopupWithForm
      name="delete-card"
      title="Вы уверены?"
      buttonText="Да"
    ></PopupWithForm>
  );
}
export default PopupWithFormDelete;

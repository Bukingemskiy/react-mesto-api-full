import React from "react";
import Card from "./Card.js";
import Header from "./Header.js";
import Footer from "./Footer.js";
import { CurrentUserContext } from "../contexts/CurrentUserContext.js";

function Main(props) {
  const currentUser = React.useContext(CurrentUserContext);

  return (
    <>
      <Header
        loggedIn={props.loggedIn}
        userEmail={props.userEmail}
        onExitClick={props.logOut}
        link="/user/signout"
        headerLink="Выйти"
      />
      <main className="content">
        <section className="profile">
          <div className="profile__info">
            <div className="profile__image" onClick={props.onEditAvatar}>
              <img
                className="profile__avatar"
                src={currentUser.avatar}
                alt="аватар профиля"
              />
              <div className="profile__overlay"></div>
            </div>
            <div className="profile__text">
              <div className="profile__name">
                <h1 className="profile__title">{currentUser.name}</h1>
                <button
                  className="profile__edit-button"
                  onClick={props.onEditProfile}
                  type="button"
                  aria-label="Редактировать"
                ></button>
              </div>
              <p className="profile__subtitle">{currentUser.about}</p>
            </div>
          </div>
          <button
            className="profile__add-button"
            onClick={props.onAddPlace}
            type="button"
            aria-label="Добавить"
          ></button>
        </section>
        <section className="elements">
          {props.isCardsLoading && <p className="profile">LOADING...</p>}
          {props.cards.map((card) => (
            <Card
              card={card}
              key={card._id}
              onCardClick={props.onCardClick}
              onCardLike={props.onCardLike}
              onCardDelete={props.onCardDelete}
            />
          ))}
        </section>
      </main>
      <Footer />
    </>
  );
}
export default Main;

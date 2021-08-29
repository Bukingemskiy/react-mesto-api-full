import React from "react";
import { Route, useHistory, Redirect, Switch } from "react-router-dom";
import Main from "./Main.js";
import AddPlacePopup from "./AddPlacePopup.js";
import EditProfilePopup from "./EditProfilePopup.js";
import EditAvatarPopup from "./EditAvatarPopup.js";
import PopupWithFormDelete from "./PopupWithFormDelete.js";
import ImagePopup from "./ImagePopup.js";
import Login from "./Login.js";
import Register from "./Register.js";
import InfoTooltip from "./InfoTooltip.js";
import ProtectedRoute from "./ProtectedRoute.js";
import api from "../utils/api.js";
import { CurrentUserContext } from "../contexts/CurrentUserContext.js";
import * as auth from "../utils/auth.js";

function App() {
  const [currentUser, setCurrentUser] = React.useState({});
  const [cards, setCards] = React.useState([]);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] =
    React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] =
    React.useState(false);
  const [isAddCardPopupOpen, setIsAddCardPopupOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState({
    name: "",
    link: "",
  });
  const [isLoading, setIsLoading] = React.useState(false);
  const [isCardsLoading, setIsCardsLoading] = React.useState(false);
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [isInfoTooltip, setIsInfoTooltip] = React.useState(false);
  const [userEmail, setUserEmail] = React.useState("");
  const [isRegister, setIsRegister] = React.useState(false);
  const history = useHistory();

  React.useEffect(() => {
    checkToken();
  }, [loggedIn]);

  React.useEffect(() => {
    if (loggedIn) {
      history.push("/");
    }
  });

  React.useEffect(() => {
    setIsCardsLoading(true);
    Promise.all([api.getUserData(), api.getCards()])
      .then(([userInfo, userCards]) => {
        setCurrentUser(userInfo.data);
        setCards(userCards.data);
      })
      .catch((err) => console.log(`${err}`))
      .finally(() => setIsCardsLoading(false));
  }, []);

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function handleAddPlaceClick() {
    setIsAddCardPopupOpen(true);
  }

  function handleCardClick(card) {
    setSelectedCard(card);
  }

  function closeAllPopups() {
    setIsEditProfilePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsAddCardPopupOpen(false);
    setSelectedCard({ name: "", link: "" });
    setIsInfoTooltip(false);
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some((i) => i._id === currentUser._id);
    console.log(isLiked);
    console.log(card._id);
    console.log(card.likes);
    console.log(currentUser);
    api
      .changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        console.log(newCard);
        console.log(cards);
        setCards((cards) =>
          cards.map((c) => (c._id === card._id ? newCard : c))
        );
        console.log(cards);
        console.log(card._id);
      })
      .catch((err) => console.log(`${err}`));
  }

  function handleCardDelete(card) {
    api
      .deleteCard(card._id)
      .then(() => {
        console.log(card._id);
        const newCards = cards.filter((c) => c !== card);
        console.log(newCards);
        console.log(card);
        console.log(cards);
        setCards(newCards);
      })
      .catch((err) => console.log(`${err}`));
  }

  function handleUpdateUser(data) {
    setIsLoading(true);
    api
      .editProfile(data)
      .then((user) => {
        console.log(user);
        console.log(data);
        setCurrentUser(user.data);
        closeAllPopups();
      })
      .catch((err) => console.log(`${err}`))
      .finally(() => setIsLoading(false));
  }

  function handleUpdateAvatar(data) {
    setIsLoading(true);
    api
      .updateImage(data)
      .then((avatar) => {
        console.log(data);
        console.log(avatar);
        setCurrentUser(avatar.data);
        closeAllPopups();
      })
      .catch((err) => console.log(`${err}`))
      .finally(() => setIsLoading(false));
  }

  function handleAddPlaceSubmit(data) {
    setIsLoading(true);
    api
      .makeCard(data)
      .then((newCard) => {
        console.log(data);
        console.log(newCard);
        console.log(cards);
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch((err) => console.log(`${err}`))
      .finally(() => setIsLoading(false));
  }

  function handleRegister(email, password) {
    return auth
      .signUp(email, password)
      .then((res) => {
        if (res) {
          localStorage.setItem("token", res.token);
          history.push("/sign-in");
          setIsInfoTooltip(true);
          setIsRegister(true);
        } else {
          console.log("Что-то пошло не так!");
        }
      })
      .catch((err) => {
        setIsInfoTooltip(true);
        setIsRegister(false);
        console.log(`${err}`);
      });
  }

  function handleLogin(email, password) {
    return auth
      .signIn(email, password)
      .then((data) => {
        localStorage.setItem("token", data.token);
        setLoggedIn(true);
        history.push("/");
      })
      .catch((err) => {
        setIsInfoTooltip(true);
        setIsRegister(false);
        console.log(`${err}`);
      });
  }

  function checkToken() {
    const token = localStorage.getItem("token");
    if (token) {
      auth
        .userToken(token)
        .then((res) => {
          setUserEmail(res.data.email);
          setLoggedIn(true);
        })
        .catch((err) => {
          console.log(`${err}`);
        });
    } else {
      console.log("Токен отсутствует!");
      return;
    }
  }

  function logOut() {
    auth
      .signOut()
      .then(() => {
        localStorage.removeItem("token");
        setUserEmail("");
        setLoggedIn(false);
      })
      .catch((err) => {
        console.log(`${err}`);
      });
  }

  return (
    <div className="page">
      <CurrentUserContext.Provider value={currentUser}>
        <Switch>
          <ProtectedRoute
            exact
            path="/"
            loggedIn={loggedIn}
            userEmail={userEmail}
            onExitClick={logOut}
            link="sign-up"
            headerLink="Выйти"
            onEditAvatar={handleEditAvatarClick}
            onEditProfile={handleEditProfileClick}
            onAddPlace={handleAddPlaceClick}
            onCardClick={handleCardClick}
            onCardLike={handleCardLike}
            onCardDelete={handleCardDelete}
            isCardsLoading={isCardsLoading}
            cards={cards}
            component={Main}
          />
          <Route path="/sign-up">
            <Register onRegister={handleRegister} />
          </Route>
          <Route path="/sign-in">
            <Login onLogin={handleLogin} />
          </Route>
          <Route>
            {loggedIn ? <Redirect to="/" /> : <Redirect to="/sign-in" />}
          </Route>
        </Switch>
        <AddPlacePopup
          isOpen={isAddCardPopupOpen}
          onClose={closeAllPopups}
          onAddPlace={handleAddPlaceSubmit}
          isLoading={isLoading}
        />
        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
          isLoading={isLoading}
        />
        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
          isLoading={isLoading}
        />
        <PopupWithFormDelete />
        <ImagePopup card={selectedCard} onClose={closeAllPopups} />
        <InfoTooltip
          isOpen={isInfoTooltip}
          isRegister={isRegister}
          onClose={closeAllPopups}
        />
      </CurrentUserContext.Provider>
    </div>
  );
}

export default App;

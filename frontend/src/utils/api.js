class Api {
  constructor({ address, token }) {
    this._address = address;
    this._token = token;
  }

  _getAnswer(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  }

  getUserData() {
    return fetch(`${this._address}/users/me `, {
      credentials: "include",
      headers: {
        authorization: this._token,
      },
    }).then((res) => this._getAnswer(res));
  }

  editProfile(data) {
    return fetch(`${this._address}/users/me `, {
      credentials: "include",
      method: "PATCH",
      headers: {
        authorization: this._token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name: data.name, about: data.about }),
    }).then((res) => this._getAnswer(res));
  }

  updateImage(data) {
    return fetch(`${this._address}/users/me/avatar `, {
      credentials: "include",
      method: "PATCH",
      headers: {
        authorization: this._token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ avatar: data.avatar }),
    }).then((res) => this._getAnswer(res));
  }

  makeCard(data) {
    return fetch(`${this._address}/cards`, {
      credentials: "include",
      method: "POST",
      headers: {
        Authorization: this._token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name: data.name, link: data.link }),
    }).then((res) => this._getAnswer(res));
  }

  getCards() {
    return fetch(`${this._address}/cards`, {
      credentials: "include",
      headers: {
        Authorization: this._token,
      },
    }).then((res) => this._getAnswer(res));
  }

  deleteCard(id) {
    return fetch(`${this._address}/cards/${id}`, {
      credentials: "include",
      method: "DELETE",
      headers: {
        Authorization: this._token,
      },
    }).then((res) => this._getAnswer(res));
  }

  likeOn(id) {
    return fetch(`${this._address}/cards/likes/${id}`, {
      credentials: "include",
      method: "PUT",
      headers: {
        Authorization: this._token,
      },
    }).then((res) => this._getAnswer(res));
  }

  likeOff(id) {
    return fetch(`${this._address}/cards/likes/${id}`, {
      credentials: "include",
      method: "DELETE",
      headers: {
        Authorization: this._token,
      },
    }).then((res) => this._getAnswer(res));
  }

  changeLikeCardStatus(id, isLiked) {
    if (isLiked) {
      return this.likeOn(id);
    } else {
      return this.likeOff(id);
    }
  }
}

const config = {
  address: "https://mesto.nomoreparties.co/v1/",
  token: "22c6286b-d5fa-40bf-b483-a71816fa51e0",
};

const api = new Api(config);

export default api;

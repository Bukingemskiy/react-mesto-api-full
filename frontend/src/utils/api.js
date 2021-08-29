class Api {
  constructor({ address, headers }) {
    this._address = address;
    this._headers = headers;
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
      headers: this._headers,
    }).then((res) => this._getAnswer(res));
  }

  editProfile(data) {
    return fetch(`${this._address}/users/me `, {
      credentials: "include",
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({ name: data.name, about: data.about }),
    }).then((res) => this._getAnswer(res));
  }

  updateImage(data) {
    return fetch(`${this._address}/users/me/avatar `, {
      credentials: "include",
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({ avatar: data.avatar }),
    }).then((res) => this._getAnswer(res));
  }

  makeCard(data) {
    return fetch(`${this._address}/cards`, {
      credentials: "include",
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({ name: data.name, link: data.link }),
    }).then((res) => this._getAnswer(res));
  }

  getCards() {
    return fetch(`${this._address}/cards`, {
      credentials: "include",
      headers: this._headers,
    }).then((res) => this._getAnswer(res));
  }

  deleteCard(id) {
    return fetch(`${this._address}/cards/${id}`, {
      credentials: "include",
      method: "DELETE",
      headers: this._headers,
    }).then((res) => this._getAnswer(res));
  }

  likeOn(id) {
    return fetch(`${this._address}/cards/${id}/likes`, {
      credentials: "include",
      method: "PUT",
      headers: this._headers,
    }).then((res) => this._getAnswer(res));
  }

  likeOff(id) {
    return fetch(`${this._address}/cards/${id}/likes`, {
      credentials: "include",
      method: "DELETE",
      headers: this._headers,
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
  address: "https://api.project.mesto.nomoredomains.rocks",
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
};

const api = new Api(config);

export default api;

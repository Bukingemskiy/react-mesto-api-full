class Api {
  constructor({ address }) {
    this._address = address;
  }

  _getAnswer(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  }

  getUserData() {
    return fetch(`${this._address}/users/me `, { credentials: "include" }).then(
      (res) => this._getAnswer(res)
    );
  }

  editProfile(data) {
    return fetch(`${this._address}/users/me `, {
      method: "PATCH",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name: data.name, about: data.about }),
    }).then((res) => this._getAnswer(res));
  }

  updateImage(data) {
    return fetch(`${this._address}/users/me/avatar `, {
      method: "PATCH",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ avatar: data.avatar }),
    }).then((res) => this._getAnswer(res));
  }

  makeCard(data) {
    return fetch(`${this._address}/cards`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name: data.name, link: data.link }),
    }).then((res) => this._getAnswer(res));
  }

  getCards() {
    return fetch(`${this._address}/cards`, { credentials: "include" }).then(
      (res) => this._getAnswer(res)
    );
  }

  deleteCard(id) {
    return fetch(`${this._address}/cards/${id}`, {
      method: "DELETE",
      credentials: "include",
    }).then((res) => this._getAnswer(res));
  }

  likeOn(id) {
    return fetch(`${this._address}/cards/likes/${id}`, {
      method: "PUT",
      credentials: "include",
    }).then((res) => this._getAnswer(res));
  }

  likeOff(id) {
    return fetch(`${this._address}/cards/likes/${id}`, {
      method: "DELETE",
      credentials: "include",
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
  address: "http://api.project.mesto.nomoredomains.rocks",
};

const api = new Api(config);

export default api;

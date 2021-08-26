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
    return fetch(`${this._address}/users/me `).then((res) =>
      this._getAnswer(res)
    );
  }

  editProfile(data) {
    return fetch(`${this._address}/users/me `, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name: data.name, about: data.about }),
    }).then((res) => this._getAnswer(res));
  }

  updateImage(data) {
    return fetch(`${this._address}/users/me/avatar `, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ avatar: data.avatar }),
    }).then((res) => this._getAnswer(res));
  }

  makeCard(data) {
    return fetch(`${this._address}/cards`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name: data.name, link: data.link }),
    }).then((res) => this._getAnswer(res));
  }

  getCards() {
    return fetch(`${this._address}/cards`).then((res) => this._getAnswer(res));
  }

  deleteCard(id) {
    return fetch(`${this._address}/cards/${id}`, {
      method: "DELETE",
    }).then((res) => this._getAnswer(res));
  }

  likeOn(id) {
    return fetch(`${this._address}/cards/likes/${id}`, {
      method: "PUT",
    }).then((res) => this._getAnswer(res));
  }

  likeOff(id) {
    return fetch(`${this._address}/cards/likes/${id}`, {
      method: "DELETE",
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

class Api {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  _isResOk(res) {
    if (res.ok) {
      return res.json();
    } else {
      return Promise.reject(`Ошибка: ${res.status}`);
    }
  }

  getUserInfoApi(token) {
    return fetch(`${this._baseUrl}/users/me`, {
      headers: {
        authorization: `Bearer ${token}`,
      },
    }).then((res) => this._isResOk(res));
  }

  getSavedMovies(token) {
    return fetch(`${this._baseUrl}/movies`, {
      headers: {
        authorization: `Bearer ${token}`,
      },
    }).then((res) => this._isResOk(res));
  }

  patchProfile({ name, email }, token) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: "PATCH",
      headers: {
        authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: name,
        email: email,
      }),
    }).then((res) => this._isResOk(res));
  }

  deleteMovieApi(_id, token) {
    return fetch(`${this._baseUrl}/movies/${_id}`, {
      method: "DELETE",
      headers: {
        authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    }).then((res) => this._isResOk(res));
  }

  changeMovieLikeApi(_id, isLiked, token) {
    return fetch(`${this._baseUrl}/movies/${_id}`, {
      method: isLiked ? "DELETE" : "PUT",
      headers: {
        authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    }).then((res) => this._isResOk(res));
  }
}

export const api = new Api({
  baseUrl: "http://localhost:3000",
  // baseUrl: "https://api.moviesexplorer.avakht.nomoredomainsicu.ru",
  headers: {
    "Content-Type": "application/json",
  },
});

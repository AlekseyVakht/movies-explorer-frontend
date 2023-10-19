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

  //Profile
  getUserInfoApi(token) {
    return fetch(`${this._baseUrl}/users/me`, {
      headers: {
        authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
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

  //Movies
  getSavedMovies(token) {
    return fetch(`${this._baseUrl}/movies`, {
      headers: {
        authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    }).then((res) => this._isResOk(res));
  }

  deleteMovieApi(_id, token) {
    return fetch(`${this._baseUrl}/movies/${_id}`, {
      method: "DELETE",
      headers: {
        authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({_id: _id})
    }).then((res) => this._isResOk(res));
  }

  changeSaveStatus(movieData, isSave, token) {
    if (isSave) {
      return fetch(`${this._baseUrl}/movies/${movieData._id}`, {
        method: "DELETE",
        body: JSON.stringify({_id: movieData._id}),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        }
      })
      .then((res) => this._isResOk(res));
    } else {
      return fetch(`${this._baseUrl}/movies`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          movieId: movieData.id,
          nameRU: movieData.nameRU,
          nameEN: movieData.nameEN,
          director: movieData.director,
          country: movieData.country,
          year: movieData.year,
          duration: movieData.duration,
          description: movieData.description,
          trailerLink: movieData.trailerLink,
          image: `https://api.nomoreparties.co${movieData.image.url}`,
          thumbnail: `https://api.nomoreparties.co${movieData.image.formats.thumbnail.url}`,
        }),
      })
      .then((res) => this._isResOk(res));
    }
  }
}

export const api = new Api({
  // baseUrl: "https://api.moviesexplorer.avakht.nomoredomainsicu.ru",
  baseUrl: "http://localhost:3000",
  headers: {
    "Content-Type": "application/json",
  },
});

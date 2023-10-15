class MovieApi {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  getMovies(token) {
    return fetch(`${this._baseUrl}`, {
      headers: {
        authorization: `Bearer ${token}`,
      },
    }).then((res) => this._isResOk(res));
  }

  // postCard(data, token) {
  //   return fetch(`${this._baseUrl}`, {
  //     method: "POST",
  //     headers: {
  //       authorization: `Bearer ${token}`,
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify({
  //       name: data.name,
  //       link: data.link,
  //     }),
  //   }).then((res) => this._isResOk(res));
  // }
}

export const movieApi = new MovieApi({
  baseUrl: "https://api.nomoreparties.co/beatfilm-movies",
  headers: {
    "Content-Type": "application/json",
  },
});

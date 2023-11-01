export function getAllMovies() {
  return fetch('https://api.nomoreparties.co/beatfilm-movies')
      .then((res) => {
          return res.json();
      })
      .catch(error => {
          console.error('Error:', error);
      });
}

import axios from 'axios';

const API_KEY =
  'live_GMXh4r5NDbNPMNWdeeLaNoIHSSjWhUpHXcLKejzKMQ9stY6OSSU7cY7xjFVthT7A';
axios.defaults.headers.common['x-api-key'] = API_KEY;

// fetch all the cat breeds
function fetchBreeds() {
  const BREEDS_URL = 'https://api.thecatapi.com/v1/breeds';

  const params = new URLSearchParams({
    api_key: API_KEY,
  });

  return fetch(`${BREEDS_URL}?api_key=${API_KEY}`).then(response => {
    if (!response.ok) {
      throw new Error(response.statusText);
    }
    return response.json();
  });
}

// fetch cats by specific breed
function fetchCatByBreed(breedId) {
  const SEARCH_URL = 'https://api.thecatapi.com/v1/images/search';

  const params = new URLSearchParams({
    api_key: API_KEY,
  });

  return fetch(`${SEARCH_URL}/${breedId}?api_key=${API_KEY}`).then(response => {
    if (!response.ok) {
      throw new Error(response.statusText);
    }
    return response.json();
  });
}

export { fetchBreeds, fetchCatByBreed };

// function fetchBreeds() {
//   return axios({
//     method: 'get',
//     url: BREEDS_URL,
//   })
//     .then(response => console.log(response))
//     .catch(error => console.log(error));
// }

// console.log(fetchBreeds());

// function fetchCatByBreed(breedId) {
//   return axios({
//     method: 'get',
//     url: SEARCH_URL,
//   })
//     .then(response => console.log(response))
//     .catch(error => console.log(error));
// }

// console.log(fetchCatByBreed(breedId));

import axios from 'axios';

const API_KEY =
  'live_GMXh4r5NDbNPMNWdeeLaNoIHSSjWhUpHXcLKejzKMQ9stY6OSSU7cY7xjFVthT7A';
axios.defaults.headers.common['x-api-key'] = API_KEY;

// fetch all the cat breeds
function fetchBreeds() {
  const BREEDS_URL = 'https://api.thecatapi.com/v1/breeds';

  return axios.get(`${BREEDS_URL}`).then(response => {
    // if (!response.ok) {
    //   throw new Error(response.statusText);
    // }
    // return response.json();
    return response.data;
  });
}

// fetch cats by specific breed
function fetchCatByBreed(breedId) {
  const SEARCH_URL = 'https://api.thecatapi.com/v1/images/search';

  return axios.get(`${SEARCH_URL}?breed_ids=${breedId}`).then(response => {
    // if (!response.ok) {
    //   throw new Error(response.statusText);
    // }
    // return response.json();
    return response.data;
  });
}

export { fetchBreeds, fetchCatByBreed };

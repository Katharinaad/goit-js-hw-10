import axios from 'axios';

const API_KEY =
  live_GMXh4r5NDbNPMNWdeeLaNoIHSSjWhUpHXcLKejzKMQ9stY6OSSU7cY7xjFVthT7A;
axios.defaults.headers.common['x-api-key'] = API_KEY;

const BREEDS_URL = 'https://api.thecatapi.com/v1/breeds';
const SEARCH_URL = 'https://api.thecatapi.com/v1/images/search';

function fetchBreeds() {
  return axios({
    method: 'get',
    url: BREEDS_URL,
  })
    .then(response => console.log(response))
    .catch(error => console.log(error));
}

console.log(fetchBreeds());

function fetchCatByBreed(breedId) {
  return axios({
    method: 'get',
    url: SEARCH_URL,
  })
    .then(response => console.log(response))
    .catch(error => console.log(error));
}

console.log(fetchCatByBreed(breedId));

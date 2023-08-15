import './css/styles.css';
import { fetchCatByBreed } from './js/cat-api';
import { fetchBreeds } from './js/cat-api';

import Notiflix from 'notiflix';

const selectBreed = document.querySelector('.breed-select');
const catPicture = document.querySelector('.cat-picture');
const catDescription = document.querySelector('.cat-description');
const loaderElement = document.querySelector('.loader');

selectBreed.addEventListener('change', changeCatBreed);

function changeCatBreed(event) {
  const breedId = event.target.value;
  console.log('breedId: ', breedId);
  fetchCatByBreed(breedId);
}

function fetchAndRenderBreeds() {
  loaderElement.classList.remove('hidden');
  fetchBreeds()
    // .then(breeds => console.log(breeds))
    .then(breeds => renderBreedsSelect(breeds))
    .catch(error => {
      console.log(error);
      Notiflix.Notify.failure(
        'Oops! Something went wrong! Try reloading the page!'
      );
    })
    .finally(() => loaderElement.classList.add('hidden'));
}

fetchAndRenderBreeds();

function renderBreedsSelect(breeds) {
  const optionMarkup = breeds
    .map(breed => {
      return `<option value="${breed.reference_image_id}">${breed.name}</option>`;
    })
    .join('');
  selectBreed.insertAdjacentHTML('beforeend', optionMarkup);
}

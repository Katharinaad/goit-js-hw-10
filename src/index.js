import './css/styles.css';
import { fetchCatByBreed } from './js/cat-api';
import { fetchBreeds } from './js/cat-api';

import Notiflix from 'notiflix';

const selectBreed = document.querySelector('.breed-select');
const catPicture = document.querySelector('.cat-picture');
const catDescription = document.querySelector('.cat-description');
const loaderElement = document.querySelector('.loader');

selectBreed.addEventListener('change', changeCatBreed);

fetchAndSelectBreeds();

// function that selects a breed of a cat
function changeCatBreed(event) {
  const breedId = event.target.value;
  console.log('breedId: ', breedId);
  fetchCatByBreed(breedId)
    .then(breed => renderBreedDescription(breed))
    // .then(breed => console.log(breed))
    .catch(error => {
      Notiflix.Notify.failure(
        'Oops! Something went wrong! Try reloading the page!'
      );
    });
}

// fetch data after loading the page makes the markup in select
function fetchAndSelectBreeds() {
  loaderElement.classList.remove('hidden');
  fetchBreeds()
    // .then(breeds => console.log(breeds))
    .then(breeds => markupBreedsSelect(breeds))
    .catch(error => {
      console.log(error);
      Notiflix.Notify.failure(
        'Oops! Something went wrong! Try reloading the page!'
      );
    })
    .finally(() => loaderElement.classList.add('hidden'));
}

function markupBreedsSelect(breeds) {
  const optionMarkup = breeds
    .map(breed => {
      return `<option value="${breed.reference_image_id}">${breed.name}</option>`;
    })
    .join('');
  selectBreed.insertAdjacentHTML('beforeend', optionMarkup);
}

function renderBreedDescription(breed) {
  const pictureMarkup = `<img src="${breed.url}" alt="${breed.name}">`;
  const descriptionMarkup = `<h2>${breed.breeds[0].name}</h2>
  <p>${breed.breeds[0].description}</p>`;
  catPicture.insertAdjacentHTML('beforeend', pictureMarkup);
  catDescription.insertAdjacentHTML('beforeend', descriptionMarkup);
}

import './css/styles.css';
import { fetchCatByBreed } from './js/cat-api';
import { fetchBreeds } from './js/cat-api';

import SlimSelect from 'slim-select';
import 'slim-select/dist/slimselect.css';

import Notiflix from 'notiflix';

const selectBreed = document.querySelector('.breed-select');
const catPicture = document.querySelector('.cat-picture');
const catDescription = document.querySelector('.cat-description');
const catInformation = document.querySelector('.cat-info');
const loaderElement = document.querySelector('.loader');

// window.addEventListener('load', function () {
//   const loaderContainer = document.querySelector('.loader-container');
//   loaderContainer.classList.remove('hidden');
// });

selectBreed.addEventListener('change', changeCatBreed);

fetchAndSelectBreeds();

// function that selects a breed of a cat
function changeCatBreed(event) {
  loaderElement.classList.remove('hidden');
  catDescription.innerHTML = '';
  catPicture.innerHTML = '';

  const breedId = event.target.value;
  console.log('breedId: ', breedId);
  fetchCatByBreed(breedId)
    .then(breed => renderBreedDescription(breed))
    // .then(breed => console.log(breed))
    .catch(error => {
      console.log(error);
      Notiflix.Notify.failure(
        'Oops! Something went wrong! Try reloading the page!'
      );
    })
    .finally(() => loaderElement.classList.add('hidden'));
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
    .finally(() => {
      loaderElement.classList.add('hidden');

      selectBreed.classList.remove('hidden');

      // // Adding the window.addEventListener code
      // window.addEventListener('load', function () {
      //   const loaderContainer = document.querySelector('.loader-container');
      //   loaderContainer.classList.remove('hidden');
      // });
    });
}

function markupBreedsSelect(breeds) {
  const optionMarkup = breeds
    .map(breed => {
      return `<option value="${breed.id}">${breed.name}</option>`;
    })
    .join('');
  selectBreed.insertAdjacentHTML('beforeend', optionMarkup);
  // initialization of SlimSelect
  new SlimSelect({
    select: '#selectElement',
  });
}

// makes a markup of a given cat (picture and text)
function renderBreedDescription(breed) {
  console.log(breed);
  const pictureMarkup = `<img src="${breed[0].url}" alt="${breed.name}">`;
  const descriptionMarkup = `<h2>${breed[0].breeds[0].name}</h2>
<p class="">${breed[0].breeds[0].description}</p>`;

  catPicture.innerHTML = pictureMarkup;
  catDescription.innerHTML = descriptionMarkup;
  // catPicture.insertAdjacentHTML('beforeend', pictureMarkup);
  // catDescription.insertAdjacentHTML('beforeend', descriptionMarkup);
}

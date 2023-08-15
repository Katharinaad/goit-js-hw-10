import './css/styles.css';
import { fetchCatByBreed } from './js/cat-api';

const selectBreed = document.querySelector('.breed-select');
const catDescription = document.querySelector('.cat-info');
const loaderElement = document.querySelector('.loader');

selectBreed.addEventListener('change', changeCatBreed);

function changeCatBreed(event) {
  const breedId = event.target.value;
  console.log('breedId: ', breedId);
  fetchCatByBreed(breedId);
}

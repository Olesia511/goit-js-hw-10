import { fetchBreeds } from './cat-api';
import { fetchCatByBreed } from './cat-api';
import { createSelectMarkup } from './createMarkup';
import { createCard } from './createMarkup';

export const breedSelect = document.querySelector('.breed-select');
const loaderText = document.querySelector('.loader');
const errorText = document.querySelector('.error');
export const catInfo = document.querySelector('.cat-info');

errorText.hidden = true;
breedSelect.hidden = true;

breedSelect.addEventListener('change', onSearch);

setTimeout(() => {
  fetchBreeds()
    .then(data => {
      createSelectMarkup(data);
      breedSelect.hidden = false;
      errorText.hidden = true;
      loaderText.hidden = true;
    })
    .catch(err => {
      console.log(err);
      errorText.hidden = false;
      loaderText.hidden = true;
      breedSelect.hidden = true;
      catInfo.classList.toggle('hidden');
    });
}, 1000);

function onSearch(evt) {
  loaderText.hidden = false;
  catInfo.classList.add('hidden');
  const catId = evt.target.options[evt.target.selectedIndex].id;

  setTimeout(() => {
    fetchCatByBreed(catId)
      .then(cat => {
        loaderText.hidden = true;
        createCard(cat);
        catInfo.classList.remove('hidden');
      })
      .catch(err => {
        console.log(err);
        errorText.hidden = false;
        loaderText.hidden = true;
        breedSelect.hidden = true;
        catInfo.classList.toggle('hidden');
      });
  }, 1000);
}

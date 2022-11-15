import './css/styles.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
let debounce = require('lodash.debounce');
import { fetchCountries } from './js/fetch';
const DEBOUNCE_DELAY = 300;
const inputEl = document.querySelector('#search-box');
const countryList = document.querySelector('.country-list');

function createMarkup(countrie) {
  const mark = countrie
    .map(({ capital, flags, languages, name, population }) => {
      const lang = Object.values(languages);
      return `<li class='countrie-list__item'><img src='${flags.svg}' class='countrie__img'><sapan class='countrie__text'>${name.official}</span></li>
      <li class='countrie__item'><sapan class='countrie__text'>Capital:${capital}</span></li>
      <li class='countrie__item'><sapan class='countrie__text'>Population:${population}</span></li>
      <li class='countrie__item'><sapan class='countrie__text'>Languages:${lang}</span></li>`;
    })
    .join('');
  countryList.innerHTML = mark;
}

function createMarkupList(countrie) {
  const mark = countrie
    .map(({ capital, flags, languages, name, population }) => {
      const lang = Object.values(languages);
      console.log(capital[0], flags.svg, lang, name.official, population);
      return `<li class='countrie-list__item'><img src='${flags.svg}' class='countrie-list__img'><sapan class='class-list__text'>${name.official}</span></li>`;
    })
    .join('');
  countryList.innerHTML = mark;
  console.log(mark);
}
inputEl.addEventListener(
  'input',
  debounce(e => {
    e.preventDefault();

    if (e.target.value.trim() !== '') {
      fetchCountries(e.target.value.trim())
        .then(countrie => {
          if (countrie.length > 1 && countrie.length <= 10) {
            createMarkupList(countrie);
          }
          if (countrie.length === 1) {
            createMarkup(countrie);
          }
          if (countrie.length > 10) {
            Notify.info('please more specific name');
          }
        })

        .catch(error => {
          Notify.failure('Oops, there is no country with that name');
        });
    } else {
      e.target.value = '';
      countryList.innerHTML = '';
      Notify.warning(' is empty!');
    }
  }, DEBOUNCE_DELAY)
);

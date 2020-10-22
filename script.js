const app = document.querySelector('#app');
const searchInput = document.querySelector('#search-input');
const submitButton = document.querySelector('#submit');
const endpoint = 'https://node-api-keys-for-unsplash.rjlevy.repl.co/json';

function getImages() {
  if (!searchInput.value) return;
  app.innerHTML = 'Loading...';
  submitButton.disabled = true;
  fetch(`${endpoint}?s=${searchInput.value}`)
  .then(res => res.json())
  .then(result => {
    app.innerHTML = renderImages(result);
    submitButton.disabled = false;
  });
}

const renderImages = array => array.map(item => `<div><img src="${item.urls.regular}&w=200&fit=crop&fm=jpg&q=75"></div>`).join('');

submitButton.addEventListener('click', (e) => {
  getImages();
});

searchInput.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') getImages();
});

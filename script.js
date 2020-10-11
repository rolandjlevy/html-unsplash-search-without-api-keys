const app = document.querySelector('#app');
const searchInput = document.querySelector('#search-input');
const submitButton = document.querySelector('#submit');
const endpoint = 
'https://node-api-keys-for-unsplash.rjlevy.repl.co/json';

function getImages() {
  if (!searchInput.value) return;
  app.innerHTML = 'Loading...';
  submitButton.disabled = true;
  const url = `${endpoint}?s=${searchInput.value}`;
  fetch(url)
  .then(res => res.json())
  .then(result => {
    app.innerHTML = renderImages(result);
    submitButton.disabled = false;
  });
}

function renderImages(array) {
  const params = `&fit=crop&fm=jpg&q=95"`;
  return array.map(item => `<div><img src="${item.urls.regular}${params}"></div>`).join('');
}

submitButton.addEventListener('click', (e) => {
  getImages();
});

searchInput.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') getImages();
});

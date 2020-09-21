const app = document.querySelector('#app');
const searchInput = document.querySelector('#search-input');
const submitButton = document.querySelector('#submit');
const endpoint = 'https://node-api-keys.rjlevy.repl.co/json';

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
  const params = `&w=200&h=200&fit=crop&fm=jpg&q=95" style="margin:5px;object-fit:cover;width:200px;height:200px;"`;
  return array.map(item => `<img src="${item.urls.regular}${params}">`).join('');
}

submitButton.addEventListener('click', (e) => {
  getImages();
});

searchInput.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') getImages();
});

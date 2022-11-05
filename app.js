const gallery = document.querySelector('.gallery');
const searchInput = document.querySelector('.search-input');
const form = document.querySelector('.search-form');
let searchValue;

async function curatedPhotos() {
  const data = await fetchApi(
    'https://api.pexels.com/v1/curated?per_page=15&page=1'
  );
  generatePictures(data);
}

async function searchPhotos(search) {
  clear();
  const data = await fetchApi(
    `https://api.pexels.com/v1/search?query=${search}&per_page=15&page=1`
  );
  generatePictures(data);
}

const updateInput = (e) => (searchValue = e.target.value);

async function fetchApi(url) {
  const dataFetch = await fetch(url, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      Authorization: auth,
    },
  });
  const data = await dataFetch.json();
  return data;
}

const generatePictures = (data) => {
  data.photos.forEach((photo) => {
    const galleryImg = document.createElement('div');
    galleryImg.classList.add('gallery-img');
    galleryImg.innerHTML = `<img src=${photo.src.large}> </img>
    <p>${photo.photographer}</p>
    `;
    gallery.appendChild(galleryImg);
  });
};

const clear = () => {
  gallery.innerHTML = '';
  searchInput.value = '';
};

searchInput.addEventListener('input', updateInput);
form.addEventListener('submit', (e) => {
  e.preventDefault();
  searchPhotos(searchValue);
});

curatedPhotos();

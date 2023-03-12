import { Notify } from 'notiflix/build/notiflix-notify-aio';
import ApiContent from "./js/content-api";
import photosTemplate from './js/img-templates';
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";
import throttle from "lodash.throttle";

let lightbox = new SimpleLightbox('.gallery a', {
  captionDelay: 250,
  animationSpeed: 200,
  fadeSpeed: 150,
});

const refs = {
    cardContainer: document.querySelector('.gallery'),
    searchForm: document.querySelector('.search-form'),
    loadMoreBtn: document.querySelector('.load-more'),
}

const apiContent = new ApiContent();

refs.searchForm.addEventListener("submit", onSearch);
refs.loadMoreBtn.addEventListener("click", searchNext);
window.addEventListener("scroll", throttle(searchNext, 200)); 

function onSearch(e) {
    e.preventDefault();

    apiContent.query = e.currentTarget.elements.searchQuery.value.trim();
    apiContent.resetPage();

    if (apiContent.query === "") {
        return Notify.failure('Please enter search words');
    }

    clearCardsContainer();
    const items = apiContent.fetchItems();
    items.then((data) => {
        if (data.totalHits === 0) {
            return Notify.failure('There are no images matching your search query. Please try again');
        }
        Notify.success(`Hooray! We found ${data.totalHits} images.`);
        
        markupPhotos(data);
        refs.loadMoreBtn.classList.remove('is-hidden');
    });
}
 
function searchNext() {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000) {
        if (apiContent.isDoing === false) {
            refs.loadMoreBtn.classList.add('is-hidden');
            apiContent.fetchItems().then((data) => {
                markupPhotos(data);
            });  
            refs.loadMoreBtn.classList.remove('is-hidden');
        }
    }
}

function markupPhotos(photos) {
    refs.cardContainer.insertAdjacentHTML('beforeend', photosTemplate(photos)); 
    lightbox.refresh();
}

function clearCardsContainer() {
    refs.cardContainer.innerHTML = ""; 
}

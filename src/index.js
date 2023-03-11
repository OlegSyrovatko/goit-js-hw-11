// import './css/styles.css';
// import debounce from "lodash.debounce";

import Notiflix from 'notiflix';
import ApiContent from "./js/content-api";
import photosTemplate from './js/img-templates';
// Notiflix.Notify.success('Sol lucet omnibus');
// Notiflix.Notify.failure('Qui timide rogat docet negare');
// Notiflix.Notify.warning('Memento te hominem esse');
// Notiflix.Notify.info('Cogito ergo sum');

const refs = {
    cardContainer: document.querySelector('.gallery'),
    searchForm: document.querySelector('.search-form'),
}

const apiContent = new ApiContent();

refs.searchForm.addEventListener("submit", onSearch);

function onSearch(e) {
    e.preventDefault();

    const form = e.currentTarget;
    apiContent.query = e.currentTarget.elements.searchQuery.value.trim();
    if (apiContent.query === "") {
        return Notiflix.Notify.failure('Please enter search words');
    }

    const items = apiContent.fetchItems();
    items.then((data) => {
        if (data.totalHits === 0) {
            return Notiflix.Notify.failure('There are no images matching your search query. Please try again');
        }
        // console.log(data.totalHits);
        // console.log(data.hits);
        markupPhotos(data);
    });
    
}
 
function markupPhotos(photos) {
    // refs.cardContainer.insertAdjacentHTML('beforeend', photosTemplate(photos)); 
    refs.cardContainer.innerHTML = photosTemplate(photos);
}


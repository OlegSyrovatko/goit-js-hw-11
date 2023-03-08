// import './css/styles.css';
// import debounce from "lodash.debounce";

// const DEBOUNCE_DELAY = 300;
// const box = document.querySelector("#search-box");

// import { fetchCountries } from "./fetchCountries.js";

// box.addEventListener("input", debounce(() => {
//     fetchCountries(box.value)
// }, DEBOUNCE_DELAY));

import ApiContent from "./content-api";

const refs = {
    cardContainer: document.querySelector('.gallery'),
    searchForm: document.querySelector('.search-form'),
}

const apiContent = new ApiContent();

refs.searchForm.addEventListener("submit", onSearch);

function onSearch(e) {
    e.preventDefault();

    const form = e.currentTarget;
    // const searchQuery = form.elements.searchQuery.value;
    apiContent.query = e.currentTarget.elements.searchQuery.value;
    // console.log(searchQuery); 
    apiContent.fetchItems().then(items => {console.log(items) });
 }
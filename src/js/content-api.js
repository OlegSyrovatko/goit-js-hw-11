import Notiflix from 'notiflix';
const axios = require('axios').default;
const URL = 'https://pixabay.com/api/';
const API_KEY = '34241449-e1fad7b12dc666345bb2e99a8';
        
export default class ApiContent {
    constructor() {
        this.searchQuery = '';
        this.page = 1;
    }

    async fetchItems() {

        const searchParams = new URLSearchParams({
            key: API_KEY,
            q: this.searchQuery,
            // q: 'dog',
            image_type: 'photo',
            orientation: 'horizontal',
            safesearch: true,
            per_page: this.perPage,
            page: this.page,
        });
            // console.log(searchParams.q); 
        // Loading.circle();
        try {
            const response = await axios.get(URL, { params: searchParams });
            //   Loading.remove();
            //   this.page += 1;
            // console.log(response.data.totalHits); 

            return response.data;

        } catch {
            Notiflix.Notify.failure('The request was not processed');
            //   Loading.remove();
        }
    }

    get query() {
        return this.searchQuery;
    }
    set query(newQuery) {
        this.searchQuery = newQuery;
    }
}



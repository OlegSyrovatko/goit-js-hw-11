import { Report } from 'notiflix/build/notiflix-report-aio';
import { Loading } from 'notiflix/build/notiflix-loading-aio';
const axios = require('axios').default;
const URL = 'https://pixabay.com/api/';
const API_KEY = '34241449-e1fad7b12dc666345bb2e99a8';
        
export default class ApiContent {
    constructor() {
        this.searchQuery = '';
        this.page = 1;
        this.perPage = 40;
        this.isDoing = false;
    }

    async fetchItems() {

        const searchParams = new URLSearchParams({
            key: API_KEY,
            q: this.searchQuery,
            image_type: 'photo',
            orientation: 'horizontal',
            safesearch: true,
            per_page: this.perPage,
            page: this.page,
        });

        Loading.circle("Loading...");
        this.isDoing = true;
        try {
            const response = await axios.get(URL, { params: searchParams });
              Loading.remove();
            this.incrementPage();
            this.isDoing = false;
            return response.data;
        } catch {
            Report.info('The request was not processed');
            Loading.remove();
            this.isDoing = false;
        }
    }

    incrementPage() {
        this.page += 1;
    }

    resetPage() {
        this.page = 1;
    }

    get query() {
        return this.searchQuery;
    }
    set query(newQuery) {
        this.searchQuery = newQuery;
    }
}



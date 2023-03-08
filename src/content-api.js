const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '4241449-e1fad7b12dc666345bb2e99a8';
// const options = {
//     headers: {
//         Authorization: API_KEY,
//     },
// };


export default class ApiContent {
    constructor() {
        this.searchQuery = "dog";
        this.page = 1;
    }

    fetchItems() { 

        // const url = `${BASE_URL}?key=${API_KEY}&q=${this.searchQuery}`; 
        const url = `https://pixabay.com/api/?key=4241449-e1fad7b12dc666345bb2e99a8&q=yellow+flowers&image_type=photo`; 

        // const url = `https://restcountries.com/v3.1/name/${this.searchQuery}?fields=name,capital,population,flags,languages`;
        return fetch(url)
            // .then(res => res.json())
            .then((items) => { return items });
    }

    //   async fetchCountries () {
    //     const response = await fetch(`https://restcountries.com/v3.1/name/${this.searchQuery}?fields=name,capital,population,flags,languages`);
    //     if (!response.ok) {
    //         Notiflix.Notify.failure(`Oops, there is no country with that name`);
    //     }
    //     return await response.json();
    // };

    get query() { 
        return this.fetchItems;
    }
} 
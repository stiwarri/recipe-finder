import axios from 'axios';

export default class Search {
    constructor(query) {
        this.query = query;
    }

    getRecipes = async () => {
        /* axios(`https://forkify-api.herokuapp.com/api/search?q=${this.query}`)
            .then(data => console.log(data))
            .catch(err => console.log(err)); */

        const recipes = await axios(`https://forkify-api.herokuapp.com/api/search?q=${this.query}`);
        console.log(recipes);
    }
}

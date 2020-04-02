import axios from 'axios';

import {
    QUERIES_LIST
} from '../../mock-data/queries-list.js';

export default class Search {
    constructor() {}

    getQueriesList = async (userInput) => {
        const listOfQueries = await new Promise((resolve, reject) => {
            resolve(QUERIES_LIST);
        });
        const filteredListOfQueries = listOfQueries.filter(query => query.includes(userInput));
        this.queries = filteredListOfQueries;
    }

    getRecipesList = async (query) => {
        this.query = query;
        const listOfRecipes = await axios(`https://forkify-api.herokuapp.com/api/search?q=${this.query}`);
        this.recipes = listOfRecipes.data.recipes;
    }
}
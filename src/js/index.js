import * as searchView from './views/search';
import * as utils from './utils';
import {
    elements
} from './views/base';
import Search from './models/Search';
import '../styles/main.scss';

/** Global State of the Application
 * - Search Object
 * - Recipe Object
 * - Shopping List Object
 * - Favourites Object
 */
const state = {};

searchView.createAutoComplete({
    root: elements.recipeSearchInput,
    placeholder: 'Start searching for your favourite recipe here...',
    fetchData: async userInput => {
        state.search = new Search();
        await state.search.getQueriesList(userInput);
        return state.search.queries;
    },
    renderItem: query => {
        return `${query}`;
    },
    onItemSelect: async selectedQuery => {
        searchView.clearRecipes();
        utils.showLoader(elements.recipeListSection);
        await state.search.getRecipesList(selectedQuery);
        utils.hideLoader(elements.recipeListSection);
        searchView.renderRecipes(state.search.recipes, 1, 5);
    },
    setInputValue: query => {
        return query;
    }
});

const onDocumentClickHandler = (event) => {
    const autoCompletes = elements.autoCompletes;
    for (let autoComplete of autoCompletes) {
        if (!autoComplete.contains(event.target)) {
            autoComplete.querySelector('.auto-complete-list').classList.add('inactive');
        }
    }
}

document.addEventListener('click', onDocumentClickHandler);
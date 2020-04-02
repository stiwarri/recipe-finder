import * as searchView from './views/search';
import { elements } from './views/base';
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
        await state.search.getRecipesList(selectedQuery);
        searchView.clearRecipes();
        searchView.renderRecipes(state.search.recipes);
    },
    setInputValue: query => {
        return query;
    }
});

const onDocumentClickHandler = (event) => {
    const autoCompletes = elements.autoCompletes;
    console.log(autoCompletes);
    for (let autoComplete of autoCompletes) {
        if (!autoComplete.contains(event.target)) {
            autoComplete.querySelector('.auto-complete-list').classList.add('inactive');
        }
    }
}

document.addEventListener('click', onDocumentClickHandler);
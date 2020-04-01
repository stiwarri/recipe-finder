import { createAutoComplete } from './views/search';
import Search from './models/Search';
import '../styles/main.scss';

/** Global State of the Application
 * - Search Object
 * - Recipe Object
 * - Shopping List Object
 * - Favourites Object
 */
const state = {};

createAutoComplete({
    root: document.getElementById('recipe-search-input'),
    placeholder: 'Enter query here',
    fetchData: async (userInput) => {
        state.search = new Search();
        await state.search.getQueriesList(userInput);
        return state.search.queries;
    },
    renderItem: (query) => {
        return `${query}`;
    },
    onItemSelect: (selectedQuery) => {
        state.search.getRecipesList(selectedQuery);
    },
    setInputValue: (query) => {
        return query;
    }
});

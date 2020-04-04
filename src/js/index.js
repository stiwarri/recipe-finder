import * as searchView from './views/search';
import * as utils from './utils';
import Search from './models/Search';
import '../styles/main.scss';

/** Global State of the Application
 * - Search Object
 * - Recipe Object
 * - Shopping List Object
 * - Favourites Object
 */
const state = {};

utils.createAutoComplete({
    root: utils.elements.recipeSearchInput,
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
        searchView.clearPaginationButtons();
        utils.showLoader(utils.elements.recipeListSection);
        await state.search.getRecipesList(selectedQuery);
        utils.hideLoader(utils.elements.recipeListSection);
        searchView.renderRecipes(state.search.recipes, 1);
    },
    setInputValue: query => {
        return query;
    }
});

const onDocumentClickHandler = event => {
    const autoCompletes = utils.elements.autoCompletes;
    for (let autoComplete of autoCompletes) {
        if (!autoComplete.contains(event.target)) {
            autoComplete.querySelector('.auto-complete-list').classList.add('inactive');
        }
    }
}

const paginationButtonsClickHandler = event => {
    if (event.target.closest(utils.selectors.nextPaginationButton) ||
        event.target.closest(utils.selectors.prevPaginationButton)) {
        searchView.clearRecipes();
        searchView.clearPaginationButtons();
        searchView.renderRecipes(state.search.recipes, parseInt(event.target.dataset.goto));
    }
}

document.addEventListener('click', onDocumentClickHandler);

utils.elements.recipeListSection.addEventListener('click', paginationButtonsClickHandler);
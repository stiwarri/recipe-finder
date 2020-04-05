import * as recipeView from './views/recipe';
import * as searchView from './views/search';
import * as utils from './utils';
import Recipe from './models/Recipe';
import Search from './models/Search';
import '../styles/main.scss';

/** Global State of the Application
 * - Search Object
 * - Recipe Object
 * - Shopping List Object
 * - Favourites Object
 */
const state = {};

/**
 * SEARCH CONTROLLER
 */
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
        searchView.showRecipeListSection();
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

const documentClickHandler = event => {
    const autoCompletes = utils.elements.autoCompletes;
    for (let autoComplete of autoCompletes) {
        if (!autoComplete.contains(event.target)) {
            autoComplete.querySelector(utils.selectors.autoCompleteList).classList.add('inactive');
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

document.addEventListener('click', documentClickHandler);
utils.elements.recipeListSection.addEventListener('click', paginationButtonsClickHandler);

/**
 * RECIPE CONTROLLER
 */
const loadRecipeDetails = async () => {
    const recipeId = window.location.hash.replace('#', '');
    if (recipeId) {
        recipeView.clearRecipeDetails();
        utils.showLoader(utils.elements.recipeDetails);
        state.recipe = new Recipe(recipeId);
        await state.recipe.getRecipeDetails();
        state.recipe.calculateTime();
        state.recipe.calculateServings();
        state.recipe.parseIngredients();
        utils.hideLoader(utils.elements.recipeDetails);
        recipeView.renderRecipeDetails(state.recipe);
    }
}

['hashchange', 'load'].forEach(event => window.addEventListener(event, loadRecipeDetails));

import * as recipeView from './views/recipe';
import * as searchView from './views/search';
import * as shoppingCartView from './views/shoppingCart';
import * as favouritesView from './views/favourites';
import * as utils from './utils';
import Recipe from './models/Recipe';
import Search from './models/Search';
import '../styles/main.scss';
import ShoppingCart from './models/ShoppingCart';
import Favourites from './models/Favourites';

/** Global State of the Application
 * - Search Object
 * - Recipe Object
 * - Shopping Cart Object
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
        searchView.selectedRecipeStyle(state.recipe, window.location.hash.replace('#', ''));
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
        searchView.selectedRecipeStyle(state.recipe, recipeId);
        recipeView.clearRecipeDetails();
        utils.showLoader(utils.elements.recipeDetails);
        state.recipe = new Recipe(recipeId);
        await state.recipe.getRecipeDetails();
        const isFavourite = state.favourites ? state.favourites.isFavourite(recipeId) : false; 
        state.recipe.calculateTime();
        state.recipe.calculateServings();
        state.recipe.parseIngredients();
        utils.hideLoader(utils.elements.recipeDetails);
        recipeView.renderRecipeDetails(state.recipe, isFavourite);
    }
}

const incDecButtonClickHandler = event => {
    if (event.target.matches('.inc-button')) {
        state.recipe.updateServings('inc');
    }
    if (event.target.matches('.dec-button')) {
        state.recipe.updateServings('dec');
    }
    recipeView.updateRecipeDetails(state.recipe);
}

['hashchange', 'load'].forEach(event => window.addEventListener(event, loadRecipeDetails));
utils.elements.recipeDetails.addEventListener('click', incDecButtonClickHandler);

/**
 * SHOPPING CART CONTROLLER
 */
const addToCartClickHandler = event => {
    if (event.target.matches('.add-to-cart-button')) {
        if (!state.shoppingCart) {
            state.shoppingCart = new ShoppingCart();
        }

        state.recipe.recipeDetails.ingredients.forEach(ing => {
            state.shoppingCart.addItem(ing);
        });

        shoppingCartView.renderShoppingCartItems(state.shoppingCart.items);
    }
}

const deleteItemFromCartHandler = event => {
    const itemId = event.target.closest(utils.selectors.cartItem).dataset.id;

    if (event.target.matches(utils.selectors.deleteItemButton)) {
        state.shoppingCart.deleteItem(itemId);
        shoppingCartView.removeShoppingCartItem(itemId);
    }
}

const inputCountClickHandler = event => {
    const itemId = event.target.closest(utils.selectors.cartItem).dataset.id;

    if (event.target.matches('.item-count')) {
        const newCount = event.target.value;
        state.shoppingCart.updateCount(itemId, newCount);
    }
}

utils.elements.recipeDetails.addEventListener('click', addToCartClickHandler);
utils.elements.cartItems.addEventListener('click', deleteItemFromCartHandler);
utils.elements.cartItems.addEventListener('click', inputCountClickHandler);

/**
 * FAVOURITES CONTROLLER
 */
const favouritesFunctionalityHandler = () => {
    state.favourites = new Favourites();
    state.favourites.getFavouritesFromLocalStorage();
    favouritesView.toggleFavouriteButton(state.favourites.items.length);
    favouritesView.updateFavouritesList(state.favourites.items);
}

const favouriteButtonClickHandler = () => {
    favouritesView.toggleActiveClasses();
}

const addRemoveFavouriteButtonClickHandler = event => {
    if (event.target.matches('.add-text')) {
        if (!state.favourites) {
            state.favourites = new Favourites();
        }

        if (!state.favourites.isFavourite(state.recipe.recipeId)) {
            state.favourites.addItemToFavourites(
                state.recipe.recipeId,
                state.recipe.recipeDetails.title,
                state.recipe.recipeDetails.publisher,
                state.recipe.recipeDetails.image_url
            );
            favouritesView.changeFavouriteButtonText('add');
        }
    } else if (event.target.matches('.remove-text')) {
        state.favourites.removeItemFromFavourites(state.recipe.recipeId);
        favouritesView.changeFavouriteButtonText('remove');
    }
    favouritesView.toggleFavouriteButton(state.favourites.items.length);
    favouritesView.updateFavouritesList(state.favourites.items);
}

window.addEventListener('load', favouritesFunctionalityHandler)
utils.elements.recipeDetails.addEventListener('click', addRemoveFavouriteButtonClickHandler);
utils.elements.favouriteButton.addEventListener('click', favouriteButtonClickHandler);
import * as utils from '../utils';

export const showRecipeListSection = () => {
    utils.elements.recipeListSection.classList.remove('inactive');
}

export const renderRecipes = (recipes, curPage, recipesPerPage = 7) => {
    const start = (curPage - 1) * recipesPerPage;
    const end = start + recipesPerPage;
    const totPages = Math.ceil(recipes.length / recipesPerPage);

    recipes.slice(start, end).forEach(recipe => {
        utils.elements.recipeItems.insertAdjacentHTML('beforeend',
            `<li class="recipe-item">
                <a href="#${recipe.recipe_id}">
                    <div class="figure">
                        <div class="recipe-image">
                            <img src="${recipe.image_url}" alt="image">
                        </div>
                        <div class="recipe-brief">
                            <h5 class="recipe-title">${utils.textLimiter(recipe.title, 30)}</h5>
                            <p class="recipe-publisher">${recipe.publisher}</p>
                        </div>
                    </div>
                </a>
            </li>`
        );
    });

    utils.elements.recipeItems.insertAdjacentHTML('afterend', `<div class="pagination-buttons">
        ${utils.createPageNavigationButtons(curPage, totPages)}
    </div>`);
}

export const clearRecipes = () => {
    while (utils.elements.recipeItems.firstChild) {
        utils.elements.recipeItems.removeChild(utils.elements.recipeItems.lastChild);
    }
}

export const clearPaginationButtons = () => {
    let recipeListSection = utils.elements.recipeListSection;

    if (utils.elements.recipeListSection.querySelector(utils.selectors.paginationButtons))
        utils.elements.recipeListSection.removeChild(recipeListSection.querySelector(utils.selectors.paginationButtons));
}

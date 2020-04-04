import {
    elements,
    textLimiter,
    createPageNavigationButtons,
    selectors
} from '../utils';

export const renderRecipes = (recipes, curPage, recipesPerPage = 10) => {
    const start = (curPage - 1) * recipesPerPage;
    const end = start + recipesPerPage;
    const totPages = Math.ceil(recipes.length / recipesPerPage);

    recipes.slice(start, end).forEach(recipe => {
        elements.recipeItems.insertAdjacentHTML('beforeend',
            `<li class="recipe-item">
                <a href="#${recipe.id}">
                    <div class="figure">
                        <div class="recipe-image">
                            <img src="${recipe.image_url}" alt="image">
                        </div>
                        <div class="recipe-brief">
                            <h5 class="recipe-title">${textLimiter(recipe.title, 30)}</h5>
                            <p class="recipe-publisher">${recipe.publisher}</p>
                        </div>
                    </div>
                </a>
            </li>`
        );
    });

    elements.recipeItems.insertAdjacentHTML('afterend', `<div class="pagination-buttons">
        ${createPageNavigationButtons(curPage, totPages)}
    </div>`);
}

export const clearRecipes = () => {
    while (elements.recipeItems.firstChild) {
        elements.recipeItems.removeChild(elements.recipeItems.lastChild);
    }
}

export const clearPaginationButtons = () => {
    let recipeListSection = elements.recipeListSection;

    if (elements.recipeListSection.querySelector(selectors.paginationButtons))
        elements.recipeListSection.removeChild(recipeListSection.querySelector(selectors.paginationButtons));
}

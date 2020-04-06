import * as utils from '../utils';

export const renderRecipeDetails = recipeObj => {
    const recipeDetailsTemplate = `
        <div class="recipe-image-container text-center">
            <img class="recipe-image" src="${recipeObj.recipeDetails.image_url}" alt="recipe-image">
        </div>
        <h3 class="primary-text text-center">${recipeObj.recipeDetails.title}</h3>
        <div class="servings-time">
            <h4 class="servings">
                Servings: 
                <span class="inc-button">+</span>
                <em class="servings-count secondary-text">${recipeObj.servings}</em>
                <span class="dec-button">-</span>
            </h4>
            <h4 class="time">
                Time: <em class="secondary-text">${recipeObj.time} Minutes</em>
            </h4>
            <h5 class="favourite primary-text">
                Add to favourites
            </h5>
        </div>
        <div class="recipe-ingredients">
            ${recipeObj.recipeDetails.ingredients.map(ing => 
               `<h5 class="ingredient">
                    <span class="ingredient-count secondary-text">${ing.count} </span> ${ing.unit} ${ing.ingredient}
                </h5>`
            ).join('')}
        </div>
        <div class="add-to-cart-button text-center">Add to cart</div>  
        <div class="cooking-directions">    
            <h3 class="direction-title primary-text text-center">How To Cook It</h3>
            <p class="text-center">This recipe was carefully designed and tested by ${recipeObj.recipeDetails.publisher}</p>
            <p class="text-center">Please checkout directions at their website</p>
            <div class="direction-button text-center">
                <a target="_blank" href="${recipeObj.recipeDetails.source_url}">Visit Publisher's Website</a>
            </div>  
        </div>
    `;
    utils.elements.recipeDetails.insertAdjacentHTML('beforeend', recipeDetailsTemplate);
}

export const clearRecipeDetails = () => {
    while (utils.elements.recipeDetails.firstChild) {
        utils.elements.recipeDetails.removeChild(utils.elements.recipeDetails.lastChild);
    }
}

export const updateRecipeDetails = recipe => {
    utils.elements.recipeDetails.querySelector(utils.selectors.servingsCount).textContent = recipe.servings;

    const allIngredientCounts = utils.elements.recipeDetails.querySelectorAll(utils.selectors.ingredientCount);
    Array.from(allIngredientCounts).forEach((el, i) => {
        el.textContent = recipe.recipeDetails.ingredients[i].count;
    });
}
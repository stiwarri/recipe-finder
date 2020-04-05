import * as utils from '../utils';

export const renderRecipeDetails = recipeObj => {
    const recipeDetailsTemplate = `
        <div class="recipe-image-container text-center">
            <img class="recipe-image" src="${recipeObj.recipeDetails.image_url}" alt="recipe-image">
        </div>
        <h3 class="primary-text text-center">${recipeObj.recipeDetails.title}</h3>
        <div class="servings-time">
            <h4 class="servings">
                Servings: <em class="primary-text">${recipeObj.servings}</em>
            </h4>
            <h4 class="time">
                Time: <em class="primary-text">${recipeObj.time} Minutes</em>
            </h4>
        </div>
        <div class="recipe-ingredients">
            ${recipeObj.recipeDetails.ingredients.map(ing => 
               `<h5 class="ingredient">
                    <span class="secondary-text">${ing.count} </span> ${ing.unit} ${ing.ingredient}
                </h5>`
            ).join('')}
        </div>
        <div class="add-to-cart-button text-center">Add to cart</div>  
    `;
    utils.elements.recipeDetails.insertAdjacentHTML('beforeend', recipeDetailsTemplate);
}

export const clearRecipeDetails = () => {
    while (utils.elements.recipeDetails.firstChild) {
        utils.elements.recipeDetails.removeChild(utils.elements.recipeDetails.lastChild);
    }
}

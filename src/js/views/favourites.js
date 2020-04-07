import * as utils from '../utils';

export const toggleFavouriteButton = numberOfFavouriteItems => {
    if (numberOfFavouriteItems) {
        utils.elements.favouriteButton.classList.remove('inactive');
    } else {
        utils.elements.favouriteButton.classList.add('inactive');
    }
}

export const changeFavouriteButtonText = operation => {
    const addRemoveFavouriteButton = utils.elements.recipeDetails.querySelector(utils.selectors.addRemoveFavouriteButton);

    if (operation === 'add') {
        addRemoveFavouriteButton.classList.replace('add-text', 'remove-text');
        addRemoveFavouriteButton.textContent = "Remove from favourites";
    } else {
        addRemoveFavouriteButton.classList.replace('remove-text', 'add-text');
        addRemoveFavouriteButton.textContent = "Add to favourites";
    }
}

export const updateFavouritesList = items => {
    while (utils.elements.favouriteList.firstChild) {
        utils.elements.favouriteList.removeChild(utils.elements.favouriteList.lastChild);
    }

    const favouriteItemsTemplate = items.map(el => `
        <li class="recipe">
            <a class="figure" href="#${el.id}">
                <div class="recipe-image">
                    <img src="${el.image}" alt="image">
                </div>
                <div class="recipe-brief">
                    <h5>${el.title}</h5>
                    <p>${el.publisher}</p>
                </div>
            </a>
        </li>
    `).join('');

    utils.elements.favouriteList.insertAdjacentHTML('beforeend', favouriteItemsTemplate);
}

export const toggleActiveClasses = () => {
    utils.elements.favouriteList.classList.toggle('inactive');
    utils.elements.favouriteButton.classList.toggle('active-button');
}
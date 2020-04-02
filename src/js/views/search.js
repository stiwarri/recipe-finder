import { debounce, textLimiter } from '../utils';
import { elements } from './base';

export const createAutoComplete = ({ root, placeholder, fetchData, renderItem, onItemSelect, setInputValue }) => {
    root.innerHTML = `
        <div class="search-bar">
            <input type="text" placeholder="${placeholder}">
        </div>
        <div class="auto-complete-list inactive"></div>
    `;

    const input = root.querySelector('input');

    const inputChangeHandler = async (event) => {
        const items = await fetchData(event.target.value);
        const autoCompleteList = root.querySelector('.auto-complete-list');
        autoCompleteList.classList.remove('inactive');
        while (autoCompleteList.firstChild) {
            autoCompleteList.removeChild(autoCompleteList.lastChild);
        }

        Array.from(items).forEach(item => {
            const autoCompleteItem = document.createElement('div');
            autoCompleteItem.classList.add('auto-complete-item');
            autoCompleteItem.innerHTML = renderItem(item);
            autoCompleteItem.addEventListener('click', () => {
                autoCompleteList.classList.add('inactive');
                input.value = setInputValue(item);
                onItemSelect(item);
            });
            autoCompleteList.appendChild(autoCompleteItem);
        });
    }

    input.addEventListener('input', debounce(inputChangeHandler, 500));
}

export const renderRecipes = recipes => {
    recipes.forEach(recipe => {
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
}

export const clearRecipes = () => {
    while (elements.recipeItems.firstChild) {
        elements.recipeItems.removeChild(elements.recipeItems.lastChild);
    }
}

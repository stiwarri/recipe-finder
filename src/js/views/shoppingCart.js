import * as utils from '../utils';

export const renderShoppingCartItems = cartItems => {
    const shoppingCartItemsTemplate = cartItems.map(item => `
        <li class="cart-item" data-id="${item.id}">
            <input type="number" class="item-count" value="${item.count ? item.count : '-'}" step="${item.count}" min="0.25">
            <div class="item-unit text-center">${item.unit ? item.unit : '-'}</div>
            <p class="item-ingredient">${item.ingredient ? item.ingredient : '-'}</p>
            <span class="delete-button">x</span>
        </li>
    `).join('');

    utils.elements.shoppingListSection.classList.remove('inactive');
    utils.elements.cartItems.insertAdjacentHTML('beforeend', shoppingCartItemsTemplate);
}

export const removeShoppingCartItem = itemId => {
    const itemToDelete = utils.elements.cartItems.querySelector(`[data-id="${itemId}"]`);
    itemToDelete.parentNode.removeChild(itemToDelete);
}

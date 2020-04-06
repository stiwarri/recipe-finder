import uniqid from 'uniqid';

export default class ShoppingCart {
    constructor() {
        this.items = [];
    }

    addItem = ({count, unit, ingredient}) => {
        const itemObj = {
            id: uniqid(),
            count,
            unit,
            ingredient
        }

        this.items.push(itemObj);
    }

    deleteItem = id => {
        const index = this.items.findIndex(item => item.id === id);
        this.items.splice(index, 1);
    }

    updateCount = (id, newCount) => {
        this.items.find(el => el.id === id).count = newCount;
    };
}
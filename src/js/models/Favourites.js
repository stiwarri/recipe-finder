export default class Favourites {
    constructor() {
        this.items = [];
    }

    addItemToFavourites = (id, title, publisher, image) => {
        const likedItemObj = {
            id, 
            title, 
            publisher, 
            image
        };
        this.items.push(likedItemObj);
        this.setFavouritesInLocalStorage();
    }

    removeItemFromFavourites = id => {
        const index = this.items.findIndex(el => el.id === id);
        this.items.splice(index, 1);
        this.setFavouritesInLocalStorage();
    }

    isFavourite = id => {
        return this.items.findIndex(el => el.id === id) !== -1;
    }

    setFavouritesInLocalStorage = () => {
        localStorage.setItem('favourites', JSON.stringify(this.items));
    }

    getFavouritesFromLocalStorage = () => {
        this.items = localStorage.getItem('favourites') ? JSON.parse(localStorage.getItem('favourites')) : [];
    }
}

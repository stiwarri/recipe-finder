import axios from 'axios';

export default class Recipe {
    constructor(recipeId) {
        this.recipeId = recipeId;
    }

    getRecipeDetails = async () => {
        const recipeDetails = await axios(`https://forkify-api.herokuapp.com/api/get?rId=${this.recipeId}`);
        this.recipeDetails = recipeDetails.data.recipe;
    }

    calculateTime = () => {
        const numIng = this.recipeDetails.ingredients.length;
        const periods = Math.ceil(numIng / 3);
        this.time = periods * 3;
    };

    calculateServings = () => {
        this.servings = 4;
    };

    parseIngredients = () => {
        const uniformUnits = [
            ['tablespoons', 'tbsp'],
            ['tablespoon', 'tbsp'],
            ['ounces', 'oz'],
            ['ounce', 'oz'],
            ['teaspoons', 'tsp'],
            ['teaspoon', 'tsp'],
            ['cups', 'cup'],
            ['pounds', 'pound'],
            ['kilograms', 'kg'],
            ['kilogram', 'kg'],
            ['grams', 'g'],
            ['gram', 'g'],
            ['ml', 'ml']
        ];
        const unitsMap = new Map(uniformUnits);
        const newIngredients = this.recipeDetails.ingredients.map(el => {
            let ingredient = el.toLowerCase();
            unitsMap.forEach((value, key) => {
                ingredient = ingredient.replace(key, value);
            });
            ingredient = ingredient.replace(/ *\([^)]*\) */g, ' ');

            const arrIng = ingredient.split(' ');
            const regExArr = arrIng[0].match(/[a-z]+|[^a-z]+/gi);
            if (regExArr && regExArr.length > 1) {
                arrIng.splice(0, 1, regExArr[0], regExArr[1])
            }

            const unitSet = new Set(unitsMap.values());
            const unitIndex = arrIng.findIndex(string => unitSet.has(string));
            let objIng;
            if (unitIndex > -1) {
                const arrCount = arrIng.slice(0, unitIndex);
                let count;
                if (arrCount.length === 1) {
                    count = eval(arrIng[0].replace('-', '+'));
                } else {
                    count = eval(arrIng.slice(0, unitIndex).join('+'));
                }
                objIng = {
                    count,
                    unit: arrIng[unitIndex],
                    ingredient: arrIng.slice(unitIndex + 1).join(' ')
                };
            } else if (parseInt(arrIng[0], 10)) {
                objIng = {
                    count: parseInt(arrIng[0], 10),
                    unit: '',
                    ingredient: arrIng.slice(1).join(' ')
                }
            } else if (ingredient === -1 || ingredient === " ") {
                objIng = {
                    count: '',
                    unit: '',
                    ingredient: ''
                }
            } else if (unitIndex === -1) {
                objIng = {
                    count: 1,
                    unit: '',
                    ingredient
                }
            }
            return objIng;
        });
        this.recipeDetails.ingredients = newIngredients;
    };
}
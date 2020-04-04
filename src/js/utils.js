export const elements = {
    recipeListSection: document.getElementById('recipe-list-section'),
    recipeSearchInput: document.getElementById('recipe-search-input'),
    recipeItems: document.querySelector('.recipe-items'),
    autoCompletes: document.querySelectorAll('.auto-complete')
};

export const selectors = {
    input: 'input',
    autoCompleteList: '.auto-complete-list',
    paginationButtons: '.pagination-buttons',
    nextPaginationButton: '.next-page-nav-button',
    prevPaginationButton: '.prev-page-nav-button'
};

export const createAutoComplete = ({
    root,
    placeholder,
    fetchData,
    renderItem,
    onItemSelect,
    setInputValue
}) => {
    root.innerHTML = `
        <div class="search-bar">
            <input type="text" placeholder="${placeholder}">
        </div>
        <div class="auto-complete-list inactive"></div>
    `;

    const input = root.querySelector(selectors.input);

    const inputChangeHandler = async (event) => {
        const items = await fetchData(event.target.value);
        const autoCompleteList = root.querySelector(selectors.autoCompleteList);
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

export const debounce = (func, delay = 1000) => {
    let timeout;
    return (...args) => {
        if (timeout) {
            clearTimeout(timeout);
        }
        timeout = setTimeout(() => {
            func.apply(null, args);
        }, delay);
    }
}

export const textLimiter = (text, limit = 20) => {
    if (text.length > limit) {
        const newArr = [];
        text.split(' ').reduce((acc, cur) => {
            if (acc + cur.length <= limit) {
                newArr.push(cur);
            }
            return acc + cur.length;
        }, 0);

        return `${newArr.join(' ')} ...`;
    }
    return text;
}

export const showLoader = targetEl => {
    const loader = `
        <div class="loader"></div>
    `;
    targetEl.insertAdjacentHTML('afterbegin', loader);
}

export const hideLoader = targetEl => {
    const loader = targetEl.querySelector('.loader');
    targetEl.removeChild(loader);
}

export const createPageNavigationButtons = (curPage, totPage) => {
    if (curPage === 1) {
        return `
            <div class="next-page-nav-button next" data-goto="${curPage + 1}">Next >></div>
        `;
    } else if (curPage === totPage) {
        return `
            <div class="prev-page-nav-button prev" data-goto="${curPage - 1}"><< Prev</div>
        `;
    } else {
        return `
            <div class="next-page-nav-button next" data-goto="${curPage + 1}">Next >></div>
            <div class="prev-page-nav-button prev" data-goto="${curPage - 1}"><< Prev</div>
        `;
    }
}

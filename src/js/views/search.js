import { debounce } from '../utils';

export const createAutoComplete = ({ root, placeholder, fetchData, renderItem, onItemSelect, setInputValue }) => {
    root.innerHTML = `
        <div class="search-bar">
            <input type="text" placeholder="${placeholder}">
        </div>
        <div class="auto-complete-list inactive-list"></div>
    `;

    const input = root.querySelector('input');

    const inputChangeHandler = async (event) => {
        const items = await fetchData(event.target.value);
        const autoCompleteList = document.querySelector('.auto-complete-list');
        autoCompleteList.classList.remove('inactive-list');
        while (autoCompleteList.firstChild) {
            autoCompleteList.removeChild(autoCompleteList.lastChild);
        }

        Array.from(items).forEach(item => {
            const autoCompleteItem = document.createElement('div');
            autoCompleteItem.classList.add('auto-complete-item');
            autoCompleteItem.innerHTML = renderItem(item);
            autoCompleteItem.addEventListener('click', () => {
                input.value = setInputValue(item);
                onItemSelect(item);
            });
            autoCompleteList.appendChild(autoCompleteItem);
        });
    }

    input.addEventListener('input', debounce(inputChangeHandler, 500));
}

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
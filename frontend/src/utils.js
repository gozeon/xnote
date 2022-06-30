export const shortId = () => Math.random().toString(36).substring(2) + Date.now().toString(36);

export const emptyEl = el => {
    while (el.firstChild)
        el.removeChild(el.firstChild);
}

export const loadScript = (src) => new Promise((resolve, reject) => {
    const exist = document.querySelector(`script[src="${src}"]`)
    if(exist) {
        resolve()
        return
    }

    const s = document.createElement('script');
    s.setAttribute('src', src);
    s.setAttribute('data-type', 'cdn');
    s.onload = resolve;
    s.onerror = reject
    document.head.appendChild(s);
})

/**
 * https://developer.mozilla.org/en-US/docs/Glossary/Base64
 * @param {*} str 
 * @returns 
 */
export const hash = str => {
    return btoa(encodeURIComponent(str))
}
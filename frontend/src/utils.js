export const shortId = () => Math.random().toString(36).substring(2) + Date.now().toString(36);

export const emptyEl = el => {
    while(el.firstChild)
        el.removeChild(el.firstChild);
}




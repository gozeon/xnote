import './style.css'

export class NavView {
    constructor(root) {
        this.root = root

        this.el = document.createElement('div')
        this.el.textContent = 'nav'

        return this.el
    }
}
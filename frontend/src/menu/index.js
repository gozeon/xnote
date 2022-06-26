import { EventsEmit } from '../../wailsjs/runtime/runtime'
import { shortId } from '../utils'
import './style.css'

export class Menu {
    constructor(root) {
        this.root = root

        this.el = document.createElement('div')
        this.el.id = 'menu'
        this.render()
    }

    render() {
        this.root.appendChild(this.el)
    }

    appendItem(text, actived=false) {
        const id = shortId()
        const el = document.createElement('div')

        el.className = 'menu-item'
        el.textContent = text
        el.id = id

        el.addEventListener('click', e => {
            this.activeItem(e.target.id)
            EventsEmit('menuChange', {id: e.target.id, text, e})
        }, true)

        this.el.appendChild(el)

        if(actived) {
            this.activeItem(id)
        }

        return id
    }

    activeItem(id) {
        this.activeId = id
        this.el.querySelectorAll('.menu-item').forEach(el => {
            
            if(el.id === id) {
                el.classList.add('active')
            } else {
                el.classList.remove('active')
            }
        })
    }


}
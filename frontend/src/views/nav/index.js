import { LoadData, OpenDataFile } from '../../../wailsjs/go/main/App'
import { BrowserOpenURL } from '../../../wailsjs/runtime/runtime'
import './style.css'

export class NavView {
    constructor(root) {
        this.root = root
        this.jsonFile = 'nav.json'

        this.el = document.createElement('div')
        this.el.id = 'navView'

        this.el.appendChild(this.editBtn())

        this.render()
        return this.el
    }

    render() {
        LoadData(this.jsonFile).then(res => {
            if(res.hasOwnProperty('data')) {
                for(let g of res?.data) {
                    this.el.appendChild(this.appendGroup(g))
                }
            }
            
        }).catch(err => alert(err))
    }

    editBtn() {
        const btn = document.createElement('div')
        btn.classList.add("edit-btn")
        btn.textContent = 'EDIT'
        btn.addEventListener('click', () => {
            OpenDataFile(this.jsonFile).catch(err=>{
                alert(err)
            })
        })
        return btn
    }

    appendGroup({category, links}) {
        const wraper = document.createElement('div')

        const categoryEl = document.createElement('h2')
        categoryEl.textContent = category
        categoryEl.dataset.name = category
        wraper.appendChild(categoryEl)

        const grid = document.createElement('div')
        grid.classList.add('grid')
        for(let link of links) {
            grid.appendChild(this.createLink(link))
        }

        wraper.appendChild(grid)

        return wraper
    }

    createLink(link) {
        const el = document.createElement('div')
        el.textContent = link.title
        el.setAttribute('url', link.url)
        el.addEventListener('click', () => BrowserOpenURL(link.url), true)

        return el
    }
}
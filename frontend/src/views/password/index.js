import { DeletePassword, InsterPassword, ListPassword } from '../../../wailsjs/go/main/App'
import { shortId, emptyEl } from '../../utils'
import './style.css'
export class PasswordView {
    constructor(root) {
        this.root = root
        this.el = document.createElement('div')
        this.el.id = 'password'

        this.initSearch()
        const box = document.createElement('div')
        box.classList.add('box')
        this.box = box
        this.el.appendChild(box)
        this.fetch()
        return this.el
    }

    fetch() {
        ListPassword().then(d => {
            emptyEl(this.box)
            for (let item of d) {
                const u = document.createElement('div')
                u.textContent = item.name
                u.dataset.pwd = item.password

                const btnGroup = document.createElement('div')
                const copyBtn = document.createElement('button')
                copyBtn.textContent = "Copy"
                btnGroup.appendChild(copyBtn)
                copyBtn.addEventListener('click', e => {
                    this.copy(item.password)
                })

                const delBtn = document.createElement('button')
                delBtn.textContent = "Del"
                btnGroup.appendChild(delBtn)
                delBtn.addEventListener('click', e => {
                    DeletePassword(item).then(() => this.fetch()).catch(err => alert(err))
                })

                u.appendChild(btnGroup)

                this.box.appendChild(u)
            }
        }).catch(e => alert(e))
    }

    initSearch() {
        const searchBox = document.createElement('form')
        searchBox.classList.add('searchbox')
        searchBox.addEventListener('submit', e => {
            e.preventDefault()
            const formData = new FormData(e.target);
            const formProps = Object.fromEntries(formData);
            InsterPassword({
                ...formProps,
                id: shortId()
            }).then(() => {
                this.fetch()
            }).catch(err => alert(err))
        })
        const nameInput = document.createElement('input')
        nameInput.placeholder = "用户名"
        nameInput.setAttribute('required', true)
        nameInput.setAttribute('name', 'name')
        searchBox.appendChild(nameInput)

        const pwdInput = document.createElement('input')
        pwdInput.placeholder = "密码"
        pwdInput.setAttribute('required', true)
        pwdInput.setAttribute('name', 'password')
        searchBox.appendChild(pwdInput)

        const newBtn = document.createElement('button')
        newBtn.textContent = "添加"
        searchBox.appendChild(newBtn)


        this.el.appendChild(searchBox)
    }

    copy(text) {
        navigator.clipboard.writeText(text).then(() => alert('复制成功'), err => alert(err));
    }
}

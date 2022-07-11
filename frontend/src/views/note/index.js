import tinymce from 'tinymce'
import { UpdateOrInsertNote } from '../../../wailsjs/go/main/App'
import './style.css'

export class NoteView {
    constructor(root) {
        this.root = root

        this.el = document.createElement('div')
        this.el.id = 'noteView'

        const left = document.createElement('div')
        left.classList.add('left')
        // this.el.appendChild(left)

        const right = document.createElement('div')
        right.classList.add('right')
        
        const editorForm = document.createElement('form')
        const editor = document.createElement('textarea')
        editor.id = 'editor'
        editorForm.appendChild(editor)

        editorForm.onsubmit = e => {
            const content = tinymce.activeEditor.getContent()
            UpdateOrInsertNote({
                id: 'note',
                content: content
            }).then(() => console.log('done')).catch(e => alert(e))
            return false
        }
        right.appendChild(editorForm)
        this.el.appendChild(right)


        this.mockData = [
            {
                name: "a",
                content: "a"
            },
            {
                name: "b",
                content: 'b'
            }
        ]

        this.mockData.forEach(d => {
            const name = document.createElement('div')
            name.textContent = d.name
            name.classList.add('name')

            name.addEventListener('click', e => {
                document.querySelectorAll('.name').forEach(i => {
                    i.classList.remove('active')
                })

                name.classList.add('active')
            })

            left.appendChild(name)
        })

        return this.el
    }

}

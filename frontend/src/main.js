import './style.css';

import './key'

import {Menu} from './menu'
import { EventsOn } from '../wailsjs/runtime/runtime';
import { Container } from './container';
import { NavView } from './views/nav';
import { PasswordView } from './views/password';
import { NoteView } from './views/note';
import { EditorInit } from './editor';
import eventbus from './eventbus';
import tinymce from 'tinymce';
import { UpdateOrInsertNote } from '../wailsjs/go/main/App';

const root = document.querySelector('#app')
const menu = new Menu(root)
window.container = new Container(root)

const defaultId = menu.appendItem("导航页", true)
container.setView(defaultId, new NavView())

container.setView(menu.appendItem("密码本"), new PasswordView())

container.setView(menu.appendItem("笔记本"), new NoteView())

let autoSave = null
eventbus.on('viewChange', () => {
    const editor = document.querySelector('#editor')
    if(editor) {
        EditorInit('#editor')
        if(autoSave) {
            clearInterval(autoSave)
        }
        autoSave = setInterval(() => {
            UpdateOrInsertNote({
                id: 'note',
                content: tinymce.activeEditor.getContent()
            }).then(() => console.log('auto save')).catch(e => alert(e))
        }, 1800)
    } else {
        clearInterval(autoSave)
    }

})


const cacheActiveId = sessionStorage.getItem('activeId')
if(cacheActiveId){
    menu.activeItem(cacheActiveId)
    container.activeView(cacheActiveId)
} else {
    container.activeView(defaultId)
}

EventsOn('menuChange', () => {
    sessionStorage.setItem('activeId', menu.activeId)
    container.activeView(menu.activeId)
})

import './style.css';

import './key'

import {Menu} from './menu'
import { EventsOn } from '../wailsjs/runtime/runtime';
import { Container } from './container';
import { NavView } from './views/nav';
import { PasswordView } from './views/password';

const root = document.querySelector('#app')
const menu = new Menu(root)
window.container = new Container(root)

const defaultId = menu.appendItem("导航页", true)
container.setView(defaultId, new NavView())

container.setView(menu.appendItem("密码本"), new PasswordView())

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
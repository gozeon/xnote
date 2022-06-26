import './style.css';

import logo from './assets/images/logo-universal.png';
import {Greet} from '../wailsjs/go/main/App';

import {Menu} from './menu'
import { EventsOn, LogDebug } from '../wailsjs/runtime/runtime';
import { Container } from './container';
import { NavView } from './views/nav';

const root = document.querySelector('#app')
const menu = new Menu(root)
const container = new Container(root)
console.log(new NavView())

const defaultId = menu.appendItem("导航页", true)
container.setView(defaultId, new NavView())


container.activeView(defaultId)

EventsOn('menuChange', () => {
    container.activeView(menu.activeId)
})

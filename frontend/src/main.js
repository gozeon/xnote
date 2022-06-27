import './style.css';

import './key'

import {Menu} from './menu'
import { EventsOn, LogDebug } from '../wailsjs/runtime/runtime';
import { Container } from './container';
import { NavView } from './views/nav';
import { LoadData } from '../wailsjs/go/main/App';

const root = document.querySelector('#app')
const menu = new Menu(root)
const container = new Container(root)

const defaultId = menu.appendItem("导航页", true)
container.setView(defaultId, new NavView())


container.activeView(defaultId)

EventsOn('menuChange', () => {
    container.activeView(menu.activeId)
})
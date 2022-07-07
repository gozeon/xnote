import { EventsEmit } from "../../wailsjs/runtime/runtime";
import eventbus from "../eventbus";
import { emptyEl } from "../utils";
import "./style.css";

export class Container {
  constructor(root) {
    this.root = root;
    this.views = new Map();

    this.el = document.createElement("div");
    this.el.id = "container";

    this.render();
  }

  render() {
    this.root.appendChild(this.el);
  }

  setView(id, view) {
    this.views.set(id, view);
  }

  activeView(id) {
    const exist = this.views.has(id);
    if (exist) {
      const view = this.views.get(id)
      emptyEl(this.el)
      this.el.appendChild(view)
      eventbus.emit("viewChange", {view})
    }
  }
}

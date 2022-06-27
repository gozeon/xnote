import { WindowReloadApp } from "../wailsjs/runtime/runtime";

document.addEventListener("keypress", function onPress(event) {
    if (event.code === "KeyR" && event.ctrlKey) {
        WindowReloadApp()
    }
});
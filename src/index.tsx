import * as React from "react";
import * as ReactDOM from "react-dom";

import { App } from "./components/App";
import "./styles/style.scss";

ReactDOM.render(<App />, document.getElementById("root"));

if ('serviceWorker' in navigator) {
    window.addEventListener("load", (): void => {
        navigator.serviceWorker
            .register('./src/service_worker.js')
            .then(reg => console.log(reg))
            .catch(err => console.log(err))
    })
}
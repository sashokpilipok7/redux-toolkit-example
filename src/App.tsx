import "./styles.css";
import { Provider } from "react-redux";

import store from "./store";
import Component from "./Component";

export default function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <h1>Hello CodeSandbox</h1>
        <h2>Start editing to see some magic happen!</h2>
        <Component />
      </div>
    </Provider>
  );
}

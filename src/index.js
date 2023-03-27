import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import keycloak, { initialize } from "./keycloak";
import Loading from "./components/loading/Loading";
import reportWebVitals from './reportWebVitals';
import { checkForUser } from './api/user'
import store from './redux-parts/store';
import { Provider } from "react-redux";

const root = ReactDOM.createRoot(document.getElementById("root"));

// Display a loading screen when connecting to Keycloak
root.render(<Loading message="Connecting to Keycloak..." />)

// Initialize Keycloak
initialize()
  .then(() => { // If No Keycloak Error occurred - Display the App
    keycloak.authenticated?checkForUser(keycloak.tokenParsed.sub):console.log('not logged in')
    root.render(
      <React.StrictMode>
        <Provider store= {store}>
          <App /> 
        </Provider> 
      </React.StrictMode>
    );
  })
  .catch(() => {
    root.render(
      <React.StrictMode>
        <p>Could Not Connect To Keycloak.</p>
      </React.StrictMode>
    );
  });
reportWebVitals();

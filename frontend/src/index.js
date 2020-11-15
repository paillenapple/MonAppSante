import React from "react";
import ReactDOM from "react-dom";

import { Provider } from "react-redux";
import { persistStore } from "redux-persist";
import { PersistGate } from "redux-persist/integration/react";
import store from "./app/store";

import App from "./App";

import Loader from "./components/business-components/Loader";
import ToastContainer from "./components/business-components/ToastContainer";

import "./styles/index.css";
import 'react-toastify/dist/ReactToastify.css';

let persistor = persistStore(store);

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={<Loader />} persistor={persistor}>
        <App />
        <ToastContainer />
      </PersistGate>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

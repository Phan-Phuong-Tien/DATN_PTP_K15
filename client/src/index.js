import React from "react";
import App from "./App";
import { createRoot } from "react-dom/client";
import "swiper/css/bundle";
import "styles/index.scss";
import "react-toastify/dist/ReactToastify.css";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { store } from "redux/store";
import reportWebVitals from "./reportWebVitals";
import { Slide, ToastContainer } from "react-toastify";

const container = document.getElementById("root");
const root = createRoot(container);

root.render(
  <BrowserRouter>
    <Provider store={store}>
      <App />
      <ToastContainer transition={Slide} />
    </Provider>
  </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

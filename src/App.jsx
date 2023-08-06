import React, { useLayoutEffect, useEffect } from "react";
import { observer } from "mobx-react";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import { useTranslation } from "react-i18next";

import { Main } from "./pages/Main";
import { pageStore } from "./store/pageStore";

import "../src/lib/i18n";
import "./App.less";

const defineVariableHeight = () => {
  let vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty("--vh", `${vh}px`);
};

window.addEventListener("resize", defineVariableHeight);

const App = observer(() => {
  const { i18n } = useTranslation();

  useLayoutEffect(() => {
    // Define variable height
    defineVariableHeight();
  }, []);

  useEffect(() => {
    if (pageStore.language === "fr-FR") {
      i18n.changeLanguage("fr-FR");
    } else if (pageStore.language === "de-DE") {
      i18n.changeLanguage("de-DE");
    } else {
      i18n.changeLanguage("en-US");
    }
  }, [pageStore.language, i18n]);

  const router = createBrowserRouter(
    createRoutesFromElements(<Route path="/" element={<Main />}></Route>)
  );

  return (
    <div className="App">
      <div className="main">
        <RouterProvider router={router} />
      </div>
    </div>
  );
});

export default App;

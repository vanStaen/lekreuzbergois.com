import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { observer } from "mobx-react-lite";
import { Switch } from "antd";

import { pageStore } from "../../store/pageStore";

import "./ShowSensibleSlider.less";

export const ShowSensibleSlider = observer(() => {
  const { t } = useTranslation();
  const [isShown, setIsShown] = useState();

  const slideHandler = (value) => {
    const mainContainerElement = document.getElementById("mainContainer");
    const noisyBackGroundElement = document.getElementById("noisyBackGround");
    const mainTitleElement = document.getElementById("mainTitle");
    if (value) {
      mainContainerElement.style.backgroundColor = "#151515";
      noisyBackGroundElement.style.visibility = "visible";
      mainTitleElement.style.color = "white";
    } else {
      mainContainerElement.style.backgroundColor = "transparent";
      noisyBackGroundElement.style.visibility = "hidden";
      mainTitleElement.style.color = "black";
    }
    pageStore.setShowSensiblePictures(value);
    setIsShown(value);
  };

  return (
    <div className="showSensibleContainer">
      <div className="showSensibleText">
        {isShown ? t("gallery.hide") : t("gallery.show")}{" "}
        {t("gallery.explicitPictures")}
      </div>
      <Switch
        size="small"
        style={{
          backgroundColor: isShown
            ? "rgba(255, 0, 0, .5)"
            : "rgba(255, 255, 255, .25)",
        }}
        defaultChecked={pageStore.setShowSensiblePictures}
        onChange={slideHandler}
      />
    </div>
  );
});

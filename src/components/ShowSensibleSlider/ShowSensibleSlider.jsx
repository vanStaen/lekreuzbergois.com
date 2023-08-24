import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { observer } from "mobx-react-lite";
import { Switch } from "antd";

import { pageStore } from "../../store/pageStore";

import "./ShowSensibleSlider.less";

export const ShowSensibleSlider = observer(() => {
  const { t } = useTranslation();
  const [isShown, setIsShown] = useState();

  const slideHandler = (value) => {
    if (value) {
      pageStore.setShowPinInput(value);
    } else {
      pageStore.setShowSensiblePictures(false);
    }
  };

  useEffect(() => {
    console.log('isShow')
    const mainContainerElement = document.getElementById("mainContainer");
    const noisyBackGroundElement = document.getElementById("noisyBackGround");
    const mainTitleElement = document.getElementById("mainTitle");
    if (pageStore.showSensiblePictures) {
      mainContainerElement.style.backgroundColor = "#000";
      noisyBackGroundElement.style.visibility = "visible";
      if (mainTitleElement) { mainTitleElement.style.color = "white" };
    } else {
      mainContainerElement.style.backgroundColor = "transparent";
      noisyBackGroundElement.style.visibility = "hidden";
      if (mainTitleElement) { mainTitleElement.style.color = "black" };
    }
    setIsShown(pageStore.showSensiblePictures);
  }, [pageStore.showSensiblePictures])

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
        defaultChecked={pageStore.showSensiblePictures}
        checked={pageStore.showSensiblePictures}
        onChange={slideHandler}
      />
    </div>
  );
});

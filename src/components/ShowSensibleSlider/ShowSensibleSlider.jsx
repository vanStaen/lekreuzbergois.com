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
    const mainContainerElement = document.getElementById("mainContainer");
    if (pageStore.showSensiblePictures) {
      mainContainerElement.style.backgroundColor = "rgba(21,21,21,1)";
    } else {
      mainContainerElement.style.backgroundColor = "transparent";
    }
    setIsShown(pageStore.showSensiblePictures);
  }, [pageStore.showSensiblePictures])

  return (
    <div className="showSensibleContainer">
      <div className="showSensibleText">
        {isShown ? t("gallery.hideExplicit") : t("gallery.showExplicit")}
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

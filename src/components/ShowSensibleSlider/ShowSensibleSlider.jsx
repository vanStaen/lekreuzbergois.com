import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { observer } from "mobx-react-lite";
import { Switch } from "antd";

import { pageStore } from "../../store/pageStore";

import "./ShowSensibleSlider.less";

const pinProtected = false;

export const ShowSensibleSlider = observer(() => {
  const { t } = useTranslation();
  const [isShown, setIsShown] = useState();

  const slideHandler = (value) => {
    if (value) {
      if (pinProtected) {
        pageStore.setShowPinInput(value);
      } else {
        pageStore.setShowSensiblePictures(true);
      }
    } else {
      pageStore.setShowSensiblePictures(false);
    }
  };

  useEffect(() => {
    if (pageStore.showSensiblePictures) {
      document.body.style.backgroundColor = "#212121";
    } else {
      document.body.style.backgroundColor = "#282d2c";
    }
    setIsShown(pageStore.showSensiblePictures);
  }, [pageStore.showSensiblePictures]);

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

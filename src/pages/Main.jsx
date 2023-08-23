import React, { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { observer } from "mobx-react-lite";

import { ShowSensibleSlider } from "../components/ShowSensibleSlider/ShowSensibleSlider";
import { Title } from "../components/Title/Title";
import { Gallery } from "../components/Gallery/Gallery";

import "./Main.less";

export const Main = observer(() => {

  const handleOnScroll = (e) => {
    //TODO
    //console.log(e.deltaX);
  };

  useEffect(() => {
    document.addEventListener("wheel", handleOnScroll);
    return () => {
      document.removeEventListener("wheel", handleOnScroll);
    };
  }, [handleOnScroll]);

  return (
    <div className="mainContainer" id="mainContainer">
      <div className="noisyBackGround" id="noisyBackGround"></div>
      {/*<Title showOverlay={showOverlay} />*/}
      <ShowSensibleSlider />
      <Gallery />
    </div>
  );
});

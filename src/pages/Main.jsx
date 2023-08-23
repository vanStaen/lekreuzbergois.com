import React, { useEffect, useState } from "react";
import { observer } from "mobx-react-lite";

import { ShowSensibleSlider } from "../components/ShowSensibleSlider/ShowSensibleSlider";
import { Title } from "../components/Title/Title";
import { Gallery } from "../components/Gallery/Gallery";
import { GalleryMobile } from "../components/Gallery/GalleryMobile";
import { isMobileCheck } from "../helpers/checkMobileTablet";

import "./Main.less"

const THRESHOLD_IN_PX_BEFORE_SHOWING_MOBILE_GALLERY = 690;

export const Main = observer(() => {
  const [showMobileVersion, setShowMobileVersion] = useState(isMobileCheck());

  const checkIfSmallScreen = () => {
    if (window.innerWidth < THRESHOLD_IN_PX_BEFORE_SHOWING_MOBILE_GALLERY || isMobileCheck()) {
      setShowMobileVersion(true);
    } else {
      setShowMobileVersion(false);
    }
  };

  const handleOnScroll = (e) => {
    //TODO
    //console.log(e.deltaX);
  };

  useEffect(() => {
    window.addEventListener("resize", checkIfSmallScreen);
    document.addEventListener("wheel", handleOnScroll);
    return () => {
      window.removeEventListener('resize', checkIfSmallScreen);
      document.removeEventListener("wheel", handleOnScroll);
    };
  }, [checkIfSmallScreen, handleOnScroll])


  return (
    <div className="mainContainer" id="mainContainer">
      <div className="noisyBackGround" id="noisyBackGround"></div>
      {/*<Title showOverlay={showOverlay} />*/}
      <ShowSensibleSlider />
      {showMobileVersion ? <GalleryMobile /> : <Gallery />}
    </div>
  );
});

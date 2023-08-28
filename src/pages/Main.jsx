import React, { useEffect, useState } from "react";
import { observer } from "mobx-react-lite";

import { ShowSensibleSlider } from "../components/ShowSensibleSlider/ShowSensibleSlider";
import { Gallery } from "../components/Gallery/Gallery";
import { GalleryMobile } from "../components/Gallery/GalleryMobile";
import { isMobileCheck } from "../helpers/checkMobileTablet";

import "./Main.less";

const THRESHOLD_IN_PX_BEFORE_SHOWING_MOBILE_GALLERY = 690;

export const Main = observer(() => {
  const [showMobileVersion, setShowMobileVersion] = useState(
    isMobileCheck() ||
      window.innerWidth < THRESHOLD_IN_PX_BEFORE_SHOWING_MOBILE_GALLERY
  );

  const checkIfSmallScreen = () => {
    if (
      window.innerWidth < THRESHOLD_IN_PX_BEFORE_SHOWING_MOBILE_GALLERY ||
      isMobileCheck()
    ) {
      setShowMobileVersion(true);
    } else {
      setShowMobileVersion(false);
    }
  };

  useEffect(() => {
    window.addEventListener("resize", checkIfSmallScreen);
    return () => {
      window.removeEventListener("resize", checkIfSmallScreen);
    };
  }, [checkIfSmallScreen]);

  return (
    <div
      className="mainContainer"
      id="mainContainer"
      style={{ minHeight: window.innerHeight }}
    >
      <ShowSensibleSlider />
      {showMobileVersion ? <GalleryMobile /> : <Gallery />}
    </div>
  );
});

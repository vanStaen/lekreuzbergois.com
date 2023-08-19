import React, { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { LoadingOutlined } from "@ant-design/icons";
import { observer } from "mobx-react-lite";
import { Spin } from "antd";

import { ShowSensibleSlider } from "../components/ShowSensibleSlider/ShowSensibleSlider";
import { pageStore } from "../store/pageStore";
import { pictureStore } from "../store/pictureStore";
import { Overlay } from "../components/Overlay/Overlay";
import { Title } from "../components/Title/Title";

import useImage from "../helpers/useImage";

import "./Main.less";

export const Main = observer(() => {
  const [imageDesc, setImageDesc] = useState(false);
  const [showOverlay, setShowOverlay] = useState(false);
  const track = document.getElementById("image-track");
  const mouseDownAt = useRef(0);
  const prevPercentage = useRef(0);
  const percentage = useRef(0);
  const { t } = useTranslation();

  const elementForCursor = document.getElementById("image-container");

  const handleOnDown = (e) => {
    mouseDownAt.current = e.clientX;
    elementForCursor.style.cursor = "grabbing";
  };

  const handleOnUp = () => {
    mouseDownAt.current = 0;
    prevPercentage.current = percentage.current;
    elementForCursor.style.cursor = "grab";
  };

  const handleOnMove = (e) => {
    if (mouseDownAt.current === 0) return;

    const mouseDelta = parseFloat(mouseDownAt.current) - e.clientX,
      maxDelta = window.innerWidth / 2;

    const result = (mouseDelta / maxDelta) * -100,
      nextPercentageUnconstrained = parseFloat(prevPercentage.current) + result,
      nextPercentage = Math.max(Math.min(nextPercentageUnconstrained, 0), -100);

    percentage.current = nextPercentage;

    track.animate(
      {
        transform: `translate(${nextPercentage}%, -50%)`,
      },
      { duration: 1200, fill: "forwards" }
    );

    for (const image of track.getElementsByClassName("image")) {
      image.animate(
        {
          objectPosition: `${100 + nextPercentage}% center`,
        },
        { duration: 1200, fill: "forwards" }
      );
    }
  };

  const handleOnScroll = (e) => {
    //TODO
    //console.log(e.deltaX);
  };

  window.onmousedown = (e) => handleOnDown(e);
  window.onmouseup = (e) => handleOnUp(e);
  window.onmousemove = (e) => handleOnMove(e);
  //TODO
  //window.ontouchstart = (e) => handleOnDown(e.touches[0]);
  //window.ontouchend = (e) => handleOnUp(e.touches[0]);
  //window.ontouchmove = (e) => handleOnMove(e.touches[0]);

  useEffect(() => {
    document.addEventListener("wheel", handleOnScroll);
    return () => {
      document.removeEventListener("wheel", handleOnScroll);
    };
  }, [handleOnScroll]);

  const handleMouseOver = (desc, year) => {
    const formatedDesc = (
      <div>
        {desc}
        <span className="imageDescriptionSeparator"> | </span>
        {year}
        <div className="imageDescriptionInfoOpen">
          {t("gallery.doubleClickToExpend")}
        </div>
      </div>
    );
    setImageDesc(formatedDesc);
  };

  const handleMouseLeave = () => {
    setImageDesc(null);
  };

  const handleDoubleClick = async (pictureId) => {
    await pictureStore.setSelectedPicture(pictureId);
    setShowOverlay(true);
  };

  const picturesFormatted = pictureStore.pictures.map((picture) => {
    const { loading, image } = useImage(
      picture.name,
      "img/thumbs",
      picture.imgtype
    );

    return (
      <div
        className="imageContainer"
        onMouseOver={() => handleMouseOver(picture.desc, picture.year)}
        onMouseLeave={handleMouseLeave}
        onDoubleClick={() => handleDoubleClick(picture.id)}
      >
        {loading ? (
          <Spin
            indicator={<LoadingOutlined spin />}
            size="large"
            className="imageLoading"
          />
        ) : (
          <img
            className={`image ${
              !pageStore.showSensiblePictures &&
              picture.explicit &&
              "imageSensible"
            } ${
              pageStore.showSensiblePictures &&
              !picture.explicit &&
              "imageSensible"
            }`}
            src={image}
            draggable="false"
          />
        )}
      </div>
    );
  });

  return (
    <div className="mainContainer" id="mainContainer">
      <div className="noisyBackGround" id="noisyBackGround"></div>
      <Title showOverlay={showOverlay} />
      {showOverlay && <Overlay setShowOverlay={setShowOverlay} />}
      <ShowSensibleSlider />
      <div className="image-container" id="image-container">
        <div id="image-track">{picturesFormatted}</div>
      </div>
      {imageDesc && <div className="imageDescription">{imageDesc}</div>}
    </div>
  );
});

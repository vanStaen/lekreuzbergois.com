import React, { useState, useEffect, useRef } from "react";
import {
  LeftOutlined,
  RightOutlined,
  CloseOutlined,
  LoadingOutlined,
  LinkOutlined,
} from "@ant-design/icons";
import { observer } from "mobx-react";
import { Tooltip } from "antd";

import useImage from "../../helpers/useImage";
import { pictureStore } from "../../store/pictureStore.js";

import "./Overlay.less";

export const Overlay = observer((props) => {
  const [imageLoaded, setImageLoaded] = useState(null);
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);
  const [windowInnerHeight, setWindowInnerHeight] = useState(window.innerHeight)
  const throttling = useRef(false);

  // the required distance between touchStart and touchEnd to be detected as a swipe
  const minSwipeDistance = 50;

  const onTouchStart = (e) => {
    setTouchEnd(null); // otherwise the swipe is fired even with usual touch events
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e) => setTouchEnd(e.targetTouches[0].clientX);

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;
    if (throttling.current === false) {
      throttling.current = true;
      if (isRightSwipe) {
        pictureStore.browsePicture(false);
      } else if (isLeftSwipe) {
        pictureStore.browsePicture(true);
      }
      setTimeout(() => {
        throttling.current = false;
      }, 500);
    }
  };

  const selected = pictureStore.selectedPicture;
  const { image } = useImage(selected.name, "img", selected.imgtype);

  const loadImage = async (image) => {
    setImageLoaded(null);
    const isloaded = new Promise((resolve, reject) => {
      const loadImg = new Image();
      loadImg.src = image;
      loadImg.onload = () => resolve(image.url);
      loadImg.onerror = (err) => reject(err);
    });
    await isloaded;
    setImageLoaded(image);
    pictureStore.setIsPictureLoading(false);
  };

  useEffect(() => {
    selected && image && loadImage(image);
  }, [selected, image]);

  const mouseHoverHandler = (hover) => {
    const closeButton = document.getElementById(`closeButton`);
    if (hover) {
      closeButton.style.visibility = "hidden";
      closeButton.style.opacity = 0;
    } else {
      closeButton.style.visibility = "visible";
      closeButton.style.opacity = 1;
    }
  };

  const keyDownHandler = (event) => {
    event.preventDefault();
    const keyPressed = event.key.toLowerCase();
    const nextButton = document.getElementById(`nextButton`);
    const previousButton = document.getElementById(`previousButton`);
    if (throttling.current === false) {
      throttling.current = true;
      if (keyPressed === "arrowdown" || keyPressed === "arrowright") {
        nextButton.style.backgroundColor = "rgba(255,255,255,.15)";
        pictureStore.browsePicture(true);
        setTimeout(() => {
          nextButton.style.backgroundColor = "rgba(255,255,255, 0)";
        }, 100);
      } else if (keyPressed === "arrowup" || keyPressed === "arrowleft") {
        previousButton.style.backgroundColor = "rgba(255,255,255,.15)";
        pictureStore.browsePicture(false);
        setTimeout(() => {
          previousButton.style.backgroundColor = "rgba(255,255,255, 0)";
        }, 100);
      } else if (keyPressed === "escape") {
        props.setShowOverlay(false);
      }
      setTimeout(() => {
        throttling.current = false;
      }, 100);
    }
  };

  const resetWindowInnerHeight = () => {
    setWindowInnerHeight(window.innerHeight);
  }

  useEffect(() => {
    document.addEventListener("keydown", keyDownHandler);
    window.addEventListener("resize", resetWindowInnerHeight);
    return () => {
      document.removeEventListener("keydown", keyDownHandler);
      window.removeEventListener("resize", resetWindowInnerHeight);
    };
  }, [keyDownHandler, resetWindowInnerHeight]);

  const copyLinkHandler = () => {
    const linkLogo = document.getElementById(`link`);
    linkLogo.style.visibility = "visible";
    linkLogo.style.opacity = 0.25;
    linkLogo.style.fontSize = "50em";
    setTimeout(() => {
      linkLogo.style.visibility = "hidden";
      linkLogo.style.opacity = 0;
      linkLogo.style.fontSize = "1em";
    }, 500);
    const link = `http://lekreuzbergois.com/picture/${selected.id}`;
    navigator.clipboard.writeText(link).then(
      function () {
        console.log("Copying to clipboard was successful!");
      },
      function (err) {
        console.error("Could not copy text: ", err);
      }
    );
  };

  return (
    <div className="overlay__overlay"
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
      style={{ height: windowInnerHeight }}
    >
      <div
        className="overlay__background"
        style={{ height: windowInnerHeight }}
        onClick={() => {
          props.setShowOverlay(false);
        }}
      ></div>
      {!props.isMobile && <>
        <div
          className="overlay__columnLeft"
          style={{ height: windowInnerHeight }}
          id="previousButton"
          onClick={() => {
            pictureStore.browsePicture(false);
          }}
        >
          <LeftOutlined />
        </div>
        <div
          className="overlay__columnRight"
          style={{ height: windowInnerHeight }}
          id="nextButton"
          onMouseEnter={() => mouseHoverHandler(true)}
          onMouseLeave={() => mouseHoverHandler(false)}
          onClick={() => {
            pictureStore.browsePicture(true);
          }}
        >
          <RightOutlined />
        </div>
        <div
          className="overlay__closeButton"
          id="closeButton"
          onClick={() => {
            props.setShowOverlay(false);
          }}
        >
          <CloseOutlined />
        </div>
      </>}

      {pictureStore.isPictureLoading || imageLoaded === null ? (
        <LoadingOutlined className="overlay__spinner" />
      ) : (
        <div className="overlay__pictureContainer">
          <div className="overlay__infoAction">
            <div className="overlay__info">
              <Tooltip
                placement="top"
                title={<span>Copy a direct link to this picture</span>}
              >
                <LinkOutlined onClick={copyLinkHandler} />
              </Tooltip>{" "}
              <span className="overlay__id">  {selected.desc}</span>
            </div>
          </div>

          <div className="overlay__pictureHover">
            <LinkOutlined id="link" className="overlay__icon" />
            <CloseOutlined id="unheart" className="overlay__icon" />
          </div>

          <img
            className="overlay__picture"
            src={imageLoaded}
            alt={selected.desc}
            key={`img__${selected.id}`}
          />
        </div>
      )}
    </div>
  );
});

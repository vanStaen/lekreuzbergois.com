import React, { useEffect, useRef } from "react";

import { ShowSensibleSlider } from "../components/ShowSensibleSlider/ShowSensibleSlider";

import arne from "../img/thumbs/arne.jpg";
import aarhus from "../img/thumbs/aarhus.jpg";
import dark from "../img/thumbs/dark.jpg";
import float from "../img/thumbs/float.jpg";
import mirror from "../img/thumbs/mirror.jpg";
import see from "../img/thumbs/see.jpg";
import skirt from "../img/thumbs/skirt.jpg";
import feel from "../img/thumbs/feel.jpg";
import hords from "../img/thumbs/hords.png";
import halloween from "../img/thumbs/halloween.jpg";
import waet from "../img/thumbs/waet.jpg";

import "./Main.less";

export const Main = () => {
  const track = document.getElementById("image-track");
  const mouseDownAt = useRef(0);
  const prevPercentage = useRef(0);
  const percentage = useRef(0);

  const elementForCursor = document.getElementById('image-container');

  const handleOnDown = (e) => {
    mouseDownAt.current = e.clientX;
    elementForCursor.style.cursor = 'grabbing';
  };

  const handleOnUp = () => {
    mouseDownAt.current = 0;
    prevPercentage.current = percentage.current;
    elementForCursor.style.cursor = 'grab';
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
    //console.log(e.deltaX);
  };

  window.onmousedown = (e) => handleOnDown(e);
  window.ontouchstart = (e) => handleOnDown(e.touches[0]);
  window.onmouseup = (e) => handleOnUp(e);
  window.ontouchend = (e) => handleOnUp(e.touches[0]);
  window.onmousemove = (e) => handleOnMove(e);
  window.ontouchmove = (e) => handleOnMove(e.touches[0]);

  useEffect(() => {
    document.addEventListener("wheel", handleOnScroll);
    return () => {
      document.removeEventListener("wheel", handleOnScroll);
    };
  }, [handleOnScroll]);

  return (
    <>
      <ShowSensibleSlider />
      <div className="image-container" id="image-container">
        <div id="image-track">
          <img className="image" src={arne} draggable="false" />
          <img className="image" src={see} draggable="false" />
          <img className="image" src={hords} draggable="false" />
          <img className="image" src={float} draggable="false" />
          <img className="image" src={waet} draggable="false" />
          <img className="image" src={halloween} draggable="false" />
          <img className="image" src={skirt} draggable="false" />
          <img className="image" src={feel} draggable="false" />
          <img className="image" src={dark} draggable="false" />
          <img className="image" src={aarhus} draggable="false" />
          <img className="image" src={mirror} draggable="false" />
        </div>
      </div>
    </>
  );
};

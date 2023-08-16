import React from "react";

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

  const handleOnDown = (e) => (track.dataset.mouseDownAt = e.clientX);

  const handleOnUp = () => {
    track.dataset.mouseDownAt = "0";
    track.dataset.prevPercentage = track.dataset.percentage;
  };

  const handleOnMove = (e) => {
    if (track.dataset.mouseDownAt === "0") return;

    const mouseDelta = parseFloat(track.dataset.mouseDownAt) - e.clientX,
      maxDelta = window.innerWidth / 2;

    const percentage = (mouseDelta / maxDelta) * -100,
      nextPercentageUnconstrained =
        parseFloat(track.dataset.prevPercentage) + percentage,
      nextPercentage = Math.max(Math.min(nextPercentageUnconstrained, 0), -100);

    track.dataset.percentage = nextPercentage;

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

  /* -- Had to add extra lines for touch events -- */
  window.onmousedown = (e) => handleOnDown(e);
  window.ontouchstart = (e) => handleOnDown(e.touches[0]);
  window.onmouseup = (e) => handleOnUp(e);
  window.ontouchend = (e) => handleOnUp(e.touches[0]);
  window.onmousemove = (e) => handleOnMove(e);
  window.ontouchmove = (e) => handleOnMove(e.touches[0]);

  return (
    <>
      <div id="image-track" data-mouse-down-at="0" data-prev-percentage="0">
        <img class="image" src={arne} draggable="false" />
        <img class="image" src={see} draggable="false" />
        <img class="image" src={hords} draggable="false" />
        <img class="image" src={float} draggable="false" />
        <img class="image" src={waet} draggable="false" />
        <img class="image" src={halloween} draggable="false" />
        <img class="image" src={skirt} draggable="false" />
        <img class="image" src={feel} draggable="false" />
        <img class="image" src={dark} draggable="false" />
        <img class="image" src={aarhus} draggable="false" />
        <img class="image" src={mirror} draggable="false" />
      </div>
    </>

  );
};

import React from "react";

import arne from '../img/arne.jpg';
import aarhus2 from '../img/aarhus2.jpg';
import dark6 from '../img/dark6.jpg';
import float4 from '../img/float4.jpg';
import mirror1 from '../img/mirror1.jpg';
import see5 from '../img/see5.jpg';
import skirt from '../img/skirt.jpg';
import feel from '../img/skirt.jpg';
import hords from '../img/hords.png';
import halloween from '../img/halloween.jpg';
import white from '../img/white.jpg';
import waet from '../img/waet.jpg';

import './Main.css';

export const Main = () => {  
  
  const track = document.getElementById("image-track");

const handleOnDown = e => track.dataset.mouseDownAt = e.clientX;

const handleOnUp = () => {
  track.dataset.mouseDownAt = "0";  
  track.dataset.prevPercentage = track.dataset.percentage;
}

const handleOnMove = e => {
  if(track.dataset.mouseDownAt === "0") return;
  
  const mouseDelta = parseFloat(track.dataset.mouseDownAt) - e.clientX,
        maxDelta = window.innerWidth / 2;
  
  const percentage = (mouseDelta / maxDelta) * -100,
        nextPercentageUnconstrained = parseFloat(track.dataset.prevPercentage) + percentage,
        nextPercentage = Math.max(Math.min(nextPercentageUnconstrained, 0), -100);
  
  track.dataset.percentage = nextPercentage;
  
  track.animate({
    transform: `translate(${nextPercentage}%, -50%)`
  }, { duration: 1200, fill: "forwards" });
  
  for(const image of track.getElementsByClassName("image")) {
    image.animate({
      objectPosition: `${100 + nextPercentage}% center`
    }, { duration: 1200, fill: "forwards" });
  }
}

/* -- Had to add extra lines for touch events -- */
window.onmousedown = e => handleOnDown(e);
window.ontouchstart = e => handleOnDown(e.touches[0]);
window.onmouseup = e => handleOnUp(e);
window.ontouchend = e => handleOnUp(e.touches[0]);
window.onmousemove = e => handleOnMove(e);
window.ontouchmove = e => handleOnMove(e.touches[0]);

  return (
    <>
      <div id="image-track" data-mouse-down-at="0" data-prev-percentage="0">
        <img class="image" src={halloween} draggable="false" />
        <img class="image" src={white} draggable="false" />
        <img class="image" src={arne} draggable="false" />
        <img class="image" src={hords} draggable="false" />
        <img class="image" src={float4} draggable="false" />
        <img class="image" src={see5} draggable="false" />
        <img class="image" src={skirt} draggable="false" />
      </div>
    </>
  );
};

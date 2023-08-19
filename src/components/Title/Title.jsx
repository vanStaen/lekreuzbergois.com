import React from "react";

import "./Title.less";

export const Title = (props) => {
  return (
    <div
      className={props.showOverlay ? "mainTitleGone" : "mainTitle"}
      id="mainTitle"
    >
      <span className="mainTitleL">l</span>e
      <span className="mainTitleK">K</span>reuzbergois
      <div className="mainSubTitle">photographies</div>
    </div>
  );
};

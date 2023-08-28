import React from "react";
import { observer } from "mobx-react-lite";

import { pageStore } from "../../store/pageStore";

import "./Title.less";

export const Title = observer(() => {
  return (
    <div
      className={
        pageStore.showSensiblePictures ? "mainTitleFraktur" : "mainTitle"
      }
    >
      le Kreuzbergois
    </div>
  );
});

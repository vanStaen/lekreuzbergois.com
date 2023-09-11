import React from "react";
import { observer } from "mobx-react-lite";

import { pageStore } from "../../store/pageStore";

import "./Title.less";

export const Title = observer(() => {
  return (
    <>
      <div className="mainTitleFraktur">le Kreuzbergois</div>
      <div className="mainTitleDesc">
        {pageStore.showSensiblePictures
          ? "Sexiest photographer"
          : "Boring photographer"}
      </div>
    </>
  );
});

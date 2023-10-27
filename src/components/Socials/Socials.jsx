import React from "react";
import { useTranslation } from "react-i18next";
import { observer } from "mobx-react-lite";
import { Tooltip } from "antd";

import FetlifeLogo from "../../img/graphics/fetlifeLogo.png";
import InstaLogo from "../../img/graphics/instaLogo.png";
import EmailLogo from "../../img/graphics/emailLogo.png";

import "./Socials.less";

export const Socials = observer(() => {
  const { t } = useTranslation();

  const clickEmailHandler = () => {
    //TODO
  };

  return (
    <div className="socialsContainer">
      <div className="insta">
        <Tooltip placement="bottom" title="le Kreuzbergois on Insta">
          <img className="logo" src={InstaLogo} id="insta" />
        </Tooltip>
      </div>
      <div className="fetlife">
        <Tooltip placement="bottom" title="le Kreuzbergois on Fetlife">
          <img className="logo" src={FetlifeLogo} id="insta" />
        </Tooltip>
      </div>
      <div className="email">
        <Tooltip placement="bottom" title="Email le Kreuzbergois">
          <img
            className="logo"
            src={EmailLogo}
            id="email"
            onClick={clickEmailHandler}
          />
        </Tooltip>
      </div>
    </div>
  );
});

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

  return (
    <div className="socialsContainer">
      <div className="insta">
        <Tooltip placement="bottom" title="le Kreuzbergois on Insta">
          <a href="https://instagram.com/le_kreuzbergois" target="_blank">
            <img className="logo" src={InstaLogo} id="insta" />
          </a>
        </Tooltip>
      </div>
      <div className="fetlife">
        <Tooltip placement="bottom" title="le Kreuzbergois on Fetlife">
          <a href="https://fetlife.com/users/8983549" target="_blank">
            <img className="logo" src={FetlifeLogo} id="fetlife" />
          </a>
        </Tooltip>
      </div>
      <div className="email">
        <Tooltip placement="bottom" title="Email le Kreuzbergois">
          <a href="mailto:info@lekreuzbergois.com">
            <img className="logo" src={EmailLogo} id="email" />
          </a>
        </Tooltip>
      </div>
    </div>
  );
});

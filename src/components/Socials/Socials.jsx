import React from "react";
import { useTranslation } from "react-i18next";
import { observer } from "mobx-react-lite";
import { Tooltip } from "antd";

import FetlifeLogo from "../../img/graphics/fetlifeLogo.png";
import InstaLogo from "../../img/graphics/instaLogo.png";
import EmailLogo from "../../img/graphics/emailLogo.png";
import { pageStore } from "../../store/pageStore";

import "./Socials.less";

export const Socials = observer(() => {
  const { t } = useTranslation();

  return (
    <div className="socialsContainer">
      <a
        className="link"
        href="https://instagram.com/le_kreuzbergois"
        target="_blank"
      >
        <Tooltip
          placement="bottom"
          title={
            <>
              <i>le Kreuzbergois</i> {t("general.on")} Instagram
            </>
          }
        >
          <img className="instaLogo" src={InstaLogo} id="insta" /> Insta
        </Tooltip>
      </a>
      <div className="spacer">&nbsp;&nbsp;|&nbsp;&nbsp;</div>
      {pageStore.showSensiblePictures && (
        <>
          <a
            className="link"
            href="https://fetlife.com/users/8983549"
            target="_blank"
          >
            <Tooltip
              placement="bottom"
              title={
                <>
                  <i>le Kreuzbergois</i> {t("general.on")} Fetlife
                </>
              }
            >
              <img className="fetlifeLogo" src={FetlifeLogo} id="fetlife" />{" "}
              Fetlife
            </Tooltip>
          </a>
          <div className="spacer">&nbsp;&nbsp;|&nbsp;&nbsp;</div>
        </>
      )}
      <Tooltip
        placement="bottom"
        title={
          <>
            Email <i>le Kreuzbergois</i>
          </>
        }
      >
        <a className="link" href="mailto:info@lekreuzbergois.com">
          <img className="emailLogo" src={EmailLogo} id="email" /> Email
        </a>
      </Tooltip>
    </div>
  );
});

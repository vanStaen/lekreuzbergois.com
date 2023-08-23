import React, { useState } from "react";
import { Menu, Dropdown } from "antd";
import { DownOutlined } from "@ant-design/icons";
import { useTranslation } from "react-i18next";

import "./LanguageDropDown.less";

export const LanguageDropDown = () => {
  const { i18n } = useTranslation();
  const initLanguage = i18n.language.slice(-2);
  const [language, setLanguage] = useState(
    initLanguage === "US" ? "EN" : initLanguage
  );

  const onClick = ({ key }) => {
    if (key === "en") {
      i18n.changeLanguage("en-US");
      setLanguage("EN");
    } else if (key === "de") {
      i18n.changeLanguage("de-DE");
      setLanguage("DE");
    } else if (key === "fr") {
      i18n.changeLanguage("fr-FR");
      setLanguage("FR");
    }
  };

  const items = [
    {
      key: 'en',
      label: 'EN',
    },
    {
      key: 'de',
      label: 'DE',
    },
    {
      key: 'fr',
      label: 'FR',
    },
  ]



  return (
    <div className="languageDropdown">
      <Dropdown menu={{ items, onClick }} trigger={"click"} inlineIndent={0}>
        <a
          onClick={(e) => {
            e.preventDefault();
          }}
        >
          <span style={{ paddingLeft: "7px" }}>{language}</span>
          <DownOutlined />
        </a>
      </Dropdown>
    </div>
  );
};

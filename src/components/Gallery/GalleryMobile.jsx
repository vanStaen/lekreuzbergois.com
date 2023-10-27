import React, { useState } from "react";
import { observer } from "mobx-react-lite";
import { LoadingOutlined, FrownOutlined } from "@ant-design/icons";
import { useTranslation } from "react-i18next";
import { Spin } from "antd";

import { pictureStore } from "../../store/pictureStore";
import { pageStore } from "../../store/pageStore";
import { Overlay } from "../Overlay/Overlay";
import { PinInput } from "../PinInput/PinInput";
import { Title } from "../Title/Title";
import useImage from "../../helpers/useImage";

import "./GalleryMobile.less";

export const GalleryMobile = observer(() => {
  const [showOverlay, setShowOverlay] = useState(false);
  const { t } = useTranslation();

  const handleClick = async (pictureId) => {
    await pictureStore.setSelectedPicture(pictureId);
    setShowOverlay(true);
  };

  const picturesFormatted = pictureStore.pictures.map((picture) => {
    const { loading, image, error } = useImage(
      picture.name,
      "img/thumbs",
      picture.imgtype
    );

    return (
      <div
        className="galleryMobile__imageContainer"
        onClick={() => handleClick(picture.id)}
      >
        {loading ? (
          <Spin
            indicator={<LoadingOutlined spin />}
            size="large"
            className="galleryMobile__imageLoading"
          />
        ) : error ? (
          <div className="galleryMobile__imageError">
            <FrownOutlined />
            <div className="galleryMobile__textError">
              Error when loading image
            </div>
          </div>
        ) : (
          <img
            className={`galleryMobile__image ${
              !pageStore.showSensiblePictures &&
              picture.explicit &&
              "galleryMobile__imageSensible"
            }`}
            src={image}
            draggable="false"
          />
        )}
      </div>
    );
  });

  return (
    <>
      <div
        className="galleryMobile__container"
        style={{ minHeight: window.innerHeight }}
      >
        <Title />
        <div className="galleryMobile__socialsSpacer"></div>
        {picturesFormatted}
      </div>
      {pageStore.showPinInput && <PinInput />}
      {showOverlay && (
        <Overlay setShowOverlay={setShowOverlay} isMobile={true} />
      )}
    </>
  );
});

import React, { useState } from "react";
import { observer } from "mobx-react-lite";
import { LoadingOutlined } from "@ant-design/icons";
import { useTranslation } from "react-i18next";
import { Spin } from "antd";

import { pictureStore } from "../../store/pictureStore";
import { pageStore } from "../../store/pageStore";
import { Overlay } from "../Overlay/Overlay";
import useImage from "../../helpers/useImage";

import './GalleryMobile.less';

export const GalleryMobile = observer(() => {
    const [showOverlay, setShowOverlay] = useState(false);
    const { t } = useTranslation();

    const handleClick = async (pictureId) => {
        await pictureStore.setSelectedPicture(pictureId);
        setShowOverlay(true);
    };

    const picturesFormatted = pictureStore.pictures.map((picture) => {
        const { loading, image } = useImage(
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
                ) : (
                    <img
                        className={`galleryMobile__image ${!pageStore.showSensiblePictures &&
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
            <div className="galleryMobile__container">
                {picturesFormatted}
            </div>
            {showOverlay && <Overlay setShowOverlay={setShowOverlay} isMobile={true} />}
        </>
    );
});
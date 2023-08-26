import React, { useState, useEffect, useRef } from "react";
import { observer } from "mobx-react-lite";
import { LoadingOutlined } from "@ant-design/icons";
import { useTranslation } from "react-i18next";
import { Spin } from "antd";

import { pageStore } from "../../store/pageStore";
import { pictureStore } from "../../store/pictureStore";
import { Overlay } from "../Overlay/Overlay";
import { PinInput } from "../PinInput/PinInput";
import { Title } from "../Title/Title";
import useImage from "../../helpers/useImage";

import './Gallery.less';

export const Gallery = observer(() => {
    const [imageDesc, setImageDesc] = useState(false);
    const [showOverlay, setShowOverlay] = useState(false);
    const { t } = useTranslation();

    const elementForCursor = document.getElementById("image-container");
    const track = document.getElementById("image-track");
    const mouseDownAt = useRef(0);
    const prevPercentage = useRef(0);
    const percentage = useRef(0);

    const handleOnDown = (e) => {
        mouseDownAt.current = e.clientX;
        elementForCursor.style.cursor = "grabbing";
    };

    const handleOnUp = () => {
        mouseDownAt.current = 0;
        prevPercentage.current = percentage.current;
        elementForCursor.style.cursor = "grab";
    };

    const handleOnMove = (e) => {
        if (mouseDownAt.current === 0) return;

        const mouseDelta = parseFloat(mouseDownAt.current) - e.clientX,
            maxDelta = window.innerWidth / 2;

        const result = (mouseDelta / maxDelta) * -100,
            nextPercentageUnconstrained = parseFloat(prevPercentage.current) + result,
            nextPercentage = Math.max(Math.min(nextPercentageUnconstrained, 0), -100);

        percentage.current = nextPercentage;

        track.animate(
            {
                transform: `translate(${nextPercentage}%, -50%)`,
            },
            { duration: 1200, fill: "forwards" }
        );

        for (const image of track.getElementsByClassName("image")) {
            image.animate(
                {
                    objectPosition: `${100 + nextPercentage}% center`,
                },
                { duration: 1200, fill: "forwards" }
            );
        }
    };


    const handleMouseOver = (desc, year) => {
        const formatedDesc = (
            <div>
                {desc}
                <span className="imageDescriptionSeparator"> | </span>
                {year}
                <div className="imageDescriptionInfoOpen">
                    {t("gallery.doubleClickToExpend")}
                </div>
            </div>
        );
        setImageDesc(formatedDesc);
    };

    window.onmousedown = (e) => handleOnDown(e);
    window.onmouseup = (e) => handleOnUp(e);
    window.onmousemove = (e) => handleOnMove(e);

    const handleMouseLeave = () => {
        setImageDesc(null);
    };

    const handleDoubleClick = async (pictureId) => {
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
                className="imageContainer"
                onMouseOver={() => handleMouseOver(picture.desc, picture.year)}
                onMouseLeave={handleMouseLeave}
                onDoubleClick={() => handleDoubleClick(picture.id)}
            >
                {loading ? (
                    <Spin
                        indicator={<LoadingOutlined spin />}
                        size="large"
                        className="imageLoading"
                    />
                ) : (
                    <img
                        className={`image ${!pageStore.showSensiblePictures &&
                            picture.explicit &&
                            "imageSensible"
                            }
                            ${pageStore.showSensiblePictures &&
                            !picture.explicit &&
                            "imageSensible"
                            }
                                `}
                        src={image}
                        draggable="false"
                    />
                )}
            </div>
        );
    });

    return (
        <>
            <div className="gallery__container" id="image-container">

                <div className="gallery__title" ><Title /></div>

                <div id="image-track">{picturesFormatted}</div>
            </div >
            {pageStore.showPinInput && <PinInput />}
            {showOverlay && <Overlay setShowOverlay={setShowOverlay} />}
            {imageDesc && <div className="gallery__imageDescription">{imageDesc}</div>}
        </>)
        ;
});
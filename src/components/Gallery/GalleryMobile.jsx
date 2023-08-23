import React from "react";
import { observer } from "mobx-react-lite";

import { pageStore } from "../../store/pageStore";

import './Gallery.less';

export const GalleryMobile = observer(() => {
    return (
        <div className="galleryMobile__container">
            <div>The mobile {pageStore.showSensiblePictures && 'explcit '}version is not done yet,</div>
            <div>check this page on a laptop for now.</div>
        </div>
    );
});
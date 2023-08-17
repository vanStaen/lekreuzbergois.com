import React, { useState } from "react";
import { observer } from "mobx-react-lite";
import { Switch } from 'antd';

import { pageStore } from "../../store/pageStore";

import './ShowSensibleSlider.less'

export const ShowSensibleSlider = observer(() => {
    const [isShown, setIsShown] = useState();

    const slideHandler = (value) => {
        pageStore.setShowSensiblePictures(value);
        setIsShown(value);
    }

    return (
        <div className="showSensibleContainer">
            <div className="showSensibleText">
                {isShown ? 'Hide' : 'Show'} sensible pictures
            </div>
            <Switch
                size="small"
                style={{ backgroundColor: isShown ? "rgba(255, 0, 0, .5)" : "rgba(255, 255, 255, .25)" }}
                defaultChecked={pageStore.setShowSensiblePictures}
                onChange={slideHandler}
            />
        </div>
    );

});
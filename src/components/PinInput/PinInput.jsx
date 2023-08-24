import React, { useEffect, useState } from "react";
import { observer } from "mobx-react-lite";
import { useTranslation } from "react-i18next";

import './PinInput.less'
import { pageStore } from "../../store/pageStore";

const TEMP_PIN = "1234"

export const PinInput = observer(() => {
    const [isNope, setIsNope] = useState(false);
    const [isReadyToEnter, setIsReadyToEnter] = useState(false);
    const { t } = useTranslation();

    const keyUpHandler = (event) => {
        const target = event.srcElement;
        const maxLength = parseInt(target.attributes["maxLength"].value, 10);
        const myLength = target.value.length;
        if (myLength >= maxLength) {
            let next = target;
            while (next = next.nextElementSibling) {
                if (next == null) break;
                if (next.tagName.toLowerCase() == "input") {
                    next.focus();
                    break;
                }
            }
        }
        if (myLength === 0) {
            let next = target;
            while (next = next.previousElementSibling) {
                if (next == null) break;
                if (next.tagName.toLowerCase() == "input") {
                    next.focus();
                    break;
                }
            }
        }
    }

    const keyDownHandler = (event) => {
        if (event.key === 'Enter') {
            onPressEnterHandler();
        } else if (event.key === 'Backspace') {
            setIsReadyToEnter(false);
            setIsNope(false);
            var target = event.srcElement;
            target.value = "";
        } else {
            //emptying the cell in keyDown
            var target = event.srcElement;
            target.value = "";
            setIsReadyToEnter(false);
            setIsNope(false);
        }
    }

    const onPinChangeHandler = () => {
        const pin1 = document.getElementById("pin1").value;
        const pin2 = document.getElementById("pin2").value;
        const pin3 = document.getElementById("pin3").value;
        const pin4 = document.getElementById("pin4").value;
        if (pin1 !== "" && pin2 !== "" && pin3 !== "" && pin4 !== "") { setIsReadyToEnter(true) }
    }

    const onPressEnterHandler = () => {
        const pin1 = document.getElementById("pin1").value;
        const pin2 = document.getElementById("pin2").value;
        const pin3 = document.getElementById("pin3").value;
        const pin4 = document.getElementById("pin4").value;
        if (pin1 !== "" && pin2 !== "" && pin3 !== "" && pin4 !== "") {
            if (pin1 + pin2 + pin3 + pin4 === TEMP_PIN) {
                pageStore.setShowSensiblePictures(true);
                pageStore.setShowPinInput(false);
            } else { setIsNope(true) }
        }
    }

    useEffect(() => {
        document.addEventListener("keyup", keyUpHandler);
        document.addEventListener("keydown", keyDownHandler);
        return () => {
            document.removeEventListener("keyup", keyUpHandler);
            document.removeEventListener("keydown", keyDownHandler);
        };
    }, [keyDownHandler]);

    return (
        <>
            <div className="pin__background" onClick={() => pageStore.setShowPinInput(false)}></div>
            <div className="pin__container">
                <div className="pin-code">
                    <input id="pin1" type="number" maxLength="1" onChange={onPinChangeHandler} autoFocus />
                    <input id="pin2" type="number" maxLength="1" onChange={onPinChangeHandler} />
                    <input id="pin3" type="number" maxLength="1" onChange={onPinChangeHandler} />
                    <input id="pin4" type="number" maxLength="1" onChange={onPinChangeHandler} />
                </div>
                {<div className="pin__info">{isNope ? t('pin.nope') : isReadyToEnter && <>{t('pin.pressEnter')} &#9166;</>}</div>}
            </div>
        </>
    );
});
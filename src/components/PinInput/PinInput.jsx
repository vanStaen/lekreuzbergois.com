import React from "react"

import './PinInput.less'

export const PinInput = () => {

    const pinContainer = document.querySelector(".pin-code");
    console.log('There is ' + pinContainer.length + ' Pin Container on the page.');

    pinContainer.addEventListener('keyup', function (event) {
        const target = event.srcElement;

        const maxLength = parseInt(target.attributes["maxlength"].value, 10);
        const myLength = target.value.length;

        if (myLength >= maxLength) {
            const next = target;
            while (next = next.nextElementSibling) {
                if (next == null) break;
                if (next.tagName.toLowerCase() == "input") {
                    next.focus();
                    break;
                }
            }
        }

        if (myLength === 0) {
            const next = target;
            while (next = next.previousElementSibling) {
                if (next == null) break;
                if (next.tagName.toLowerCase() == "input") {
                    next.focus();
                    break;
                }
            }
        }
    }, false);

    pinContainer.addEventListener('keydown', function (event) {
        var target = event.srcElement;
        target.value = "";
    }, false);

    return (
        <div className="pin-code">
            <input type="number" maxlength="1" autofocus />
            <input type="number" maxlength="1" />
            <input type="number" maxlength="1" />
            <input type="number" maxlength="1" />
        </div>
    );
}
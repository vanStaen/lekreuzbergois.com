import { makeObservable, observable, action } from "mobx";

export class PageStore {

  language = navigator.language || navigator.userLanguage;
  showSensiblePictures = false;
  showPinInput = false;

  constructor() {
    makeObservable(this, {
      language: observable,
      setLanguage: action,
      showSensiblePictures: observable,
      setShowSensiblePictures: action,
      showPinInput: observable,
      setShowPinInput: action,
    });
  }

  setLanguage = (language) => {
    this.language = language;
  };

  setShowSensiblePictures = (showSensiblePictures) => {
    this.showSensiblePictures = showSensiblePictures;
  };

  setShowPinInput = (showPinInput) => {
    this.showPinInput = showPinInput;
  };

}

export const pageStore = new PageStore();

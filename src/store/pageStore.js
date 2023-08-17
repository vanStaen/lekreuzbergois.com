import { makeObservable, observable, action } from "mobx";

export class PageStore {

  language = navigator.language || navigator.userLanguage;
  showSensiblePictures = false;

  constructor() {
    makeObservable(this, {
      language: observable,
      setLanguage: action,
      showSensiblePictures: observable,
      setShowSensiblePictures: action,
    });
  }

  setLanguage = (language) => {
    this.language = language;
  };

  setShowSensiblePictures = (showSensiblePictures) => {
    this.showSensiblePictures = showSensiblePictures;
  };

}

export const pageStore = new PageStore();

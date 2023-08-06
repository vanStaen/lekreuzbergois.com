import { makeObservable, observable, action } from "mobx";

export class PageStore {

  language = navigator.language || navigator.userLanguage;

  constructor() {
    makeObservable(this, {
      language: observable,
      setLanguage: action,
    });
  }

  setLanguage = (language) => {
    this.language = language;
  };

}

export const pageStore = new PageStore();

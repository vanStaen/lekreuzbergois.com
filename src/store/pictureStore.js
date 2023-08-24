import { makeObservable, observable, action } from "mobx";
import { pageStore } from "./pageStore";

export class PictureStore {

  selectedPicture = null;
  isPictureLoading = true;

  pictures = [
    {
      id: 1,
      name: 'gliter',
      imgtype: 'jpg',
      desc: 'GliterBomb',
      year: 2019,
      explicit: true,
    },
    {
      id: 2,
      name: 'arne',
      imgtype: 'jpg',
      desc: 'Klahs',
      year: 2014,
      explicit: false,
    },
    {
      id: 3,
      name: 'see',
      imgtype: 'jpg',
      desc: 'LustSee',
      year: 2019,
      explicit: false,
    },
    {
      id: 4,
      name: 'heels',
      imgtype: 'jpg',
      desc: 'Provocateur',
      year: 2022,
      explicit: true,
    },
    {
      id: 5,
      name: 'hords',
      imgtype: 'png',
      desc: 'HouseOfRedDoors',
      year: 2015,
      explicit: false,
    },
    {
      id: 6,
      name: 'float',
      imgtype: 'jpg',
      desc: 'MiraLykke',
      year: 2018,
      explicit: false,
    },
    {
      id: 7,
      name: 'model',
      imgtype: 'jpg',
      desc: 'UndSieSiehtGutAus',
      year: 2018,
      explicit: true,
    },
    {
      id: 8,
      name: 'waet',
      imgtype: 'jpg',
      desc: 'WeAreEnfantTerrible',
      year: 2009,
      explicit: false,
    },
    {
      id: 9,
      name: 'halloween',
      imgtype: 'jpg',
      desc: 'DeuxFrancs',
      year: 2018,
      explicit: false,
    },
    {
      id: 10,
      name: 'skirt',
      imgtype: 'jpg',
      desc: 'Autoportrait',
      year: 2020,
      explicit: false,
    },
    {
      id: 11,
      name: 'feel',
      imgtype: 'jpg',
      desc: 'FeetFestival',
      year: 2019,
      explicit: false,
    },
    {
      id: 12,
      name: 'dark',
      imgtype: 'jpg',
      desc: 'DarkEditorial',
      year: 2023,
      explicit: false,
    },
    {
      id: 13,
      name: 'aarhus',
      imgtype: 'jpg',
      desc: 'Aarhus',
      year: 2021,
      explicit: false,
    },
    {
      id: 14,
      name: 'mirror',
      imgtype: 'jpg',
      desc: 'Mirror',
      year: 2022,
      explicit: false,
    },
  ];

  constructor() {
    makeObservable(this, {
      pictures: observable,
      selectedPicture: observable,
      setSelectedPicture: action,
      isPictureLoading: observable,
      setIsPictureLoading: action,
      browsePicture: action,
    });
  }

  setSelectedPicture = (selectedPictureId, next) => {
    this.setIsPictureLoading(true);
    const picture = this.pictures.filter((picture) => picture.id === selectedPictureId);
    this.selectedPicture = picture[0];
  };

  browsePicture = (next) => {
    this.setIsPictureLoading(true);
    let picturesArray;
    // Filter in/out explicit pictures
    picturesArray = this.pictures.filter((picture) => picture.explicit === pageStore.showSensiblePictures);
    // get index of picture in array
    let index = picturesArray.indexOf(this.selectedPicture);
    // Increment selectedPictureId
    if (next) {
      index = index + 1
    } else {
      index = index - 1
    }
    // Loop back if at one end of object
    if (index < 0) {
      index = picturesArray.length - 1;
    } else if (index > picturesArray.length - 1) {
      index = 0;
    }
    // Return the correct image object
    const picture = picturesArray[index];
    this.selectedPicture = picture;
  };

  setIsPictureLoading = (isPictureLoading) => {
    this.isPictureLoading = isPictureLoading;
  };

}

export const pictureStore = new PictureStore();
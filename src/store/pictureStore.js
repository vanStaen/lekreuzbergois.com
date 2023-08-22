import { makeObservable, observable, action } from "mobx";
import { pageStore } from "./pageStore";

export class PictureStore {

  selectedPicture = null;
  isPictureLoading = true;

  pictures = [
    {
      id: 1,
      name: 'arne',
      imgtype: 'jpg',
      desc: 'Klahs',
      year: 2014,
      explicit: false,
    },
    {
      id: 2,
      name: 'see',
      imgtype: 'jpg',
      desc: 'LustSee',
      year: 2019,
      explicit: false,
    },
    {
      id: 3,
      name: 'heels',
      imgtype: 'jpg',
      desc: 'Provocateur',
      year: 2022,
      explicit: true,
    },
    {
      id: 4,
      name: 'hords',
      imgtype: 'png',
      desc: 'HouseOfRedDoors',
      year: 2015,
      explicit: false,
    },
    {
      id: 5,
      name: 'float',
      imgtype: 'jpg',
      desc: 'MiraLykke',
      year: 2018,
      explicit: false,
    },
    {
      id: 6,
      name: 'waet',
      imgtype: 'jpg',
      desc: 'WeAreEnfantTerrible',
      year: 2009,
      explicit: false,
    },
    {
      id: 7,
      name: 'halloween',
      imgtype: 'jpg',
      desc: 'DeuxFrancs',
      year: 2018,
      explicit: false,
    },
    {
      id: 8,
      name: 'skirt',
      imgtype: 'jpg',
      desc: 'Autoportrait',
      year: 2020,
      explicit: false,
    },
    {
      id: 9,
      name: 'feel',
      imgtype: 'jpg',
      desc: 'FeetFestival',
      year: 2019,
      explicit: false,
    },
    {
      id: 10,
      name: 'dark',
      imgtype: 'jpg',
      desc: 'DarkEditorial',
      year: 2023,
      explicit: true,
    },
    {
      id: 11,
      name: 'aarhus',
      imgtype: 'jpg',
      desc: 'Aarhus',
      year: 2021,
      explicit: false,
    },
    {
      id: 12,
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
    // Filter out explicit pictures if needee
    if (!pageStore.showSensiblePictures) {
      picturesArray = this.pictures.filter((picture) => picture.explicit === false);
    } else {
      picturesArray = this.pictures;
    }
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
import { makeObservable, observable, action } from "mobx";
import { pageStore } from "./pageStore";

export class PictureStore {

  selectedPicture = null;
  isPictureLoading = true;

  pictures = [
    {
      id: 5,
      name: '005',
      imgtype: 'jpg',
      desc: 'MiraLykke',
      year: 2018,
      explicit: false,
    },
    {
      id: 14,
      name: '014',
      imgtype: 'jpg',
      desc: 'KlaraKristal',
      year: 2020,
      explicit: true,
    },
    {
      id: 9,
      name: '009',
      imgtype: 'png',
      desc: 'HouseOfRedDoors',
      year: 2015,
      explicit: false,
    },
    {
      id: 19,
      name: '019',
      imgtype: 'jpg',
      desc: 'MiroirMiroir',
      year: 2020,
      explicit: true,
    },
    {
      id: 12,
      name: '012',
      imgtype: 'jpg',
      desc: 'LustSee',
      year: 2019,
      explicit: false,
    },
    {
      id: 17,
      name: '017',
      imgtype: 'jpg',
      desc: 'KlaraFetish',
      year: 2023,
      explicit: true,
    },
    {
      id: 15,
      name: '015',
      imgtype: 'jpg',
      desc: 'WeAreEnfantTerrible',
      year: 2009,
      explicit: false,
    },
    {
      id: 23,
      name: '023',
      imgtype: 'jpg',
      desc: 'TeaTime',
      year: 2019,
      explicit: true,
    },
    {
      id: 8,
      name: '008',
      imgtype: 'jpg',
      desc: 'Provocateur',
      year: 2022,
      explicit: true,
    },
    {
      id: 7,
      name: '007',
      imgtype: 'jpg',
      desc: 'DeuxFrancs',
      year: 2018,
      explicit: false,
    },
    {
      id: 13,
      name: '013',
      imgtype: 'jpg',
      desc: 'Autoportrait',
      year: 2020,
      explicit: false,
    },
    {
      id: 11,
      name: '011',
      imgtype: 'jpg',
      desc: 'UndSieSiehtGutAus',
      year: 2018,
      explicit: true,
    },
    {
      id: 4,
      name: '004',
      imgtype: 'jpg',
      desc: 'FeelFestival',
      year: 2019,
      explicit: false,
    },
    {
      id: 6,
      name: '006',
      imgtype: 'jpg',
      desc: 'Fernsehturm',
      year: 2022,
      explicit: true,
    },
    {
      id: 3,
      name: '003',
      imgtype: 'jpg',
      desc: 'DarkEditorial',
      year: 2023,
      explicit: false,
    },
    {
      id: 1,
      name: '001',
      imgtype: 'jpg',
      desc: 'Aarhus',
      year: 2021,
      explicit: false,
    },
    {
      id: 18,
      name: '018',
      imgtype: 'jpg',
      desc: 'KlaraStairs',
      year: 2023,
      explicit: true,
    },
    {
      id: 2,
      name: '002',
      imgtype: 'jpg',
      desc: 'Klahs',
      year: 2014,
      explicit: false,
    },
    {
      id: 16,
      name: '016',
      imgtype: 'jpg',
      desc: 'Sweet Reflection',
      year: 2021,
      explicit: true,
    },
    {
      id: 10,
      name: '010',
      imgtype: 'jpg',
      desc: 'Mirror',
      year: 2022,
      explicit: false,
    },
    {
      id: 24,
      name: '024',
      imgtype: 'jpg',
      desc: 'Miau',
      year: 2021,
      explicit: true,
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
    // Filter out explicit pictures
    if (pageStore.showSensiblePictures === false) {
      picturesArray = this.pictures.filter((picture) => picture.explicit === pageStore.showSensiblePictures);
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
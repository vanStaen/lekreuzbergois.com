import { makeObservable, observable, action } from "mobx";

export class PictureStore {

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
      name: 'hords',
      imgtype: 'png',
      desc: 'HouseOfRedDoors',
      year: 2015,
      explicit: false,
    },
    {
      id: 4,
      name: 'float',
      imgtype: 'jpg',
      desc: 'MiraLykke',
      year: 2018,
      explicit: false,
    },
    {
      id: 5,
      name: 'waet',
      imgtype: 'jpg',
      desc: 'WeAreEnfantTerrible',
      year: 2009,
      explicit: false,
    },
    {
      id: 6,
      name: 'halloween',
      imgtype: 'jpg',
      desc: 'Halloween',
      year: 2018,
      explicit: false,
    },
    {
      id: 7,
      name: 'skirt',
      imgtype: 'jpg',
      desc: 'Autoportrait',
      year: 2020,
      explicit: false,
    },
    {
      id: 8,
      name: 'feel',
      imgtype: 'jpg',
      desc: 'FeetFestival',
      year: 2019,
      explicit: false,
    },
    {
      id: 9,
      name: 'dark',
      imgtype: 'jpg',
      desc: 'DarkEditorial',
      year: 2023,
      explicit: true,
    },
    {
      id: 10,
      name: 'aarhus',
      imgtype: 'jpg',
      desc: 'Aarhus',
      year: 2021,
      explicit: false,
    },
    {
      id: 11,
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
    });
  }

}

export const pictureStore = new PictureStore();
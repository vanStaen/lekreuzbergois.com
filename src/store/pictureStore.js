import { makeObservable, observable, action } from "mobx";

export class PictureStore {

  pictures = [
    {
      name: 'arne',
      imgtype: 'jpg',
      desc: 'Klahs',
      year: 2014,
      explicit: false,
    },
    {
      name: 'see',
      imgtype: 'jpg',
      desc: 'LustSee',
      year: 2019,
      explicit: false,
    },
    {
      name: 'hords',
      imgtype: 'png',
      desc: 'HouseOfRedDoors',
      year: 2015,
      explicit: false,
    },
    {
      name: 'float',
      imgtype: 'jpg',
      desc: 'MiraLykke',
      year: 2018,
      explicit: false,
    },
    {
      name: 'waet',
      imgtype: 'jpg',
      desc: 'WeAreEnfantTerrible',
      year: 2009,
      explicit: false,
    },
    {
      name: 'halloween',
      imgtype: 'jpg',
      desc: 'Halloween',
      year: 2018,
      explicit: false,
    },
    {
      name: 'skirt',
      imgtype: 'jpg',
      desc: 'Autoportrait',
      year: 2020,
      explicit: false,
    },
    {
      name: 'feel',
      imgtype: 'jpg',
      desc: 'FeetFestival',
      year: 2019,
      explicit: false,
    },
    {
      name: 'dark',
      imgtype: 'jpg',
      desc: 'DarkEditorial',
      year: 2023,
      explicit: true,
    },
    {
      name: 'aarhus',
      imgtype: 'jpg',
      desc: 'Aarhus',
      year: 2021,
      explicit: false,
    },
    {
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
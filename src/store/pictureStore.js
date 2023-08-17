import { makeObservable, observable, action } from "mobx";

export class PictureStore {

  pictures = [
    {
      name: 'arne',
      desc: 'Klahs',
      year: 2014,
      explicit: false,
    },
    {
      name: 'see',
      desc: 'LustSee',
      year: 2019,
      explicit: false,
    },
    {
      name: 'hords',
      desc: 'HouseOfRedDoors',
      year: 2015,
      explicit: false,
    },
    {
      name: 'float',
      desc: 'MiraLykke',
      year: 2018,
      explicit: false,
    },
    {
      name: 'waet',
      desc: 'WeAreEnfantTerrible',
      year: 2009,
      explicit: false,
    },
    {
      name: 'halloween',
      desc: 'Halloween',
      year: 2018,
      explicit: false,
    },
    {
      name: 'skirt',
      desc: 'Autoportrait',
      year: 2020,
      explicit: false,
    },
    {
      name: 'feel',
      desc: 'FeetFestival',
      year: 2019,
      explicit: false,
    },
    {
      name: 'dark',
      desc: 'DarkEditorial',
      year: 2023,
      explicit: true,
    },
    {
      name: 'aarhus',
      desc: 'Aarhus',
      year: 2021,
      explicit: false,
    },
    {
      name: 'mirror',
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
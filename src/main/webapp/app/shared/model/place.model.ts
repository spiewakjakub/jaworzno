import { Moment } from 'moment';

export interface IPlace {
  id?: number;
  date?: Moment;
  name?: string;
  link?: string;
}

export class Place implements IPlace {
  constructor(public id?: number, public date?: Moment, public name?: string, public link?: string) {}
}

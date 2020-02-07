import { Moment } from 'moment';

export interface INews {
  id?: number;
  title?: string;
  content?: string;
  date?: Moment;
  description?: string;
}

export class News implements INews {
  constructor(public id?: number, public title?: string, public content?: string, public date?: Moment, public description?: string) {}
}

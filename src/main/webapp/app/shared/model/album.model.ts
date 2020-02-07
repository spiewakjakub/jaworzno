import { IPicture } from 'app/shared/model/picture.model';

export interface IAlbum {
  id?: number;
  title?: string;
  pictures?: IPicture[];
}

export class Album implements IAlbum {
  constructor(public id?: number, public title?: string, public pictures?: IPicture[]) {}
}

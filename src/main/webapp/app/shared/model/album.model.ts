import { IPicture } from 'app/shared/model/picture.model';
import { Moment } from 'moment';

export interface IAlbum {
  id?: number;
  title?: string;
  date?: Moment;
  mainPicture?: any;
  mainPictureContentType?: string;
  pictures?: IPicture[];
}

export class Album implements IAlbum {
  constructor(
    public id?: number,
    public title?: string,
    public date?: Moment,
    public mainPicture?: any,
    public mainPictureContentType?: string,
    public pictures?: IPicture[]
  ) {}
}

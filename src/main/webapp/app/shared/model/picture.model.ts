import { IAlbum } from 'app/shared/model/album.model';

export interface IPicture {
  id?: number;
  dataContentType?: string;
  data?: any;
  album?: IAlbum;
}

export class Picture implements IPicture {
  constructor(public id?: number, public dataContentType?: string, public data?: any, public album?: IAlbum) {}
}

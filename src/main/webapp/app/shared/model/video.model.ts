export interface IVideo {
  id?: number;
  title?: string;
  link?: string;
}

export class Video implements IVideo {
  constructor(public id?: number, public title?: string, public link?: string) {}
}

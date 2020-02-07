export interface IPoster {
  id?: number;
  dataContentType?: string;
  data?: any;
  link?: string;
}

export class Poster implements IPoster {
  constructor(public id?: number, public dataContentType?: string, public data?: any, public link?: string) {}
}

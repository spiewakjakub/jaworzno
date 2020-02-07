export interface ISponsor {
  id?: number;
  logoContentType?: string;
  logo?: any;
  name?: string;
  link?: string;
}

export class Sponsor implements ISponsor {
  constructor(public id?: number, public logoContentType?: string, public logo?: any, public name?: string, public link?: string) {}
}

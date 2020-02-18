export interface ISlider {
  id?: number;
  pictureContentType?: string;
  picture?: any;
  link?: string;
  title?: string;
  description?: string;
}

export class Slider implements ISlider {
  constructor(
    public id?: number,
    public pictureContentType?: string,
    public picture?: any,
    public link?: string,
    public title?: string,
    public description?: string
  ) {}
}

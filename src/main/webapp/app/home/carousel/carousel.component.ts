import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'jhi-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss']
})
export class CarouselComponent implements OnInit {
  images = [944, 1011, 984].map(n => `https://picsum.photos/id/${n}/1444/500`);

  constructor() {}

  ngOnInit(): void {}
}

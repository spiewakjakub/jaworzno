import { Component, OnInit } from '@angular/core';
import { Slider } from 'app/shared/model/slider.model';
import { SliderService } from 'app/entities/slider/slider.service';

@Component({
  selector: 'jhi-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss']
})
export class CarouselComponent implements OnInit {
  sliders?: Slider[];

  constructor(private sliderService: SliderService) {}

  ngOnInit(): void {
    this.sliderService.query().subscribe(sliders => {
      this.sliders = sliders.body as Slider[];
    });
  }
}

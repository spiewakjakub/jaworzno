import { Component, OnInit } from '@angular/core';
import { Place } from 'app/shared/model/place.model';
import { PlaceService } from 'app/entities/place/place.service';

@Component({
  selector: 'jhi-places',
  templateUrl: './places.component.html',
  styleUrls: ['./places.component.scss']
})
export class PlacesComponent implements OnInit {
  places?: Place[];

  constructor(private placeService: PlaceService) {}

  ngOnInit(): void {
    this.placeService.getFour().subscribe(places => {
      this.places = places.body as Place[];
    });
  }
}

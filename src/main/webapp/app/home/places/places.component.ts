import { Component, OnInit } from '@angular/core';
import { Place } from 'app/shared/model/place.model';

@Component({
  selector: 'jhi-places',
  templateUrl: './places.component.html',
  styleUrls: ['./places.component.scss']
})
export class PlacesComponent implements OnInit {
  moment = require('moment');
  places: Place[] = [
    {
      name: 'Chicago',
      date: this.moment('01-12-2012', 'DD-MM-YYYY')
    },
    {
      name: 'New York',
      date: this.moment('21-02-2014', 'DD-MM-YYYY')
    },
    {
      name: 'Washington DC',
      date: this.moment('07-09-2016', 'DD-MM-YYYY')
    },
    {
      name: 'Los Angeles',
      date: this.moment('23-11-2020', 'DD-MM-YYYY')
    }
  ];

  constructor() {}

  ngOnInit(): void {}
}

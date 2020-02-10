import { Component, Input, OnInit } from '@angular/core';
import { Place } from 'app/shared/model/place.model';

@Component({
  selector: 'jhi-place-item',
  templateUrl: './place-item.component.html',
  styleUrls: ['./place-item.component.scss']
})
export class PlaceItemComponent implements OnInit {
  @Input() data: Place | undefined;

  constructor() {}

  ngOnInit(): void {}
}

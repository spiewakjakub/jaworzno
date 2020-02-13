import { Component, Input } from '@angular/core';
import { Moment } from 'moment';

@Component({
  selector: 'jhi-home-card',
  templateUrl: './home-card.component.html',
  styleUrls: ['./home-card.component.scss']
})
export class HomeCardComponent {
  @Input() picture?: any;
  @Input() title?: string;
  @Input() date?: Moment;
  @Input() description?: string;
}

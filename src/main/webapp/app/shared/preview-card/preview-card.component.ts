import { Component, Input } from '@angular/core';
import { Moment } from 'moment';

@Component({
  selector: 'jhi-preview-card',
  templateUrl: './preview-card.component.html',
  styleUrls: ['./preview-card.component.scss']
})
export class PreviewCardComponent {
  @Input() picture?: any;
  @Input() title?: string;
  @Input() date?: Moment;
  @Input() description?: string;
}

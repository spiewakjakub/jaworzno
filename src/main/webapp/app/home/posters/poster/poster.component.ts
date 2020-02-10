import { Component, Input } from '@angular/core';
import { Poster } from 'app/shared/model/poster.model';

@Component({
  selector: 'jhi-poster',
  templateUrl: './poster.component.html',
  styleUrls: ['./poster.component.scss']
})
export class PosterComponent {
  @Input() poster?: Poster;
}

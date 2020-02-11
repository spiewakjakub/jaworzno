import { Component, Input } from '@angular/core';
import { News } from 'app/shared/model/news.model';

@Component({
  selector: 'jhi-single-news',
  templateUrl: './single-news.component.html',
  styleUrls: ['./single-news.component.scss']
})
export class SingleNewsComponent {
  @Input() news?: News;
}

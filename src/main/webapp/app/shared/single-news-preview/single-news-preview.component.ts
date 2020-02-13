import { Component, Input } from '@angular/core';
import { News } from 'app/shared/model/news.model';

@Component({
  selector: 'jhi-single-news-preview',
  templateUrl: './single-news-preview.component.html',
  styleUrls: ['./single-news-preview.component.scss']
})
export class SingleNewsPreviewComponent {
  @Input() news?: News;
}

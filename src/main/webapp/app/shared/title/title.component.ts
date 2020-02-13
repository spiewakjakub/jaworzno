import { Component, Input } from '@angular/core';

@Component({
  selector: 'jhi-title',
  templateUrl: './title.component.html',
  styleUrls: ['./title.component.scss']
})
export class TitleComponent {
  @Input() titleTranslate?: string;
  @Input() router?: string;
}

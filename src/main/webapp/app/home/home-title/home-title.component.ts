import { Component, Input } from '@angular/core';

@Component({
  selector: 'jhi-home-title',
  templateUrl: './home-title.component.html',
  styleUrls: ['./home-title.component.scss']
})
export class HomeTitleComponent {
  @Input() titleTranslate?: string;
  @Input() routerLink?: string;
}

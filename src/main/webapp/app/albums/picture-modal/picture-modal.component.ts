import { Component } from '@angular/core';
import { Picture } from 'app/shared/model/picture.model';
import { Observable, Subject } from 'rxjs';

@Component({
  selector: 'jhi-picture-modal',
  templateUrl: './picture-modal.component.html',
  styleUrls: ['./picture-modal.component.scss']
})
export class PictureModalComponent {
  picture?: Picture;
  private pictureClickSubject: Subject<'PREV' | 'NEXT'> = new Subject<'PREV' | 'NEXT'>();
  pictureClick$: Observable<'PREV' | 'NEXT'> = this.pictureClickSubject.asObservable();

  emitPicture(opt: 'PREV' | 'NEXT'): void {
    this.pictureClickSubject.next(opt);
  }
}

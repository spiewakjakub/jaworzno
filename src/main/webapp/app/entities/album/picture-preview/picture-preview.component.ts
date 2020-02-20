import { Component } from '@angular/core';
import { IPicture } from 'app/shared/model/picture.model';
import { NgbModalRef } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'jhi-picture-preview',
  templateUrl: './picture-preview.component.html',
  styleUrls: ['./picture-preview.component.scss']
})
export class PicturePreviewComponent {
  picture?: IPicture;
  modalRef?: NgbModalRef;

  closeSelf(): void {
    if (this.modalRef) {
      this.modalRef.close();
    }
  }
}

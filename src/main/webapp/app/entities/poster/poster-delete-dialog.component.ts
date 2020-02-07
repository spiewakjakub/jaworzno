import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IPoster } from 'app/shared/model/poster.model';
import { PosterService } from './poster.service';

@Component({
  templateUrl: './poster-delete-dialog.component.html'
})
export class PosterDeleteDialogComponent {
  poster?: IPoster;

  constructor(protected posterService: PosterService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.posterService.delete(id).subscribe(() => {
      this.eventManager.broadcast('posterListModification');
      this.activeModal.close();
    });
  }
}

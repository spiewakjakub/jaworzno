import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ISlider } from 'app/shared/model/slider.model';
import { SliderService } from './slider.service';

@Component({
  templateUrl: './slider-delete-dialog.component.html'
})
export class SliderDeleteDialogComponent {
  slider?: ISlider;

  constructor(protected sliderService: SliderService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.sliderService.delete(id).subscribe(() => {
      this.eventManager.broadcast('sliderListModification');
      this.activeModal.close();
    });
  }
}

import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiDataUtils } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IPicture } from 'app/shared/model/picture.model';
import { PictureService } from './picture.service';
import { PictureDeleteDialogComponent } from './picture-delete-dialog.component';

@Component({
  selector: 'jhi-picture',
  templateUrl: './picture.component.html'
})
export class PictureComponent implements OnInit, OnDestroy {
  pictures?: IPicture[];
  eventSubscriber?: Subscription;

  constructor(
    protected pictureService: PictureService,
    protected dataUtils: JhiDataUtils,
    protected eventManager: JhiEventManager,
    protected modalService: NgbModal
  ) {}

  loadAll(): void {
    this.pictureService.query().subscribe((res: HttpResponse<IPicture[]>) => (this.pictures = res.body || []));
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInPictures();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: IPicture): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  byteSize(base64String: string): string {
    return this.dataUtils.byteSize(base64String);
  }

  openFile(contentType: string, base64String: string): void {
    return this.dataUtils.openFile(contentType, base64String);
  }

  registerChangeInPictures(): void {
    this.eventSubscriber = this.eventManager.subscribe('pictureListModification', () => this.loadAll());
  }

  delete(picture: IPicture): void {
    const modalRef = this.modalService.open(PictureDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.picture = picture;
  }
}

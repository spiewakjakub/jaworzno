import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiDataUtils } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IPoster } from 'app/shared/model/poster.model';
import { PosterService } from './poster.service';
import { PosterDeleteDialogComponent } from './poster-delete-dialog.component';

@Component({
  selector: 'jhi-poster',
  templateUrl: './poster.component.html'
})
export class PosterComponent implements OnInit, OnDestroy {
  posters?: IPoster[];
  eventSubscriber?: Subscription;

  constructor(
    protected posterService: PosterService,
    protected dataUtils: JhiDataUtils,
    protected eventManager: JhiEventManager,
    protected modalService: NgbModal
  ) {}

  loadAll(): void {
    this.posterService.query().subscribe((res: HttpResponse<IPoster[]>) => (this.posters = res.body || []));
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInPosters();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: IPoster): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  byteSize(base64String: string): string {
    return this.dataUtils.byteSize(base64String);
  }

  openFile(contentType: string, base64String: string): void {
    return this.dataUtils.openFile(contentType, base64String);
  }

  registerChangeInPosters(): void {
    this.eventSubscriber = this.eventManager.subscribe('posterListModification', () => this.loadAll());
  }

  delete(poster: IPoster): void {
    const modalRef = this.modalService.open(PosterDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.poster = poster;
  }
}

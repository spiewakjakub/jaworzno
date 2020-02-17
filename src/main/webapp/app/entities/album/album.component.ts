import { HttpResponse } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IAlbum } from 'app/shared/model/album.model';
import { JhiDataUtils, JhiEventManager } from 'ng-jhipster';
import { Subscription } from 'rxjs';
import { AlbumDeleteDialogComponent } from './album-delete-dialog.component';
import { AlbumService } from './album.service';

@Component({
  selector: 'jhi-album',
  templateUrl: './album.component.html'
})
export class AlbumComponent implements OnInit, OnDestroy {
  albums?: IAlbum[];
  eventSubscriber?: Subscription;

  constructor(
    protected albumService: AlbumService,
    protected eventManager: JhiEventManager,
    protected modalService: NgbModal,
    protected dataUtils: JhiDataUtils
  ) {}

  loadAll(): void {
    this.albumService.query().subscribe((res: HttpResponse<IAlbum[]>) => (this.albums = res.body || []));
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInAlbums();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: IAlbum): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInAlbums(): void {
    this.eventSubscriber = this.eventManager.subscribe('albumListModification', () => this.loadAll());
  }

  delete(album: IAlbum): void {
    const modalRef = this.modalService.open(AlbumDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.album = album;
  }

  openFile(contentType: string, base64String: string): void {
    return this.dataUtils.openFile(contentType, base64String);
  }

  byteSize(base64String: string): string {
    return this.dataUtils.byteSize(base64String);
  }
}

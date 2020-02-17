import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IAlbum } from 'app/shared/model/album.model';
import { JhiDataUtils } from 'ng-jhipster';

@Component({
  selector: 'jhi-album-detail',
  templateUrl: './album-detail.component.html'
})
export class AlbumDetailComponent implements OnInit {
  album: IAlbum | null = null;

  constructor(protected activatedRoute: ActivatedRoute, protected dataUtils: JhiDataUtils) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ album }) => (this.album = album));
  }

  previousState(): void {
    window.history.back();
  }

  openFile(contentType: string, base64String: string): void {
    this.dataUtils.openFile(contentType, base64String);
  }

  byteSize(base64String: string): string {
    return this.dataUtils.byteSize(base64String);
  }
}

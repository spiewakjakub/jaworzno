import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { JhiDataUtils, JhiFileLoadError, JhiEventManager, JhiEventWithContent } from 'ng-jhipster';

import { IPicture, Picture } from 'app/shared/model/picture.model';
import { PictureService } from './picture.service';
import { AlertError } from 'app/shared/alert/alert-error.model';
import { IAlbum } from 'app/shared/model/album.model';
import { AlbumService } from 'app/entities/album/album.service';

@Component({
  selector: 'jhi-picture-update',
  templateUrl: './picture-update.component.html'
})
export class PictureUpdateComponent implements OnInit {
  isSaving = false;
  albums: IAlbum[] = [];

  editForm = this.fb.group({
    id: [],
    data: [],
    dataContentType: [],
    album: []
  });

  constructor(
    protected dataUtils: JhiDataUtils,
    protected eventManager: JhiEventManager,
    protected pictureService: PictureService,
    protected albumService: AlbumService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ picture }) => {
      this.updateForm(picture);

      this.albumService.query().subscribe((res: HttpResponse<IAlbum[]>) => (this.albums = res.body || []));
    });
  }

  updateForm(picture: IPicture): void {
    this.editForm.patchValue({
      id: picture.id,
      data: picture.data,
      dataContentType: picture.dataContentType,
      album: picture.album
    });
  }

  byteSize(base64String: string): string {
    return this.dataUtils.byteSize(base64String);
  }

  openFile(contentType: string, base64String: string): void {
    this.dataUtils.openFile(contentType, base64String);
  }

  setFileData(event: Event, field: string, isImage: boolean): void {
    this.dataUtils.loadFileToForm(event, this.editForm, field, isImage).subscribe(null, (err: JhiFileLoadError) => {
      this.eventManager.broadcast(
        new JhiEventWithContent<AlertError>('jaworznoApp.error', { ...err, key: 'error.file.' + err.key })
      );
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const picture = this.createFromForm();
    if (picture.id !== undefined) {
      this.subscribeToSaveResponse(this.pictureService.update(picture));
    } else {
      this.subscribeToSaveResponse(this.pictureService.create(picture));
    }
  }

  private createFromForm(): IPicture {
    return {
      ...new Picture(),
      id: this.editForm.get(['id'])!.value,
      dataContentType: this.editForm.get(['dataContentType'])!.value,
      data: this.editForm.get(['data'])!.value,
      album: this.editForm.get(['album'])!.value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IPicture>>): void {
    result.subscribe(
      () => this.onSaveSuccess(),
      () => this.onSaveError()
    );
  }

  protected onSaveSuccess(): void {
    this.isSaving = false;
    this.previousState();
  }

  protected onSaveError(): void {
    this.isSaving = false;
  }

  trackById(index: number, item: IAlbum): any {
    return item.id;
  }
}

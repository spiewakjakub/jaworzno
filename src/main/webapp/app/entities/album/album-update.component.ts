import { HttpResponse } from '@angular/common/http';
import { Component, ElementRef, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AlertError } from 'app/shared/alert/alert-error.model';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';

import { Album, IAlbum } from 'app/shared/model/album.model';
import { IPicture } from 'app/shared/model/picture.model';
import * as moment from 'moment';
import { JhiDataUtils, JhiEventManager, JhiEventWithContent, JhiFileLoadError } from 'ng-jhipster';
import { Observable } from 'rxjs';
import { AlbumService } from './album.service';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { PicturePreviewComponent } from 'app/entities/album/picture-preview/picture-preview.component';

@Component({
  selector: 'jhi-album-update',
  templateUrl: './album-update.component.html',
  styleUrls: ['./album-update.component.scss']
})
export class AlbumUpdateComponent implements OnInit {
  isSaving = false;
  editForm = this.fb.group({
    id: [],
    title: [],
    date: [],
    mainPicture: [],
    mainPictureContentType: [],
    pictures: this.fb.array([])
  });

  constructor(
    protected dataUtils: JhiDataUtils,
    protected eventManager: JhiEventManager,
    protected albumService: AlbumService,
    protected elementRef: ElementRef,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder,
    protected modalService: NgbModal
  ) {}

  get pictures(): FormArray {
    return this.editForm.get('pictures') as FormArray;
  }

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ album }) => {
      if (!album.id) {
        album.date = moment().startOf('day');
      }
      this.updateForm(album);
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

  clearInputImage(field: string, fieldContentType: string, idInput: string): void {
    this.editForm.patchValue({
      [field]: null,
      [fieldContentType]: null
    });
    if (this.elementRef && idInput && this.elementRef.nativeElement.querySelector('#' + idInput)) {
      this.elementRef.nativeElement.querySelector('#' + idInput).value = null;
    }
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const album = this.createFromForm();
    if (album.id !== undefined) {
      this.subscribeToSaveResponse(this.albumService.update(album));
    } else {
      this.subscribeToSaveResponse(this.albumService.create(album));
    }
  }

  updateForm(album: IAlbum): void {
    this.editForm.patchValue({
      id: album.id,
      title: album.title,
      date: album.date ? album.date.format(DATE_TIME_FORMAT) : null,
      mainPicture: album.mainPicture,
      mainPictureContentType: album.mainPictureContentType
    });
    if (album.pictures) {
      for (let i = 0; i < album.pictures.length; i++) {
        this.pictures.push(new FormControl(album.pictures[i]));
      }
    }
  }

  addAlbumPictures($event: any): void {
    for (let i = 0; i < $event.target.files.length; i++) {
      const reader = new FileReader();
      const file = $event.target.files[i];
      let blob: string;
      reader.onload = () => {
        blob = reader.result as string;
        const index = blob.indexOf(';');
        const picture: IPicture = {
          dataContentType: blob.substring(5, index),
          data: blob.substring(index + 8),
          album: {
            id: +this.activatedRoute.snapshot.paramMap.get('id')!
          }
        };
        this.pictures.push(this.fb.control(picture));
      };
      reader.readAsDataURL(file);
    }
  }

  onPictureDeleteClick(i: number): void {
    this.pictures.removeAt(i);
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IAlbum>>): void {
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

  private createFromForm(): IAlbum {
    return {
      ...new Album(),
      id: this.editForm.get(['id'])!.value,
      title: this.editForm.get(['title'])!.value,
      date: this.editForm.get(['date'])!.value ? moment(this.editForm.get(['date'])!.value, DATE_TIME_FORMAT) : undefined,
      mainPicture: this.editForm.get(['mainPicture'])!.value,
      mainPictureContentType: this.editForm.get(['mainPictureContentType'])!.value,
      pictures: this.editForm.get(['pictures'])!.value
    };
  }

  openImagePreview(picture: IPicture): void {
    const modalRef = this.modalService.open(PicturePreviewComponent, { centered: true });
    const modalInstance: PicturePreviewComponent = modalRef.componentInstance;
    modalInstance.modalRef = modalRef;
    modalInstance.picture = picture;
  }
}

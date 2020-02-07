import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { JhiDataUtils, JhiFileLoadError, JhiEventManager, JhiEventWithContent } from 'ng-jhipster';

import { IPoster, Poster } from 'app/shared/model/poster.model';
import { PosterService } from './poster.service';
import { AlertError } from 'app/shared/alert/alert-error.model';

@Component({
  selector: 'jhi-poster-update',
  templateUrl: './poster-update.component.html'
})
export class PosterUpdateComponent implements OnInit {
  isSaving = false;

  editForm = this.fb.group({
    id: [],
    data: [],
    dataContentType: [],
    link: []
  });

  constructor(
    protected dataUtils: JhiDataUtils,
    protected eventManager: JhiEventManager,
    protected posterService: PosterService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ poster }) => {
      this.updateForm(poster);
    });
  }

  updateForm(poster: IPoster): void {
    this.editForm.patchValue({
      id: poster.id,
      data: poster.data,
      dataContentType: poster.dataContentType,
      link: poster.link
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
    const poster = this.createFromForm();
    if (poster.id !== undefined) {
      this.subscribeToSaveResponse(this.posterService.update(poster));
    } else {
      this.subscribeToSaveResponse(this.posterService.create(poster));
    }
  }

  private createFromForm(): IPoster {
    return {
      ...new Poster(),
      id: this.editForm.get(['id'])!.value,
      dataContentType: this.editForm.get(['dataContentType'])!.value,
      data: this.editForm.get(['data'])!.value,
      link: this.editForm.get(['link'])!.value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IPoster>>): void {
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
}

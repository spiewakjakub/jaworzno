import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { JhiDataUtils, JhiFileLoadError, JhiEventManager, JhiEventWithContent } from 'ng-jhipster';

import { ISponsor, Sponsor } from 'app/shared/model/sponsor.model';
import { SponsorService } from './sponsor.service';
import { AlertError } from 'app/shared/alert/alert-error.model';

@Component({
  selector: 'jhi-sponsor-update',
  templateUrl: './sponsor-update.component.html'
})
export class SponsorUpdateComponent implements OnInit {
  isSaving = false;

  editForm = this.fb.group({
    id: [],
    logo: [],
    logoContentType: [],
    name: [],
    link: []
  });

  constructor(
    protected dataUtils: JhiDataUtils,
    protected eventManager: JhiEventManager,
    protected sponsorService: SponsorService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ sponsor }) => {
      this.updateForm(sponsor);
    });
  }

  updateForm(sponsor: ISponsor): void {
    this.editForm.patchValue({
      id: sponsor.id,
      logo: sponsor.logo,
      logoContentType: sponsor.logoContentType,
      name: sponsor.name,
      link: sponsor.link
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
    const sponsor = this.createFromForm();
    if (sponsor.id !== undefined) {
      this.subscribeToSaveResponse(this.sponsorService.update(sponsor));
    } else {
      this.subscribeToSaveResponse(this.sponsorService.create(sponsor));
    }
  }

  private createFromForm(): ISponsor {
    return {
      ...new Sponsor(),
      id: this.editForm.get(['id'])!.value,
      logoContentType: this.editForm.get(['logoContentType'])!.value,
      logo: this.editForm.get(['logo'])!.value,
      name: this.editForm.get(['name'])!.value,
      link: this.editForm.get(['link'])!.value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ISponsor>>): void {
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

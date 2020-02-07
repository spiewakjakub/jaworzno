import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';

import { IPlace, Place } from 'app/shared/model/place.model';
import { PlaceService } from './place.service';

@Component({
  selector: 'jhi-place-update',
  templateUrl: './place-update.component.html'
})
export class PlaceUpdateComponent implements OnInit {
  isSaving = false;

  editForm = this.fb.group({
    id: [],
    date: [],
    name: [],
    link: []
  });

  constructor(protected placeService: PlaceService, protected activatedRoute: ActivatedRoute, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ place }) => {
      if (!place.id) {
        const today = moment().startOf('day');
        place.date = today;
      }

      this.updateForm(place);
    });
  }

  updateForm(place: IPlace): void {
    this.editForm.patchValue({
      id: place.id,
      date: place.date ? place.date.format(DATE_TIME_FORMAT) : null,
      name: place.name,
      link: place.link
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const place = this.createFromForm();
    if (place.id !== undefined) {
      this.subscribeToSaveResponse(this.placeService.update(place));
    } else {
      this.subscribeToSaveResponse(this.placeService.create(place));
    }
  }

  private createFromForm(): IPlace {
    return {
      ...new Place(),
      id: this.editForm.get(['id'])!.value,
      date: this.editForm.get(['date'])!.value ? moment(this.editForm.get(['date'])!.value, DATE_TIME_FORMAT) : undefined,
      name: this.editForm.get(['name'])!.value,
      link: this.editForm.get(['link'])!.value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IPlace>>): void {
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

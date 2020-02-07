import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';

import { INews, News } from 'app/shared/model/news.model';
import { NewsService } from './news.service';

@Component({
  selector: 'jhi-news-update',
  templateUrl: './news-update.component.html'
})
export class NewsUpdateComponent implements OnInit {
  isSaving = false;

  editForm = this.fb.group({
    id: [],
    title: [],
    content: [],
    date: [],
    description: []
  });

  constructor(protected newsService: NewsService, protected activatedRoute: ActivatedRoute, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ news }) => {
      if (!news.id) {
        const today = moment().startOf('day');
        news.date = today;
      }

      this.updateForm(news);
    });
  }

  updateForm(news: INews): void {
    this.editForm.patchValue({
      id: news.id,
      title: news.title,
      content: news.content,
      date: news.date ? news.date.format(DATE_TIME_FORMAT) : null,
      description: news.description
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const news = this.createFromForm();
    if (news.id !== undefined) {
      this.subscribeToSaveResponse(this.newsService.update(news));
    } else {
      this.subscribeToSaveResponse(this.newsService.create(news));
    }
  }

  private createFromForm(): INews {
    return {
      ...new News(),
      id: this.editForm.get(['id'])!.value,
      title: this.editForm.get(['title'])!.value,
      content: this.editForm.get(['content'])!.value,
      date: this.editForm.get(['date'])!.value ? moment(this.editForm.get(['date'])!.value, DATE_TIME_FORMAT) : undefined,
      description: this.editForm.get(['description'])!.value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<INews>>): void {
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

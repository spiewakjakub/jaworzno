import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { JhiDataUtils } from 'ng-jhipster';

import { INews } from 'app/shared/model/news.model';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'jhi-news-detail',
  templateUrl: './news-detail.component.html'
})
export class NewsDetailComponent implements OnInit {
  news: INews | null = null;

  constructor(protected dataUtils: JhiDataUtils, protected activatedRoute: ActivatedRoute, private sanitizer: DomSanitizer) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ news }) => {
      this.news = news;
      if (this.news) {
        this.news.content = this.sanitizer.bypassSecurityTrustHtml(news.content);
      }
    });
  }

  byteSize(base64String: string): string {
    return this.dataUtils.byteSize(base64String);
  }

  openFile(contentType: string, base64String: string): void {
    this.dataUtils.openFile(contentType, base64String);
  }

  previousState(): void {
    window.history.back();
  }

  transformHtml(htmlWithStyle: any): any {
    return this.sanitizer.bypassSecurityTrustHtml(htmlWithStyle);
  }
}

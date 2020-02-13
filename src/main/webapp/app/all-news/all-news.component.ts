import { Component, OnInit } from '@angular/core';
import { NewsService } from 'app/entities/news/news.service';
import { INews, News } from 'app/shared/model/news.model';

@Component({
  selector: 'jhi-all-news',
  templateUrl: './all-news.component.html',
  styleUrls: ['./all-news.component.scss']
})
export class AllNewsComponent implements OnInit {
  newsArray: INews[] | null = [];
  page = 1;
  pageSize = 8;
  totalElements = 0;

  constructor(private newsService: NewsService) {}

  ngOnInit(): void {
    this.loadPage(this.page);
  }

  onElementClick(news: News): void {
    // eslint-disable-next-line no-console
    console.debug(news);
  }

  loadPage($event: number): void {
    this.page = $event - 1;
    this.newsService.getPage(this.page, this.pageSize).subscribe(
      response => {
        this.totalElements = response.body.totalElements;
        this.newsArray = response.body.content;
      },
      error => {
        console.error(error);
      }
    );
  }
}

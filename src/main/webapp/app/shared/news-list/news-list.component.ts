import { Component, Input, OnInit } from '@angular/core';
import { NewsService } from 'app/entities/news/news.service';
import { News } from 'app/shared/model/news.model';

@Component({
  selector: 'jhi-news-list',
  templateUrl: './news-list.component.html',
  styleUrls: ['./news-list.component.scss']
})
export class NewsListComponent implements OnInit {
  newsArray: News[] = [];

  page = 1;
  @Input() isPaginated = false;
  @Input() size = 0;
  totalElements = 0;

  constructor(private newsService: NewsService) {}

  ngOnInit(): void {
    this.loadPage(this.page);
  }

  loadPage($event: number): void {
    this.page = $event - 1;
    this.newsService.getPage(this.page, this.size).subscribe(
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

import { Component, OnInit } from '@angular/core';
import { NewsService } from 'app/entities/news/news.service';
import { News } from 'app/shared/model/news.model';

@Component({
  selector: 'jhi-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.scss']
})
export class NewsComponent implements OnInit {
  newsArray: News[] = [];

  constructor(private newsService: NewsService) {}

  ngOnInit(): void {
    this.newsService.query().subscribe(
      response => {
        this.newsArray = (response.body as []).slice(0, 4);
      },
      error => {
        console.error(error);
      }
    );
  }

  onElementClick(news: News): void {
    // eslint-disable-next-line no-console
    console.debug(news);
  }
}

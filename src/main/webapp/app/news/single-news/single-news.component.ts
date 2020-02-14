import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NewsService } from 'app/entities/news/news.service';
import { INews } from 'app/shared/model/news.model';

@Component({
  selector: 'jhi-single-news',
  templateUrl: './single-news.component.html',
  styleUrls: ['./single-news.component.scss']
})
export class SingleNewsComponent implements OnInit {
  news: INews | null = {};

  constructor(private activatedRoute: ActivatedRoute, private service: NewsService) {}

  ngOnInit(): void {
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    if (id) {
      this.getData(id);
    }
  }

  private getData(id: string): void {
    this.service.find(id).subscribe(
      response => {
        this.news = response.body;
      },
      error => console.error(error)
    );
  }
}

import { Component, OnInit } from '@angular/core';
import { Video } from 'app/shared/model/video.model';
import { VideoService } from 'app/entities/video/video.service';

@Component({
  selector: 'jhi-videos',
  templateUrl: './videos.component.html',
  styleUrls: ['./videos.component.scss']
})
export class VideosComponent implements OnInit {
  private readonly PAGE_SIZE = 4;
  videos?: Video[];
  page = 1;
  totalElements = 0;
  totalPages = 0;

  constructor(private videoService: VideoService) {}

  ngOnInit(): void {
    this.loadPage(1);
  }

  loadPage($event: number): void {
    this.page = $event - 1;
    this.videoService.getPage(this.page, this.PAGE_SIZE).subscribe(
      response => {
        const body = response.body;
        if (body) {
          this.totalElements = body.totalElements;
          this.videos = body.content;
          this.totalPages = body.totalPages;
        }
      },
      error => {
        console.error(error);
      }
    );
  }
}

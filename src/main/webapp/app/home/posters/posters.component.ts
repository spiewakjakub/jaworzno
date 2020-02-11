import { Component } from '@angular/core';
import { PosterService } from 'app/entities/poster/poster.service';
import { Poster } from 'app/shared/model/poster.model';

@Component({
  selector: 'jhi-posters',
  templateUrl: './posters.component.html',
  styleUrls: ['./posters.component.scss']
})
export class PostersComponent {
  posters: Poster[] = [];

  constructor(private posterService: PosterService) {
    posterService.query().subscribe(
      response => {
        this.posters = (response.body as []).slice(0, 4);
      },
      error => {
        console.error(error);
      }
    );
  }

  onPosterClick(link: string): void {
    window.open(link, '_blank');
  }
}

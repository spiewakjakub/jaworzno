import { Component } from '@angular/core';
import { PosterService } from 'app/entities/poster/poster.service';
import { Poster } from 'app/shared/model/poster.model';

@Component({
  selector: 'jhi-posters',
  templateUrl: './posters.component.html',
  styleUrls: ['./posters.component.scss']
})
export class PostersComponent {
  posters: Poster[] | null = [];

  constructor(posterService: PosterService) {
    posterService.query().subscribe(response => {
      // eslint-disable-next-line no-console
      console.log(response.body);
      this.posters = response.body;
    });
  }
}

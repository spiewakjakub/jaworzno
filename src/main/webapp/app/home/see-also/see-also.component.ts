import { Component, OnInit } from '@angular/core';
import { AlbumService } from 'app/entities/album/album.service';
import { Album } from 'app/shared/model/album.model';

@Component({
  selector: 'jhi-see-also',
  templateUrl: './see-also.component.html',
  styleUrls: ['./see-also.component.scss']
})
export class SeeAlsoComponent implements OnInit {
  album?: Album;

  constructor(private albumService: AlbumService) {}

  ngOnInit(): void {
    this.albumService.query().subscribe(album => {
      if (album.body) {
        this.album = album.body[0];
      }
    });
  }
}

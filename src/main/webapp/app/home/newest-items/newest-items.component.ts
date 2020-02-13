import { Component, OnInit } from '@angular/core';
import { AlbumService } from 'app/entities/album/album.service';
import { PictureService } from 'app/entities/picture/picture.service';
import { Album } from 'app/shared/model/album.model';

@Component({
  selector: 'jhi-newest-items',
  templateUrl: './newest-items.component.html',
  styleUrls: ['./newest-items.component.scss']
})
export class NewestItemsComponent implements OnInit {
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

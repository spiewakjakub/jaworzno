import { Component, OnInit } from '@angular/core';
import { AlbumService } from 'app/entities/album/album.service';
import { PictureService } from 'app/entities/picture/picture.service';
import { IAlbum } from 'app/shared/model/album.model';

@Component({
  selector: 'jhi-newest-items',
  templateUrl: './newest-items.component.html',
  styleUrls: ['./newest-items.component.scss']
})
export class NewestItemsComponent implements OnInit {
  constructor(private albumService: AlbumService, private pictureService: PictureService) {}

  ngOnInit(): void {
    // TODO: make service method to get main photo from album
  }
}

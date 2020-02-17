import { Component, OnInit } from '@angular/core';
import { AlbumTitleService } from 'app/albums/album-title.service';
import { AlbumService } from 'app/entities/album/album.service';
import { IAlbum } from 'app/shared/model/album.model';

@Component({
  selector: 'jhi-albums',
  templateUrl: './albums.component.html',
  styleUrls: ['./albums.component.scss']
})
export class AlbumsComponent implements OnInit {
  page = 1;
  size = 8;
  totalElements = 0;
  totalPages = 0;
  private albums?: IAlbum[] | null;

  constructor(private albumService: AlbumService, private albumTitleService: AlbumTitleService) {}

  ngOnInit(): void {
    this.loadPage(1);
  }

  loadPage($event: number): void {
    this.page = $event - 1;
    this.albumService.getPage(this.page, this.size).subscribe(
      response => {
        if (response.body) {
          this.totalElements = response.body.length;
          this.albums = response.body;
          this.totalPages = Math.ceil(response.body.length / this.size);
        }
      },
      error => {
        console.error(error);
      }
    );
  }

  passAlbumTitle(title: string): void {
    this.albumTitleService.title = title;
  }
}

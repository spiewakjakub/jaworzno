import { Component, OnInit } from '@angular/core';
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

  constructor(private albumService: AlbumService) {}

  ngOnInit(): void {
    this.albumService.query().subscribe(
      response => {
        this.albums = response.body;
      },
      error => console.error(error)
    );
  }

  loadPage($event: number): void {
    this.page = $event - 1;
    this.albumService.getPage(this.page, this.size).subscribe(
      response => {
        this.totalElements = response.body.totalElements;
        this.albums = response.body.content;
        this.totalPages = response.body.totalPages;
      },
      error => {
        console.error(error);
      }
    );
  }
}

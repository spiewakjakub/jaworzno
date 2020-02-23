import { Component, OnInit } from '@angular/core';
import { AlbumService } from 'app/entities/album/album.service';
import { Album } from 'app/shared/model/album.model';

@Component({
  selector: 'jhi-see-also',
  templateUrl: './see-also.component.html',
  styleUrls: ['./see-also.component.scss']
})
export class SeeAlsoComponent implements OnInit {
  private album?: Album;

  constructor(private albumService: AlbumService) {}

  ngOnInit(): void {
    this.albumService.getNewest().subscribe(album => {
      this.album = album;
    });
  }
}

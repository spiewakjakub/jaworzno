import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AlbumService } from 'app/entities/album/album.service';
import { Album, IAlbum } from 'app/shared/model/album.model';
import { Picture } from 'app/shared/model/picture.model';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PictureModalComponent } from 'app/albums/picture-modal/picture-modal.component';

@Component({
  selector: 'jhi-single-album',
  templateUrl: './single-album.component.html',
  styleUrls: ['./single-album.component.scss']
})
export class SingleAlbumComponent implements OnInit {
  private album: IAlbum = new Album();
  private pictures: Picture[] = [];
  private currentIndex = 0;

  constructor(private routerOutlet: RouterOutlet, private albumService: AlbumService, private ngbModal: NgbModal) {}

  ngOnInit(): void {
    const id = this.routerOutlet.activatedRoute.snapshot.paramMap.get('id');
    this.albumService.find(Number.parseInt(id as string, 10)).subscribe(albumResponse => {
      this.album = albumResponse.body as IAlbum;
      this.pictures = this.album.pictures as Picture[];
    });
  }

  showModal(index: number): void {
    const modalRef = this.ngbModal.open(PictureModalComponent, {
      centered: true
    });
    modalRef.componentInstance.picture = this.pictures[index];
    this.currentIndex = index;

    modalRef.componentInstance.pictureClick$.subscribe(btn => {
      if (btn === 'NEXT') {
        this.currentIndex++;
      } else {
        this.currentIndex--;
      }

      if (this.currentIndex === this.pictures.length) {
        this.currentIndex = 0;
      }
      if (this.currentIndex < 0) {
        this.currentIndex = this.pictures.length - 1;
      }

      modalRef.componentInstance.picture = this.pictures[this.currentIndex];
    });
  }
}

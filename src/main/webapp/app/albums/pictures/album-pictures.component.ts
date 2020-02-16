import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AlbumService } from 'app/entities/album/album.service';
import { PictureService } from 'app/entities/picture/picture.service';
import { IPicture } from 'app/shared/model/picture.model';
import { PictureModalComponent } from 'app/albums/picture-modal/picture-modal.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AlbumTitleService } from 'app/albums/album-title.service';

@Component({
  selector: 'jhi-pictures',
  templateUrl: './album-pictures.component.html',
  styleUrls: ['./album-pictures.component.scss']
})
export class AlbumPicturesComponent implements OnInit {
  page = 1;
  size = 8;
  totalElements = 0;
  totalPages = 0;
  albumTitle: string | undefined = '';
  private pictures: IPicture[] = [];
  private currentIndex = 0;

  constructor(
    private router: ActivatedRoute,
    private albumService: AlbumService,
    private pictureService: PictureService,
    private albumTitleService: AlbumTitleService,
    private ngbModal: NgbModal
  ) {}

  ngOnInit(): void {
    this.albumTitle = this.albumTitleService.title;
    const id = this.router.snapshot.paramMap.get('id');
    if (id) {
      this.loadPage(1);
    }
  }

  loadPage($event: number): void {
    const id = this.router.snapshot.paramMap.get('id');
    this.page = $event - 1;
    if (id) {
      this.pictureService.findByAlbumId(id, this.page, this.size).subscribe(
        response => {
          if (response.body) {
            // eslint-disable-next-line no-console
            console.log(response);
            this.pictures = response.body.content;
            this.totalElements = response.body.content.length;
            this.totalPages = Math.ceil(response.body.content.length / this.size);
          }
        },
        error => {
          console.error(error);
        }
      );
    }
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

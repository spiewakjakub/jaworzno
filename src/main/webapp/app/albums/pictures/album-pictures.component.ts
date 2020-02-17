import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AlbumTitleService } from 'app/albums/album-title.service';
import { PictureModalComponent } from 'app/albums/picture-modal/picture-modal.component';
import { AlbumService } from 'app/entities/album/album.service';
import { PictureService } from 'app/entities/picture/picture.service';
import { IPicture } from 'app/shared/model/picture.model';

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
  id?: string | null;
  private pictures: IPicture[] = [];
  private currentIndex = 0;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private albumService: AlbumService,
    private pictureService: PictureService,
    private albumTitleService: AlbumTitleService,
    private ngbModal: NgbModal
  ) {}

  ngOnInit(): void {
    this.albumTitle = this.albumTitleService.title;
    this.id = this.activatedRoute.snapshot.paramMap.get('id');
    if (this.id) {
      this.loadPage(1);
    } else {
      this.router.navigate(['/albums']);
    }
  }

  loadPage($event: number): void {
    this.page = $event - 1;
    this.pictureService.findByAlbumId(this.id as string, this.page, this.size).subscribe(
      response => {
        if (response.body) {
          this.pictures = response.body.content;
          this.totalElements = response.body.totalElements;
          this.totalPages = response.body.totalPages;
        }
      },
      error => {
        console.error(error);
      }
    );
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

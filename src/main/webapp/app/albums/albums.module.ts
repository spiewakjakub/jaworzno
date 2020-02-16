import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AlbumsComponent } from 'app/albums/albums.component';
import { JaworznoSharedModule } from 'app/shared/shared.module';
import { AlbumPicturesComponent } from './pictures/album-pictures.component';
import { PictureModalComponent } from './picture-modal/picture-modal.component';
import { AlbumTitleService } from 'app/albums/album-title.service';

const routes: Routes = [
  { path: '', component: AlbumsComponent },
  { path: ':id', component: AlbumPicturesComponent }
];

@NgModule({
  declarations: [AlbumsComponent, AlbumPicturesComponent, PictureModalComponent],
  imports: [CommonModule, RouterModule.forChild(routes), JaworznoSharedModule],
  providers: [AlbumTitleService],
  entryComponents: [PictureModalComponent]
})
export class AlbumsModule {}

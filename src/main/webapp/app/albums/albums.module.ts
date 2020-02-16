import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AlbumsComponent } from 'app/albums/albums.component';
import { JaworznoSharedModule } from 'app/shared/shared.module';
import { SingleAlbumComponent } from './single-album/single-album.component';
import { PictureModalComponent } from './picture-modal/picture-modal.component';

const routes: Routes = [
  { path: '', component: AlbumsComponent },
  { path: ':id', component: SingleAlbumComponent }
];

@NgModule({
  declarations: [AlbumsComponent, SingleAlbumComponent, PictureModalComponent],
  imports: [CommonModule, RouterModule.forChild(routes), JaworznoSharedModule],
  entryComponents: [PictureModalComponent]
})
export class AlbumsModule {}

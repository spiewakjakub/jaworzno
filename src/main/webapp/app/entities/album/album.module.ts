import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { JaworznoSharedModule } from 'app/shared/shared.module';
import { AlbumComponent } from './album.component';
import { AlbumDetailComponent } from './album-detail.component';
import { AlbumUpdateComponent } from './album-update.component';
import { AlbumDeleteDialogComponent } from './album-delete-dialog.component';
import { albumRoute } from './album.route';
import { PictureDeleteDialogComponent } from 'app/entities/album/picture-delete-dialog.component';

@NgModule({
  imports: [JaworznoSharedModule, RouterModule.forChild(albumRoute)],
  declarations: [AlbumComponent, AlbumDetailComponent, AlbumUpdateComponent, AlbumDeleteDialogComponent, PictureDeleteDialogComponent],
  entryComponents: [AlbumDeleteDialogComponent, PictureDeleteDialogComponent]
})
export class JaworznoAlbumModule {}

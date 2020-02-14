import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AlbumsComponent } from 'app/albums/albums.component';
import { JaworznoSharedModule } from 'app/shared/shared.module';

const routes: Routes = [{ path: '', component: AlbumsComponent }];

@NgModule({
  declarations: [AlbumsComponent],
  imports: [CommonModule, RouterModule.forChild(routes), JaworznoSharedModule]
})
export class AlbumsModule {}

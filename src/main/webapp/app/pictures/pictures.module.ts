import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PicturesComponent } from 'app/pictures/pictures.component';

const routes: Routes = [{ path: '', component: PicturesComponent }];

@NgModule({
  declarations: [PicturesComponent],
  imports: [CommonModule, RouterModule.forChild(routes)]
})
export class PicturesModule {}

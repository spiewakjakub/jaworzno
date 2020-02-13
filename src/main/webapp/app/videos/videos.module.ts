import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VideosComponent } from 'app/videos/videos.component';

const routes: Routes = [{ path: '', component: VideosComponent }];

@NgModule({
  declarations: [VideosComponent],
  imports: [CommonModule, RouterModule.forChild(routes)]
})
export class VideosModule {}

import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { JaworznoSharedModule } from 'app/shared/shared.module';
import { HomeComponent } from './home.component';
import { HOME_ROUTE } from './home.route';
import { PosterComponent } from './posters/poster/poster.component';
import { PostersComponent } from './posters/posters.component';

@NgModule({
  imports: [JaworznoSharedModule, RouterModule.forChild([HOME_ROUTE])],
  exports: [PostersComponent],
  declarations: [HomeComponent, PostersComponent, PosterComponent]
})
export class JaworznoHomeModule {}

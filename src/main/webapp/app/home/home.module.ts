import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { JaworznoSharedModule } from 'app/shared/shared.module';
import { HOME_ROUTE } from './home.route';
import { HomeComponent } from './home.component';
import { CarouselComponent } from './carousel/carousel.component';
import { PlacesComponent } from './places/places.component';
import { PlaceItemComponent } from './places/place-item/place-item.component';
import { PosterComponent } from './posters/poster/poster.component';
import { PostersComponent } from './posters/posters.component';

@NgModule({
  imports: [JaworznoSharedModule, RouterModule.forChild([HOME_ROUTE])],
  declarations: [HomeComponent, CarouselComponent, PlacesComponent, PlaceItemComponent, PostersComponent, PosterComponent]
})
export class JaworznoHomeModule {}

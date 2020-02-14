import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { JaworznoSharedModule } from 'app/shared/shared.module';
import { CarouselComponent } from './carousel/carousel.component';
import { HomeComponent } from './home.component';
import { HOME_ROUTE } from './home.route';
import { PlaceItemComponent } from './places/place-item/place-item.component';
import { PlacesComponent } from './places/places.component';
import { PosterComponent } from './posters/poster/poster.component';
import { PostersComponent } from './posters/posters.component';
import { SeeAlsoComponent } from './see-also/see-also.component';

@NgModule({
  imports: [JaworznoSharedModule, RouterModule.forChild([HOME_ROUTE])],
  declarations: [HomeComponent, CarouselComponent, PlacesComponent, PlaceItemComponent, PostersComponent, PosterComponent, SeeAlsoComponent]
})
export class JaworznoHomeModule {}

import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { JaworznoSharedModule } from 'app/shared/shared.module';
import { HOME_ROUTE } from './home.route';
import { HomeComponent } from './home.component';
import { CarouselComponent } from './carousel/carousel.component';
import { PlacesComponent } from './places/places.component';
import { PlaceItemComponent } from './places/place-item/place-item.component';

@NgModule({
  imports: [JaworznoSharedModule, RouterModule.forChild([HOME_ROUTE])],
  declarations: [HomeComponent, CarouselComponent, PlacesComponent, PlaceItemComponent]
})
export class JaworznoHomeModule {}

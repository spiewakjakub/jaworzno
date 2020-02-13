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
import { NewsComponent } from './news/news.component';
import { HomeTitleComponent } from './home-title/home-title.component';
import { NewestItemsComponent } from './newest-items/newest-items.component';
import { HomeCardComponent } from './home-card/home-card.component';

@NgModule({
  imports: [JaworznoSharedModule, RouterModule.forChild([HOME_ROUTE])],
  declarations: [
    HomeComponent,
    CarouselComponent,
    PlacesComponent,
    PlaceItemComponent,
    PostersComponent,
    PosterComponent,
    NewsComponent,
    HomeTitleComponent,
    NewestItemsComponent,
    HomeCardComponent
  ]
})
export class JaworznoHomeModule {}

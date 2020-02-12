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
import { SingleNewsComponent } from './news/single-news/single-news.component';
import { HomeTitleComponent } from './home-title/home-title.component';
import { VideoComponent } from './newest-items/video/video.component';
import { NewestItemsComponent } from './newest-items/newest-items.component';

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
    SingleNewsComponent,
    HomeTitleComponent,
    VideoComponent,
    NewestItemsComponent
  ]
})
export class JaworznoHomeModule {}

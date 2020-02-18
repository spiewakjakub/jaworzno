import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'admin/news',
        loadChildren: () => import('./news/news.module').then(m => m.JaworznoNewsModule)
      },
      {
        path: 'admin/place',
        loadChildren: () => import('./place/place.module').then(m => m.JaworznoPlaceModule)
      },
      {
        path: 'admin/poster',
        loadChildren: () => import('./poster/poster.module').then(m => m.JaworznoPosterModule)
      },
      {
        path: 'admin/video',
        loadChildren: () => import('./video/video.module').then(m => m.JaworznoVideoModule)
      },
      {
        path: 'admin/picture',
        loadChildren: () => import('./picture/picture.module').then(m => m.JaworznoPictureModule)
      },
      {
        path: 'admin/album',
        loadChildren: () => import('./album/album.module').then(m => m.JaworznoAlbumModule)
      },
      {
        path: 'admin/sponsor',
        loadChildren: () => import('./sponsor/sponsor.module').then(m => m.JaworznoSponsorModule)
      },
      {
        path: 'slider',
        loadChildren: () => import('./slider/slider.module').then(m => m.JaworznoSliderModule)
      }
      /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
    ])
  ]
})
export class JaworznoEntityModule {}

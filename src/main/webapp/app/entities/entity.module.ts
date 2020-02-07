import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'news',
        loadChildren: () => import('./news/news.module').then(m => m.JaworznoNewsModule)
      },
      {
        path: 'place',
        loadChildren: () => import('./place/place.module').then(m => m.JaworznoPlaceModule)
      },
      {
        path: 'poster',
        loadChildren: () => import('./poster/poster.module').then(m => m.JaworznoPosterModule)
      },
      {
        path: 'video',
        loadChildren: () => import('./video/video.module').then(m => m.JaworznoVideoModule)
      },
      {
        path: 'picture',
        loadChildren: () => import('./picture/picture.module').then(m => m.JaworznoPictureModule)
      },
      {
        path: 'album',
        loadChildren: () => import('./album/album.module').then(m => m.JaworznoAlbumModule)
      },
      {
        path: 'sponsor',
        loadChildren: () => import('./sponsor/sponsor.module').then(m => m.JaworznoSponsorModule)
      }
      /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
    ])
  ]
})
export class JaworznoEntityModule {}

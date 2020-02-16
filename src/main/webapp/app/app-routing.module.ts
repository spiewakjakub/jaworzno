import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DEBUG_INFO_ENABLED } from 'app/app.constants';

import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { errorRoute } from './layouts/error/error.route';
import { navbarRoute } from './layouts/navbar/navbar.route';

const LAYOUT_ROUTES = [navbarRoute, ...errorRoute];

@NgModule({
  imports: [
    RouterModule.forRoot(
      [
        {
          path: 'admin',
          data: {
            authorities: ['ROLE_ADMIN']
          },
          canActivate: [UserRouteAccessService],
          loadChildren: () => import('./admin/admin-routing.module').then(m => m.AdminRoutingModule)
        },
        {
          path: 'account',
          loadChildren: () => import('./account/account.module').then(m => m.AccountModule)
        },
        {
          path: 'news',
          loadChildren: () => import('./news/news.module').then(module => module.NewsModule)
        },
        {
          path: 'organizer',
          loadChildren: () => import('./organizer/organizer.module').then(module => module.OrganizerModule)
        },
        {
          path: 'voluntary',
          loadChildren: () => import('./voluntary/voluntary.module').then(module => module.VoluntaryModule)
        },
        {
          path: 'albums',
          loadChildren: () => import('./albums/albums.module').then(module => module.AlbumsModule)
        },
        {
          path: 'videos',
          loadChildren: () => import('./videos/videos.module').then(module => module.VideosModule)
        },
        {
          path: 'previous',
          loadChildren: () => import('./previous/previous.module').then(module => module.PreviousModule)
        },
        ...LAYOUT_ROUTES
      ],
      { enableTracing: DEBUG_INFO_ENABLED }
    )
  ],
  exports: [RouterModule]
})
export class JaworznoAppRoutingModule {}

import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IPoster, Poster } from 'app/shared/model/poster.model';
import { PosterService } from './poster.service';
import { PosterComponent } from './poster.component';
import { PosterDetailComponent } from './poster-detail.component';
import { PosterUpdateComponent } from './poster-update.component';

@Injectable({ providedIn: 'root' })
export class PosterResolve implements Resolve<IPoster> {
  constructor(private service: PosterService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IPoster> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((poster: HttpResponse<Poster>) => {
          if (poster.body) {
            return of(poster.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new Poster());
  }
}

export const posterRoute: Routes = [
  {
    path: '',
    component: PosterComponent,
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'jaworznoApp.poster.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: PosterDetailComponent,
    resolve: {
      poster: PosterResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'jaworznoApp.poster.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: PosterUpdateComponent,
    resolve: {
      poster: PosterResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'jaworznoApp.poster.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: PosterUpdateComponent,
    resolve: {
      poster: PosterResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'jaworznoApp.poster.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];

import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { JhiResolvePagingParams } from 'ng-jhipster';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { ISlider, Slider } from 'app/shared/model/slider.model';
import { SliderService } from './slider.service';
import { SliderComponent } from './slider.component';
import { SliderDetailComponent } from './slider-detail.component';
import { SliderUpdateComponent } from './slider-update.component';

@Injectable({ providedIn: 'root' })
export class SliderResolve implements Resolve<ISlider> {
  constructor(private service: SliderService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<ISlider> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((slider: HttpResponse<Slider>) => {
          if (slider.body) {
            return of(slider.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new Slider());
  }
}

export const sliderRoute: Routes = [
  {
    path: '',
    component: SliderComponent,
    resolve: {
      pagingParams: JhiResolvePagingParams
    },
    data: {
      authorities: ['ROLE_USER'],
      defaultSort: 'id,asc',
      pageTitle: 'jaworznoApp.slider.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: SliderDetailComponent,
    resolve: {
      slider: SliderResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'jaworznoApp.slider.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: SliderUpdateComponent,
    resolve: {
      slider: SliderResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'jaworznoApp.slider.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: SliderUpdateComponent,
    resolve: {
      slider: SliderResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'jaworznoApp.slider.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];

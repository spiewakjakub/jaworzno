import { Route } from '@angular/router';

import { HomeComponent } from './home.component';
import { CycleInfoComponent } from 'app/cycle-info/cycle-info.component';

export const HOME_ROUTE: Route[] = [
  {
    path: '',
    component: HomeComponent,
    data: {
      authorities: [],
      pageTitle: 'home.title'
    }
  },
  {
    path: 'cycle-info',
    component: CycleInfoComponent
  }
];

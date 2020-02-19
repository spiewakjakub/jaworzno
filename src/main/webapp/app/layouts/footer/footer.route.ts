import { Route } from '@angular/router';
import { FaqComponent } from 'app/faq/faq.component';
import { VoluntaryComponent } from 'app/voluntary/voluntary.component';
import { PrivacyPolicyComponent } from 'app/privacy-policy/privacy-policy.component';
import { MainRegulationsComponent } from 'app/main-regulations/main-regulations.component';

export const footerRoute: Route[] = [
  {
    path: 'faq',
    component: FaqComponent
  },
  {
    path: 'voluntary',
    component: VoluntaryComponent
  },
  {
    path: 'privacy-policy',
    component: PrivacyPolicyComponent
  },
  {
    path: 'main-regulations',
    component: MainRegulationsComponent
  }
];

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { JaworznoCoreModule } from 'app/core/core.module';
import { NewsModule } from 'app/news/news.module';
import { OrganizerModule } from 'app/organizer/organizer.module';
import { AlbumsModule } from 'app/albums/albums.module';
import { PreviousModule } from 'app/previous/previous.module';
import { JaworznoSharedModule } from 'app/shared/shared.module';
import { VideosModule } from 'app/videos/videos.module';
import { VoluntaryModule } from 'app/voluntary/voluntary.module';
import { JaworznoAppRoutingModule } from './app-routing.module';
import { JaworznoEntityModule } from './entities/entity.module';
import { JaworznoHomeModule } from './home/home.module';
import { ErrorComponent } from './layouts/error/error.component';
import { FooterComponent } from './layouts/footer/footer.component';
import { LogoBarComponent } from './layouts/logo-bar/logo-bar.component';
// jhipster-needle-angular-add-module-import JHipster will add new module here
import { MainComponent } from './layouts/main/main.component';
import { ActiveMenuDirective } from './layouts/navbar/active-menu.directive';
import { NavbarComponent } from './layouts/navbar/navbar.component';
import { PageRibbonComponent } from './layouts/profiles/page-ribbon.component';

import './vendor';
import { FaqComponent } from './faq/faq.component';
import { MainRegulationsComponent } from './main-regulations/main-regulations.component';
import { PrivacyPolicyComponent } from './privacy-policy/privacy-policy.component';

@NgModule({
  imports: [
    BrowserModule,
    JaworznoSharedModule,
    JaworznoCoreModule,
    JaworznoHomeModule,
    // jhipster-needle-angular-add-module JHipster will add new module here
    JaworznoEntityModule,
    JaworznoAppRoutingModule,
    NewsModule,
    OrganizerModule,
    VoluntaryModule,
    AlbumsModule,
    VideosModule,
    PreviousModule
  ],
  declarations: [
    MainComponent,
    NavbarComponent,
    ErrorComponent,
    PageRibbonComponent,
    ActiveMenuDirective,
    FooterComponent,
    LogoBarComponent,
    FaqComponent,
    MainRegulationsComponent,
    PrivacyPolicyComponent
  ],
  bootstrap: [MainComponent]
})
export class JaworznoAppModule {}

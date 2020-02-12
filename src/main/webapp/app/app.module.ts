import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AllNewsModule } from 'app/all-news/all-news.module';
import { JaworznoCoreModule } from 'app/core/core.module';
import { OrganizerModule } from 'app/organizer/organizer.module';
import { PicturesModule } from 'app/pictures/pictures.module';
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

@NgModule({
  imports: [
    BrowserModule,
    JaworznoSharedModule,
    JaworznoCoreModule,
    JaworznoHomeModule,
    // jhipster-needle-angular-add-module JHipster will add new module here
    JaworznoEntityModule,
    JaworznoAppRoutingModule,
    AllNewsModule,
    OrganizerModule,
    VoluntaryModule,
    PicturesModule,
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
    LogoBarComponent
  ],
  bootstrap: [MainComponent]
})
export class JaworznoAppModule {}

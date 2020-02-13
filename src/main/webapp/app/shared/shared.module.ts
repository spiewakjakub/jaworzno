import { NgModule } from '@angular/core';
import { JaworznoSharedLibsModule } from './shared-libs.module';
import { FindLanguageFromKeyPipe } from './language/find-language-from-key.pipe';
import { AlertComponent } from './alert/alert.component';
import { AlertErrorComponent } from './alert/alert-error.component';
import { LoginModalComponent } from './login/login.component';
import { HasAnyAuthorityDirective } from './auth/has-any-authority.directive';
import { SocialMediaComponent } from './social-media/social-media.component';
import { VideoComponent } from 'app/shared/video/video.component';
import { SingleNewsPreviewComponent } from 'app/shared/single-news-preview/single-news-preview.component';
import { PreviewCardComponent } from 'app/shared/preview-card/preview-card.component';
import { TitleComponent } from 'app/shared/title/title.component';

@NgModule({
  imports: [JaworznoSharedLibsModule],
  declarations: [
    FindLanguageFromKeyPipe,
    AlertComponent,
    AlertErrorComponent,
    LoginModalComponent,
    HasAnyAuthorityDirective,
    SocialMediaComponent,
    VideoComponent,
    SingleNewsPreviewComponent,
    PreviewCardComponent,
    TitleComponent
  ],
  entryComponents: [LoginModalComponent],
  exports: [
    JaworznoSharedLibsModule,
    FindLanguageFromKeyPipe,
    AlertComponent,
    AlertErrorComponent,
    LoginModalComponent,
    HasAnyAuthorityDirective,
    SocialMediaComponent,
    SingleNewsPreviewComponent,
    VideoComponent,
    PreviewCardComponent,
    TitleComponent
  ]
})
export class JaworznoSharedModule {}

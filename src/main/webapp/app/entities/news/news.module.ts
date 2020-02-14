import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { JaworznoSharedModule } from 'app/shared/shared.module';
import { NewsComponent } from './news.component';
import { NewsDetailComponent } from './news-detail.component';
import { NewsUpdateComponent } from './news-update.component';
import { NewsDeleteDialogComponent } from './news-delete-dialog.component';
import { newsRoute } from './news.route';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';

@NgModule({
  imports: [JaworznoSharedModule, CKEditorModule, RouterModule.forChild(newsRoute)],
  declarations: [NewsComponent, NewsDetailComponent, NewsUpdateComponent, NewsDeleteDialogComponent],
  entryComponents: [NewsDeleteDialogComponent]
})
export class JaworznoNewsModule {}

import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { JaworznoSharedModule } from 'app/shared/shared.module';
import { PosterComponent } from './poster.component';
import { PosterDetailComponent } from './poster-detail.component';
import { PosterUpdateComponent } from './poster-update.component';
import { PosterDeleteDialogComponent } from './poster-delete-dialog.component';
import { posterRoute } from './poster.route';

@NgModule({
  imports: [JaworznoSharedModule, RouterModule.forChild(posterRoute)],
  declarations: [PosterComponent, PosterDetailComponent, PosterUpdateComponent, PosterDeleteDialogComponent],
  entryComponents: [PosterDeleteDialogComponent]
})
export class JaworznoPosterModule {}

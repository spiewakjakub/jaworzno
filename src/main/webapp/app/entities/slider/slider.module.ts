import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { JaworznoSharedModule } from 'app/shared/shared.module';
import { SliderComponent } from './slider.component';
import { SliderDetailComponent } from './slider-detail.component';
import { SliderUpdateComponent } from './slider-update.component';
import { SliderDeleteDialogComponent } from './slider-delete-dialog.component';
import { sliderRoute } from './slider.route';

@NgModule({
  imports: [JaworznoSharedModule, RouterModule.forChild(sliderRoute)],
  declarations: [SliderComponent, SliderDetailComponent, SliderUpdateComponent, SliderDeleteDialogComponent],
  entryComponents: [SliderDeleteDialogComponent]
})
export class JaworznoSliderModule {}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { AllNewsComponent } from 'app/all-news/all-news.component';
import { JaworznoSharedModule } from 'app/shared/shared.module';

const routes: Routes = [{ path: '', component: AllNewsComponent }];

@NgModule({
  declarations: [AllNewsComponent],
  imports: [CommonModule, JaworznoSharedModule, RouterModule.forChild(routes)]
})
export class AllNewsModule {}

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { JaworznoSharedModule } from 'app/shared/shared.module';
import { SingleNewsComponent } from 'app/news/single-news/single-news.component';
import { NewsComponent } from 'app/news/news.component';

const routes: Routes = [
  { path: '', component: NewsComponent },
  { path: ':id', component: SingleNewsComponent }
];

@NgModule({
  declarations: [SingleNewsComponent, NewsComponent],
  imports: [CommonModule, JaworznoSharedModule, RouterModule.forChild(routes)]
})
export class NewsModule {}

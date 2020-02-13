import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PreviousComponent } from 'app/previous/previous.component';

const routes: Routes = [{ path: '', component: PreviousComponent }];

@NgModule({
  declarations: [PreviousComponent],
  imports: [CommonModule, RouterModule.forChild(routes)]
})
export class PreviousModule {}

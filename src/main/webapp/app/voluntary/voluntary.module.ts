import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VoluntaryComponent } from 'app/voluntary/voluntary.component';

const routes: Routes = [{ path: '', component: VoluntaryComponent }];

@NgModule({
  declarations: [VoluntaryComponent],
  imports: [CommonModule, RouterModule.forChild(routes)]
})
export class VoluntaryModule {}

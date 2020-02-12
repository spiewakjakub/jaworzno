import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OrganizerComponent } from 'app/organizer/organizer.component';

const routes: Routes = [{ path: '', component: OrganizerComponent }];

@NgModule({
  declarations: [OrganizerComponent],
  imports: [CommonModule, RouterModule.forChild(routes)]
})
export class OrganizerModule {}

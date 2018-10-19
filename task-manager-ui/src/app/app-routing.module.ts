import { RouterModule, Routes } from '@angular/router';
import { NgModule }  from '@angular/core';
import { UpdatetaskComponent } from './updatetask/updatetask.component';
import { ViewtaskComponent } from './viewtask/viewtask.component';

const routes: Routes = [
  { path: '', redirectTo: '/viewTask', pathMatch: 'full' },
  { path: 'viewTask', component: ViewtaskComponent },
  { path: 'updateTask', component: UpdatetaskComponent }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
import { RouterModule, Routes } from '@angular/router';
import { NgModule }  from '@angular/core';
import { AddtaskComponent } from './addtask/addtask.component';
import { ViewtaskComponent } from './viewtask/viewtask.component';
import { EdittaskComponent } from './edittask/edittask.component';

const routes: Routes = [
  { path: '', redirectTo: '/viewTask', pathMatch: 'full' },
  { path: 'viewTask', component: ViewtaskComponent },
  { path: 'addTask', component: AddtaskComponent },
  { path: 'editTask', component: EdittaskComponent }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
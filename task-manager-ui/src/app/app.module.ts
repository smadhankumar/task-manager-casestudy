import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { ViewtaskComponent } from './viewtask/viewtask.component';
import { AddtaskComponent } from './addtask/addtask.component';
import { EdittaskComponent } from './edittask/edittask.component';
import { TaskFilterPipe } from './shared/task-filter.pipe';
import { TaskService } from './shared/task-service';
import { BackendService } from './shared/backend-service';
import { HttpClientModule } from '@angular/common/http';
import { DatePipe } from '@angular/common'; 

@NgModule({
  declarations: [
    AppComponent,
    ViewtaskComponent,
    AddtaskComponent,
    EdittaskComponent,
    TaskFilterPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [TaskService,BackendService,DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }

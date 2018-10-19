import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { ViewtaskComponent } from './viewtask/viewtask.component';
import { UpdatetaskComponent } from './updatetask/updatetask.component';
import { TaskFilterPipe } from './shared/task-filter.pipe';
import { TaskService } from './shared/task-service';
import { BackendService } from './shared/backend-service';
import { HttpClientModule } from '@angular/common/http';
import { DatePipe } from '@angular/common';
import { NgbModule, NgbDateParserFormatter} from '@ng-bootstrap/ng-bootstrap';
import { CustomNgbDateParserFormatter } from './shared/custom-date-formatter';
import { ScreenFreezeComponent } from './screenfreeze/screenfreeze.component';

@NgModule({
  declarations: [
    AppComponent,
    ViewtaskComponent,
    UpdatetaskComponent,
    TaskFilterPipe,
    ScreenFreezeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    NgbModule.forRoot()
  ],
  providers: [TaskService,BackendService,DatePipe,
  {provide: NgbDateParserFormatter, useFactory: () => new CustomNgbDateParserFormatter('MM/dd/yyyy')}],
  bootstrap: [AppComponent]
})
export class AppModule { }

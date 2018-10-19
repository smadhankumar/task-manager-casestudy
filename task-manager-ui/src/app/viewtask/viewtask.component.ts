import { Component, OnInit } from '@angular/core';
import { TaskFilterPipe } from '../shared/task-filter.pipe';
import { Router } from '@angular/router';
import { TaskService } from '../shared/task-service';
import { BackendService } from '../shared/backend-service';
import { DatePipe } from '@angular/common';
import { NgbDateStruct, NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap'; 

@Component({
  selector: 'app-viewtask',
  templateUrl: './viewtask.component.html',
  styleUrls: ['./viewtask.component.css']
})
export class ViewtaskComponent implements OnInit {

  taskModelList = [];
  startDatePsd : NgbDateStruct;
  endDatePsd : NgbDateStruct ;
  technicalError : boolean = false;
  updateError : boolean = false;
  screenLoader : boolean = false;
  searchModel = {
          "task":"",
          "priorityFrom":"",
          "priorityTo":"",
          "parentTask":"",
          "startDate":"",
          "endDate":""
  };
  todaysDate = new Date(new Date().getTime() - (1000 * 60 * 60 * 24));
  constructor(public router: Router,private taskService : TaskService, private backendService : BackendService,
   private datePipe: DatePipe, private ngbDateParserFormatter: NgbDateParserFormatter ) { }

  ngOnInit() {
    this.screenLoader = true;
    this.technicalError = false;
    this.taskModelList = [];
    this.taskService.editTask = null;
    this.todaysDate =  new Date(new Date().getTime() - (1000 * 60 * 60 * 24));
    this.getTasks();
  }

  editTask(taskModel : any){
     this.taskService.editTask = taskModel;
     this.router.navigate(['/updateTask']);
  }

  endTask(taskModel : any){
     this.screenLoader = true;
     taskModel.endDate = this.datePipe.transform(new Date(), 'MM/dd/yyyy');
     this.backendService.updateTask(taskModel).subscribe(
      (data: any) => {
           this.getTasks();
           this.updateError = false;
           this.router.navigate(['viewTask']);
         
    },
    (err: any) => {
           this.technicalError = true;
           this.updateError = true;
      } 
    );
    this.screenLoader = false;
  }

  getTasks(){
      var inputParam = {
      };

      this.backendService.viewTasks(inputParam).subscribe(
      (data: any) => {
           this.technicalError = false;
           this.taskModelList = data;
            if(null != this.taskModelList && this.taskModelList.length > 0){
              for(let task of this.taskModelList){
                 task.disabled = false;
                 if(new Date(task.endDate) > this.todaysDate){
                     task.disabled = true;
                 }
              }
           }
        this.screenLoader = false; 
    },
    (err: any) => {
         this.technicalError = true;
         this.screenLoader = false; 
            
      } 
    );
  }

 onDateSelect(date: NgbDateStruct,dateStr : string){    
    if(dateStr == "startDate"){
      this.searchModel.startDate =  this.ngbDateParserFormatter.format(date);
      this.startDatePsd = date;
    }else if(dateStr == "endDate"){
      this.searchModel.endDate =  this.ngbDateParserFormatter.format(date);
       this.endDatePsd = date;
    }
 }
}
